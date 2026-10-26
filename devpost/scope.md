---
doc: scope
status: approved
---

# MR Solar

A 3D planetary dashboard that visualizes stacked Merge Request trains as a living solar system where **Production is the glowing Sun at the center**, and stacked MR branches orbit in dependency tiers heading toward production. It gives instant visual clarity on branch health, merge conflicts, and pipeline failures with one-click rebase triggers.

## The Unique Kernel
Instead of reading through flat GitLab lists or terminal branch logs, the entire repository state is visualized as a unified solar system:
- **The Sun (Center):** Represents the `main` / `production` branch target where all MRs ultimately land.
- **Planets (Stacked MRs):** Orbit at varying orbital radii based on stack depth (inner orbits = base branches closer to main; outer orbits = dependent leaf branches).
- **Clean MRs:** Smooth, vibrant planetary surfaces.
- **Merge Conflicts:** Visible jagged surface cracks across the planet.
- **Pipeline Failures:** Glowing red fault lines / cracks.
- **MR Comments:** Small satellites orbiting the individual planet.
- **Healing Action:** Clicking "Sync / Cascade-Sync" triggers rebase skills, smoothly repairing the planet's cracks and updating the visual stack from base to leaf.

## Who It's For
Developers working with stacked MRs who frequently deal with merge conflicts and the need to rebase branch trains cleanly without losing spatial and mental context.

## The Core Loop
1. Open MR Solar alongside daily work.
2. Glance at the solar system to spot broken or conflicted planets (cracks / red glow) orbiting around the production Sun.
3. Click a planet to inspect branch details, open the GitLab MR, or trigger a **Sync / Cascade-Sync**.
4. Watch the branch train update and the visual state heal back to a clean planetary surface.

## Inspiration & Identity
- **Aesthetic:** High-contrast, sleek 3D space / planetary visualization with orbital paths around a central Sun, distinct planetary textures/assets, glowing pipeline states, and miniature orbiting satellites for discussion threads.
- **Tone:** Tactile, informative, sci-fi developer cockpit.

## Why This Matters to the Learner
Solves the friction of managing chained MR trains at work, while practicing strict spec-driven scoping to build a complete, non-messy MVP proof-of-concept without half-baked feature creep.

## What "Working" Looks Like
A running 3D web dashboard rendering an active MR solar system:
- Central glowing Sun representing production.
- 3D planets representing the sequential stack of branches with accurate status shaders (clean, cracked for conflicts, glowing red for pipeline errors).
- Orbiting satellite indicators for MR comment counts.
- Interactive click: Inspect MR info, link to GitLab, and trigger a "Cascade Sync" action that updates the stack state and visually heals the planet.

## The POC Boundary (Now)
- Interactive 3D planetary canvas with the central Sun, orbit lines, and stack hierarchy.
- Planet visual state system: Clean, Conflict (cracked), Failed Pipeline (red cracked), and Satellites (comments).
- Planet selection panel with MR metadata (title, branch, source/target, status).
- Direct Action Triggers: "Open in GitLab", "Sync Branch", and "Cascade Sync Stack" (with visual state transition from syncing to healed).
- Flexible Stack Data Loader (mock/local JSON stack data ready to demonstrate edge cases and resolution).

## Later
- Real-time GitLab OAuth & webhook polling daemon.
- Multi-train concurrent branch visualization with multiple solar system sectors.
- Direct execution of custom local terminal hooks/CLI agent triggers.

## Explicitly Cut
- Multi-user authentication & database backend (adds zero PoC value; local client runs anywhere).
- Realistic gravitational N-body physics simulation (distracts from glanceable branch dependency visualization).
