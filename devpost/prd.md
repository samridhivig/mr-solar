---
doc: prd
status: approved
---

# MR Solar — Product Requirements

A 3D planetary cockpit for developers working with stacked Merge Requests that visualizes branch hierarchies and trains orbiting a central production Sun, revealing merge conflicts, pipeline failures, review threads, and branch age at a glance, with direct action triggers for rebasing and cascade-syncing via Claude skills.

Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`, `scope.md > The POC Boundary`

## The Core Journey

1. **Arrival & Viewport:** The user opens MR Solar alongside their work environment. A dark deep-space canvas renders the glowing central Sun (`main` / `master`).
2. **Glanceable Stack Inspection:** 
   - Root MRs orbit the Sun directly.
   - Stacked / dependent MRs branch outward along dotted constellation lines from their parent planets.
   - Surface textures and halos show status instantly: green/blue for passing/running, purple for others' MRs, grey/white for drafts, cracked lines for merge conflicts, and red cracks for pipeline failures.
   - Golden planetary rings appear around long-standing branches (open > 2 weeks).
   - Orbiting moon satellites indicate unresolved review threads.
3. **Hover & Inspect:** Hovering over any planet reveals a sleek semi-transparent glass card with MR title, ID (`!12942`), branch name, target branch, files changed, and ticket link.
4. **Action Trigger:** Clicking a planet presents an interactive action capsule directly above the planet:
   - **Sync (Rebase):** Rebase this branch onto its target.
   - **Cascade Sync:** Sequentially rebase from the root of the stacked MR chain through to this branch and its dependent leaf planets. Clicking opens the Claude terminal skill with MCP access to execute the rebase.
   - **Open in GitLab:** External link icon to open the MR directly in GitLab.
5. **Visual Resolution:** Triggering a sync initiates a radiant pulse along the dependency line; the cracked planet surface heals to smooth, and the status updates to passing.

## Screens and Layout

The entire application operates as a unified, zero-clutter 3D cockpit:

1. **Central 3D Canvas:**
   - **Sun (Master/Production):** Radiant, emissive star at $(0,0,0)$.
   - **Planets:** 3D spheres positioned along orbital radii and tree branch vectors.
   - **Constellation Lines:** Subtle glowing dashed lines indicating branch parent-child dependencies.
   - **Moons / Satellites:** Tiny orbiting spherical nodes for review threads.
   - **Planetary Rings:** Disc rings for branches open > 2 weeks.
2. **Top-Right HUD (Legend):**
   - Collapsible sci-fi legend showing status codes:
     - 🟢 Passing
     - 🔴 Pipeline failed
     - 🔵 Running
     - 🟣 Not yours
     - ⚪ Draft
     - 🟡 Sun (master)
     - ⚪ Review threads (satellites)
     - 🪐 Open > 2 weeks (planetary rings)
     - ⚡ Merge conflict (cracks)
3. **Bottom HUD (Status & Actions):**
   - **Bottom Left:** Live counter indicator (e.g. `• 12 open MRs • [Timestamp]`).
   - **Bottom Right:** `⟳ Refresh` button and Demo Scenario switcher (Clean Stack, Broken Chain, Review Heavy).
4. **Floating Planet Action Capsule (On Planet Click):**
   - Compact glass pill floating above the selected planet:
     - `⟳` (Rebase/Sync)
     - `⑂` (Cascade Sync — with tooltip "Cascade sync")
     - `↗` (Open in GitLab)
5. **Hover Info Card:**
   - Floating dark glass modal positioned near the hovered planet displaying MR number, title, source/target branches, diff stats, and Jira ticket ID.

## Look and Feel

- **Aesthetic:** High-contrast, sleek cyberpunk / space cockpit.
- **Palette:** Deep void black background (`#070a14`), solar amber/gold glow for the Sun (`#ffaa00`), celestial blues/cyans for healthy branches (`#55aaff`), vibrant crimson for pipeline errors (`#ff3344`), neon purple for external MRs (`#a855f7`), and glowing cyan highlights for interactive controls.
- **Typography:** Monospace / technical sans (e.g., JetBrains Mono / Inter) for branch tags, commit hashes, and HUD labels.
- **Motion:** Subtle planetary self-rotation, smooth orbital drift, and glowing particle pulses along branch dependency vectors during sync actions.

## Features and Behavior

### 1. Solar Tree Topology & Rendering
- Root branches orbit the Sun.
- Child stacked MRs branch off from their parent planet with directional dotted connection vectors.
- Planets feature procedural or asset-based texture states (clean planetary textures, cracked bump/normal textures for merge conflicts, glowing red fissures for CI failures).

### 2. Interactive Planet Selection & Action Capsule
- Hovering shows the detailed MR metadata card.
- Clicking pins selection and renders the floating action bar.
- Clicking "Cascade Sync" or "Sync" triggers the Claude skill command with MCP tool parameters and executes the visual healing state transition.
- Clicking "Open in GitLab" launches the MR URL in a new tab.

### 3. Space Navigation & Camera Controls
- Left-click drag to orbit/rotate the solar system.
- Scroll wheel to zoom in/out smoothly.
- Right-click drag to pan the viewport.
- Clicking a planet smoothly focuses/centers the camera view.

### 4. Interactive Scenarios & Live/Mock Feed
- Preset scenario switcher to immediately demonstrate:
  - Scenario A: **The Clean Train** (3-tiered healthy MR stack).
  - Scenario B: **The Mid-Stack Conflict** (Parent planet with merge conflict cracks and dependent child planets awaiting cascade).
  - Scenario C: **CI Failure & Review Storm** (Red pipeline cracks + orbiting review satellites + age rings).

## States and Boundaries

- **Healthy State:** Smooth planet surface, green/blue status glow, active satellite orbits.
- **Conflict State:** Jagged surface fissure shader across the planet.
- **Pipeline Failure State:** Emissive red fissure lines glowing on the planet surface.
- **Syncing State:** Particle wave propagates from the base branch to the leaf; cracks dissolve and the planet returns to healthy status.
- **Empty State:** Sun visible with message: "All trains merged — orbit is clear."

## Product Decisions

- **Floating Action Capsule over Full Sidebar Drawer:** Kept the UI true to the screenshots with a lightweight floating glass action pill directly over the planet for maximum spatial immersion.
- **Constellation Lines for Stack Depths:** Direct visual lines connect parent MR to child MR so the dependency train is unmistakable.
- **Claude Skill Terminal Launch:** Action triggers formulate the precise Claude CLI invocation with MCP permissions to perform real-world git rebases.

## What We're Building (POC)

- Complete 3D Solar System canvas (Sun, stacked planets, constellation lines, moon satellites, Saturn rings).
- Visual status shaders (healthy, merge conflict cracks, pipeline failure red cracks, review thread counts).
- Hover metadata cards & floating interactive Action Capsules (`Cascade Sync`, `Sync`, `GitLab Link`).
- Realistic cascade healing animation and state updates.
- Interactive demo scenario switcher for instant presentation and testing.
- Claude CLI command bridge for rebase actions.

## Deferred From the POC

- Direct real-time bidirectional WebSocket daemon to self-hosted GitLab instances.
- Complex multi-repository galaxy switcher.

## Non-Goals

- Full Git client / in-browser merge conflict editor (the actual git resolution is delegated to git / Claude agent skills).
- Gravitational N-body physical collisions.
