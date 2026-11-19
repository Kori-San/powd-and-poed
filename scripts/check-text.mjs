#!/usr/bin/env node
// Fails when a text file contains a character or phrase the writing rules ban.
// Rules live in .claude/rules/writing.md.
//
//   node scripts/check-text.mjs                 every file git tracks or would track
//   node scripts/check-text.mjs a.md b.ts       only these files
//   node scripts/check-text.mjs --staged        the staged version of each staged file
//   node scripts/check-text.mjs --message FILE  a commit message file (emoji allowed)
//   node scripts/check-text.mjs --hook          Claude Code PostToolUse hook (reads JSON on stdin)
//
// Exit codes: 0 clean, 1 problems found, 3 the check could not run.
// Hook mode exits 2 for both failures, because Claude Code shows stderr to the agent only on exit 2.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';

const BANNED = new Map([
  [0x2010, ['unicode hyphen', 'use "-"']],
  [0x2011, ['non-breaking hyphen', 'use "-"']],
  [0x2012, ['figure dash', 'use "-"']],
  [0x2013, ['en dash', 'use "-" or the word "to"']],
  [0x2014, ['em dash', 'use a period, a comma, or parentheses']],
  [0x2015, ['horizontal bar', 'use "-"']],
  [0x2018, ['curly single quote', "use '"]],
  [0x2019, ['curly apostrophe', "use '"]],
  [0x201c, ['curly double quote', 'use "']],
  [0x201d, ['curly double quote', 'use "']],
  [0x2026, ['ellipsis character', 'use "..." or cut the sentence']],
  [0x2022, ['bullet character', 'use a Markdown list']],
  [0x2023, ['bullet character', 'use a Markdown list']],
  [0x25e6, ['bullet character', 'use a Markdown list']],
  [0x00b7, ['middle dot', 'use a comma or a new line']],
  [0x2248, ['almost-equal sign', 'write "about"']],
  [0x2713, ['check mark', 'write "yes" or "done"']],
  [0x2715, ['cross mark', 'write "no"']],
  [0x2717, ['cross mark', 'write "no"']],
  [0x2718, ['cross mark', 'write "no"']],
  [0x00a0, ['non-breaking space', 'use a normal space']],
  [0x202f, ['narrow non-breaking space', 'use a normal space']],
  [0x200b, ['zero-width space', 'delete it']],
  [0x200c, ['zero-width non-joiner', 'delete it']],
  [0x2060, ['word joiner', 'delete it']],
  [0xfeff, ['byte order mark', 'delete it']],
]);

const BANNED_RANGES = [
  [0x2190, 0x21ff, 'arrow', 'use "->" or a word'],
  [0x2794, 0x2794, 'arrow', 'use "->" or a word'],
  [0x2798, 0x27af, 'arrow', 'use "->" or a word'],
  [0x27b1, 0x27be, 'arrow', 'use "->" or a word'],
  [0x27f0, 0x27ff, 'arrow', 'use "->" or a word'],
  [0x2b95, 0x2b95, 'arrow', 'use "->" or a word'],
  [0x2500, 0x257f, 'box-drawing character', 'use a list or a table'],
];

