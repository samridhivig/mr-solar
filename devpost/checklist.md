---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Standalone Solar System Engine & Starfield**
  Becomes usable: The local Node.js server starts with `node server.mjs` and opens the space cockpit with the glowing central Sun, dynamic twinkling starfield, drifting nebulae, and HUD status bar with live MR counter.
  Why now: Proves the whole runtime path end-to-end on the first slice (server, client, canvas, SSE stream) so every visual layer has somewhere solid to land.
  PRD ref: `prd.md > The Core Journey` (Step 1), `prd.md > Screens and Layout`
  Spec ref: `spec.md > Server & Scenario Engine (server.mjs)`, `spec.md > Space Canvas & Starfield Engine (index.html)`
  Build: Set up standalone `server.mjs`, `package.json`, and `index.html` with Canvas starfield, CSS nebulae, base SVG canvas, and SSE graph streaming.
  Verify (mechanical): Start `node server.mjs`, verify HTTP 200 on `/`, `/api/mrs`, and active SSE connection on `/api/events`.
  Learner check: Open `http://localhost:7777` and verify the starfield, nebulae, and glowing Sun render smoothly at 60 FPS.
  Commit: `Scaffold standalone server and starfield canvas`

- [x] **2. Planetary MR Tree Topology & Visual Health Statuses**
  Becomes usable: Open MRs render as distinct orbiting planets along concentric depth tiers and constellation lines, with procedural crack overlays for conflicts, red glowing cracks for pipeline failures, Saturn rings for aged MRs, and orbiting moon satellites for review comments.
  Why now: Delivers the core visual metaphor early—the heart of the product that makes MR Solar distinctive and intuitive.
  PRD ref: `prd.md > The Core Journey` (Step 2), `prd.md > Solar Tree Topology & Rendering`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Solar Tree & Orbital Physics (index.html)`, `spec.md > Data Model`
  Build: Implement D3 radial tree layout, procedural planet textures, jagged crack SVG paths, red pipeline fissures, Saturn rings (>2 weeks), and orbiting moon satellite animations.
  Verify (mechanical): Load the scenario graph and verify all status visual states (healthy, conflict cracks, red pipeline cracks, satellites, rings) render without SVG errors.
  Learner check: Look at the planetary orbits and verify you can immediately distinguish healthy vs broken/conflicted planets and review satellite counts.
  Commit: `Implement planetary tree topology and visual status shaders`

- [x] **3. Floating Action Capsules, Hover Cards & Demo Scenarios**
  Becomes usable: Hovering over any planet displays the sleek dark glass metadata modal; clicking a planet summons the floating action capsule (`Sync`, `Cascade Sync`, `Open in Repo`); HUD allows switching demo scenarios (Clean Train, Mid-Stack Conflict, CI Failure, Review Storm).
  Why now: Completes the inspection and interaction layer so users can navigate any branch stack and prepare actions.
  PRD ref: `prd.md > The Core Journey` (Steps 3 & 4), `prd.md > Interactive Planet Selection & Action Capsule`, `prd.md > Interactive Scenarios & Live/Mock Feed`
  Spec ref: `spec.md > Floating Action Capsule & Hover Modal (index.html)`, `spec.md > HUD Controls & Scenario Switcher (index.html)`
  Build: Add floating action capsule positioning anchored above the selected planet, glass hover metadata card, and HUD scenario switcher with `/api/scenario` endpoint.
  Verify (mechanical): Test hover events, click selection, action capsule rendering, and scenario switching API.
  Learner check: Click between different scenarios and select planets to view their metadata cards and action capsules.
  Commit: `Add floating action capsule, hover cards, and scenario switcher`

- [x] **4. Generic Cascade Sync Execution & Animated Particle Healing**
  Becomes usable: Clicking `Cascade Sync` dispatches the terminal execution of `claude "/cascade-sync <branch>"` and triggers a glowing radiant pulse along the branch chain that smoothly heals the planet cracks and updates the status to healthy.
  Why now: Closes the core loop—connecting the visual cockpit directly to real-world Claude agent execution and delivering the high-dopamine visual payoff.
  PRD ref: `prd.md > The Core Journey` (Step 5), `prd.md > Interactive Planet Selection & Action Capsule`
  Spec ref: `spec.md > Generic Cascade Sync Execution`, `spec.md > Server & Scenario Engine (server.mjs)`
  Build: Wire `POST /api/cascade-sync` and `POST /api/sync` to Terminal command launcher; implement radiant particle ripple wave and crack healing transition in the UI.
  Verify (mechanical): Send `POST /api/cascade-sync` for `SOL-101`, verify terminal dispatch and verify graph state transitions from conflict $\rightarrow$ healthy.
  Learner check: Click "Cascade Sync" on a cracked planet, observe the terminal invocation, and watch the visual healing ripple through the solar system.
  Commit: `Implement cascade sync execution and visual healing pulse`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 2 (Planetary Tree Topology & Visual Statuses)
- [x] Final kick-the-tires exploration and feedback completed — Slice 4 (Cascade Sync & Particle Healing)

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Prior practice connected. The learner's goal was separating the real MVP from nice-to-haves. The final verification already exercised it: ticked slices were checked against the running app, missing features were cut or disabled, and the healing wave was verified by clicking the real Cascade Sync path (see Revisions).
Route and stops: Reference route only, not toured: Cascade Sync click (`index.html`, `$('pop-cascade').onclick`) → `server.mjs` `/api/cascade-sync` + `syncThenHeal` → `index.html` `updateColors`. Recorded in `devpost/app-map.html`.
Edit outcome: Not applicable; the learner made real product decisions during the final review (disable Merge with a note, move ownership, add the syncing phase).
Reflection: Answered; kept in the learner profile.
Activity mode: Focused alternative (familiar plan-first user), connected to practice already completed.

## Revisions


- Final verification (2026-10-26): server boots, `GET /` and `/api/mrs` return 200, SSE stream connects. Deviations found against the checked slices:
  - Slice 3: no scenario switcher. The server has one demo stack (`SCENARIOS.default`) and the HUD has no switcher; `/api/scenario` only supports `reset`, and nothing in the UI calls it.
  - Slice 4: no healing wave. `updateColors` in `index.html` hides cracks instantly when the SSE update arrives.
  - The popover has a `Merge MR` button that POSTs to `/api/merge`, which the server doesn't implement (404), while the status bar still says "Merge launched". Merge isn't in the PRD's capsule (`Sync`, `Cascade Sync`, `Open in Repo`).
  - `updateColors` still adds the red failed-pipeline outline that `render` no longer draws, so failed planets regain it after any live update.
  - The spec says the browser opens automatically; the server only prints the URL.
  - `openTerminal` in `server.mjs` escapes `\` and `"` but the command sits inside a single-quoted shell string, so a branch name with `'` breaks out of it.
  - Once healed, the demo can only be reset by restarting the server.
  - `COA-3439` replaced with the made-up `SOL-101` in spec and checklist before public release.
- Resolved before submission (2026-10-26):
  - Scenario switcher cut from the PoC; the single demo stack covers the core journey. `/api/scenario` `reset` stays server-side only.
  - Merge MR button disabled with the tooltip "available once GitHub is connected"; its dead `/api/merge` handler removed.
  - Healing wave built in `updateColors`: cracks and the failed alarm ring fade, and a gold ring expands from each healed planet, staggered by stack depth.
  - Sync and Cascade Sync now mark the branches as syncing (cyan pulse) for `SYNC_MS` before healing, so the heal no longer looks instant.
  - Fixed: a recovered failed-pipeline planet revealed its lava texture and turned pink; it now switches to the glow filter.
  - Demo data: `feat/auth-core-service` is now the learner's branch so Cascade Sync runs from the base of the train; `docs/api-spec-v2` carries the "not yours" state.
  - Added MIT `LICENSE` and a project README for the public repo.
