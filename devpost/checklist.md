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
- [ ] Final kick-the-tires exploration and feedback completed — Slice 4 (Cascade Sync & Particle Healing)

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: 
Route and stops: 
Edit outcome: 
Reflection: 
Activity mode: 

## Revisions