// Words and phrases that read as machine-written. Matching ignores case.
const PHRASES = [
  /\b(delv(e|es|ing)|tapestry|testament|seamless(ly)?|leverag(e|es|ed|ing)|utiliz(e|es|ed|ing))\b/i,
  /\b(streamlin(e|es|ed|ing)|robust|crucial|pivotal|vibrant|intricate|meticulous(ly)?|multifaceted)\b/i,
  /\b(showcas(e|es|ed|ing)|foster(s|ed|ing)?|boasts?|empower(s|ed|ing)?|elevat(e|es|ed|ing))\b/i,
  /\b(realm|comprehensive|groundbreaking|paramount|transformative|supercharg(e|es|ed)|nestled)\b/i,
  /\b(cutting-edge|state-of-the-art|world-class|game[- ]changer|paradigm|synergy|blazing(ly)? fast)\b/i,
  /\b(it'?s|it is) (worth noting|important to note)\b/i,
  /\bhere'?s the (thing|kicker|catch)\b/i,
  /\blet'?s (dive|unpack|break (this|it) down)\b/i,
  /\b(at its core|in today'?s|in conclusion|in summary|at the end of the day|when it comes to)\b/i,
  /\b(i hope this helps|let me know if|feel free to|rest assured|needless to say)\b/i,
  /\bnot (just|only|merely)\b[^.\n]{0,80}\bbut\b/i,
];

// Files that have to quote the banned phrases.
const PHRASES_ALLOWED = [/^\.claude\/rules\/writing\.md$/, /^scripts\/check-text\.mjs$/];

// Emoji are allowed only where gitmoji needs them.
const EMOJI_ALLOWED = [
  /^\.claude\/rules\/git\.md$/,
  /^\.github\/dependabot\.ya?ml$/,
  /^CONTRIBUTING\.md$/,
  /^docs\/GITMOJI\.md$/,
  /^CHANGELOG\.md$/,
];

// Never scanned: generated files, third-party text, binary assets.
const SKIPPED = [
  /(^|\/)node_modules\//,
  /(^|\/)vendor\//,
  /(^|\/)dist\//,
  /(^|\/)(package-lock\.json|pnpm-lock\.yaml|go\.sum)$/,
  /(^|\/)LICENSE(\.[a-z]+)?$/i,
  /(^|\/)CODE_OF_CONDUCT\.md$/,
  /^web\/public\/assets\//,
];

const EMOJI = /[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}]/u;
const EMOJI_EXEMPT = new Set([0x00a9, 0x00ae, 0x2122]); // copyright, registered, trademark
const JOINERS = new Set([0x200d, 0xfe0f]); // only meaningful inside an emoji sequence

const args = process.argv.slice(2);
const mode = ['--hook', '--message', '--staged'].includes(args[0]) ? args[0].slice(2) : 'files';
const root = repoRoot();

let problems;
try {
  problems = run();
} catch (error) {
  console.error(`check-text could not run: ${error.message}`);
  process.exit(mode === 'hook' ? 2 : 3);
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s). Rules: .claude/rules/writing.md`);
  process.exit(mode === 'hook' ? 2 : 1);
}

function run() {
  if (mode === 'hook') {
    const file = hookFile();
    return file ? checkFile(file) : [];
  }
  if (mode === 'message') {
    if (!args[1]) throw new Error('usage: check-text.mjs --message FILE');
    const message = commitMessage(readFileSync(args[1], 'utf8'));
    return checkText(message, args[1], { emojiAllowed: true, phrasesAllowed: false });
  }
  if (mode === 'staged') return stagedFiles().flatMap(checkStaged);
  if (args.length > 0) return args.flatMap(checkNamedFile);
  return trackedFiles().flatMap(checkFile);
}

function repoRoot() {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return process.cwd();
  }
}

function gitList(gitArgs) {
  const out = execFileSync('git', gitArgs, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return out.split('\0').filter(Boolean);
}

function trackedFiles() {
  return gitList(['ls-files', '-z', '--cached', '--others', '--exclude-standard']).map((name) =>
    resolve(root, name),
  );
}

function stagedFiles() {
  return gitList(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z']);
}

function hookFile() {
  try {
    const input = JSON.parse(readFileSync(0, 'utf8'));
    return input?.tool_input?.file_path ?? null;
  } catch {
    return null;
  }
}

// Keeps what git keeps: no comment lines, nothing below the scissors line.
// Dropped lines become empty so the reported line numbers still match the file.
function commitMessage(text) {
  const kept = [];
  for (const line of text.split('\n')) {
    if (line.startsWith('# ------------------------ >8')) break;
    kept.push(line.startsWith('#') ? '' : line);
  }
  return kept.join('\n');
}

function repoName(file) {
  return relative(root, resolve(file)).split(sep).join('/');
}

function matches(patterns, name) {
  return patterns.some((pattern) => pattern.test(name));
}

function skip(message) {
  console.error(message);
  return [];
}

function checkNamedFile(file) {
  if (repoName(file).startsWith('..')) return skip(`skipped, outside the repo: ${file}`);
  if (!existsSync(resolve(file))) return skip(`skipped, not found: ${file}`);
  return checkFile(file);
}

function checkFile(file) {
  const absolute = resolve(file);
  const name = repoName(file);
  if (name.startsWith('..') || matches(SKIPPED, name)) return [];
  if (!existsSync(absolute) || !statSync(absolute).isFile()) return [];
  return checkBytes(readFileSync(absolute), name);
}

function checkStaged(name) {
  if (matches(SKIPPED, name)) return [];
  const bytes = execFileSync('git', ['show', `:${name}`], {
    cwd: root,
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return checkBytes(bytes, name);
}

function checkBytes(bytes, name) {
  if (bytes.subarray(0, 8000).includes(0)) return []; // binary
  return checkText(bytes.toString('utf8'), name, {
    emojiAllowed: matches(EMOJI_ALLOWED, name),
    phrasesAllowed: matches(PHRASES_ALLOWED, name),
  });
}

function checkText(text, name, { emojiAllowed, phrasesAllowed }) {
  const found = [];
  text.split('\n').forEach((line, index) => {
    let column = 0;
    for (const char of line) {
      column += 1;
      const code = char.codePointAt(0);
      const where = `${name}:${index + 1}:${column}`;
      const hex = `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
      if (JOINERS.has(code) || isEmoji(char, code)) {
        if (!emojiAllowed) found.push(`${where} emoji (${hex}): emoji belong in commit subjects only`);
        continue;
      }
      const banned = bannedCharacter(code);
      if (banned) found.push(`${where} ${banned[0]} (${hex}): ${banned[1]}`);
    }
    if (phrasesAllowed) return;
    for (const pattern of PHRASES) {
      const match = pattern.exec(line);
      if (match) {
        found.push(`${name}:${index + 1}:${match.index + 1} banned phrase "${match[0]}": say it plainly`);
      }
    }
  });
  return found;
}

function bannedCharacter(code) {
  if (BANNED.has(code)) return BANNED.get(code);
  const range = BANNED_RANGES.find(([from, to]) => code >= from && code <= to);
  return range ? [range[2], range[3]] : null;
}

function isEmoji(char, code) {
  return EMOJI.test(char) && !EMOJI_EXEMPT.has(code);
}
