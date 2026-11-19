# Writing

This covers every word a person reads: docs, tasks, HUD text, codex entries, code comments, commit messages, pull requests.

`node scripts/check-text.mjs` enforces the character and phrase bans below. A hook runs it after every edit.

## Write for a reader with ADHD

- Put the action or the answer first. Background comes second, or gets cut.
- One idea per sentence. Stay under 25 words.
- One topic per paragraph. Split a paragraph that passes 50 words.
- A document over 300 words opens with a two-line summary.
- Use a numbered list for steps. Use a bullet list for three or more parallel items. Two items stay in a sentence.
- Use a table when every item has the same fields.
- Write every step, including the obvious ones.
- Offer at most five choices at once.
- Say what done looks like, with a command that checks it.
- Use active voice, present tense, and "you".
- Write "for example", not "e.g.".
- Files of the same kind follow the same template.
- Task files are the exception on list length. Their sections are always lists, so every task has the same shape.

## Characters

| Banned | Write instead |
|---|---|
| Em dash, en dash | A period, a comma, parentheses, or the word "to" |
| Curly quotes | Straight quotes |
| Ellipsis character | Three periods, or cut the sentence |
| Arrow characters | `->` or a word |
| Box-drawing characters | A list or a table |
| Bullet and middle-dot characters | A Markdown list |
| Emoji | Nothing. Emoji appear in commit subjects only. |

The plain hyphen is fine: `kind-powd`, `read-only`, `1-3`.

## Patterns

| Pattern | Example | Fix |
|---|---|---|
| Contrast for effect | "It is not just a game, it is a lesson." | Say what it is: "The game teaches Kubernetes." |
| Three items for rhythm | "fast, simple, and reliable" | List what is true and can be checked |
| Trailing significance | "..., ensuring high availability" | Cut it, or state the fact with a number |
| Inflated "is" | "serves as", "stands as", "boasts" | "is", "has" |
| Announcing | "Here is the thing", "Let's look at" | Start with the content |
| Closing recap | "In short", "Overall" | Stop when the content ends |
| Chat residue | "Great question", "I hope this helps" | Delete it |
| Bold lead-in bullet | `- **Speed:** it is fast` | A sentence, or a table |
| Dramatic fragment | "No downtime. None." | One full sentence |
| Praise without proof | "blazing fast", "battle-tested" | A measurement, or nothing |
| Intensifiers | really, very, simply, just, actually, truly | Delete the word |

A plain instruction such as "use X, not Y" is fine. The ban is on contrast used as decoration.

## Words

Do not use: delve, tapestry, testament, seamless, leverage, utilize, streamline, robust, crucial, pivotal, vibrant, intricate, meticulous, multifaceted, showcase, foster, boasts, empower, elevate, realm, comprehensive, groundbreaking, paramount, transformative, cutting-edge, state-of-the-art, world-class, game-changer, paradigm, synergy.

Pick the plain word: "use", "strong", "important", "show".

## Markdown

- Headings use sentence case. One H1 per file. No skipped levels.
- No bold inside running text.
- No horizontal rules between sections.
- Commands and code go in backticks, or in a fenced block with a language.
- README: at most four badges, no "Features" list, no slogans.

## Honest text

- Describe what works today. Planned work lives in `tasks/`.
- A number needs a source: a test, a measurement, or a link.
- Never write that something was checked unless you ran the check.
