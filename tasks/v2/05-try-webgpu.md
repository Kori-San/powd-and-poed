# v2-05 Try WebGPU

Size: M
Needs: v2-02

## Goal

A measured answer to "should the game move to `WebGPURenderer`?", written down as a decision.

## Why

three.js is moving toward WebGPU. An experiment with numbers is worth more than an opinion.

## Steps

- [ ] Read the current three.js WebGPU manual page and the migration guide. List what the game uses that WebGPU lacks.
- [ ] On a branch, run the benchmark scene on `WebGPURenderer` behind `?renderer=webgpu`.
- [ ] Port the final pass to the node-based pipeline if the experiment needs it.
- [ ] Measure on the three devices. Check which browsers of your audience support WebGPU today.
- [ ] Write the result in `docs/DECISIONS.md`: adopt, keep as an option, or drop. Include the numbers.
- [ ] Stop after one day of work, whatever the state.

## Done when

- [ ] The decision entry exists and contains measurements.
- [ ] If the answer is "drop", the branch is deleted and no WebGPU code is on `main`.

## Learn

- A time-boxed experiment with a written result is called a spike.
- Explain it back: what would have to be true for you to change the answer next year?

## Not now

- Rewriting materials or shaders for WebGPU on `main`.
