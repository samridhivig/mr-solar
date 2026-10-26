---
doc: spec
status: approved
---

# MR Solar — Technical Spec

## How This Works, In Plain Language

MR Solar is a zero-dependency local Node.js server and real-time planetary dashboard.

The application runs a lightweight local server (`server.mjs`) on port `7777`. It delivers a fully decoupled, standalone MR/PR train state engine with preset scenarios (Clean Stack, Mid-Stack Conflict, CI Failure, Review Storm) that work immediately out-of-the-box for any user or hackathon judge.

The client interface (`index.html`) is built with HTML5 Canvas, SVG, and D3.js. It renders a dark space cockpit where the target branch (`main` / `production`) is the glowing Sun at the center coordinate. Dependent branches orbit as distinct planets at radial distances computed from their branch stack depth. 

When a branch has merge conflicts or failed CI runs, the client renders procedural surface fault lines and red fissures. Hovering reveals a semi-transparent glass card with branch and diff metadata, while clicking displays an interactive Action Capsule (`Sync`, `Cascade Sync`, `Open in Repo`). 

Clicking "Cascade Sync" triggers a generic terminal bridge running the Claude rebase skill (`claude "/cascade-sync <branch>"`) while initiating a glowing particle wave across the branch train that repairs the surface cracks and heals the solar system in real time.

## The Core Journey Through the System

1. **Start & Launch:** The user runs `npm start` (or `node server.mjs`). The server boots instantly with zero npm install requirements and opens `http://localhost:7777` in the browser.
   - *Implements `prd.md > The Core Journey` (Step 1).*
2. **Interactive Solar Map:** The browser connects to `/api/events` (SSE) or loads the stack data. D3.js computes radial orbital layout with the Sun at $(0,0)$, root branches in inner orbits, and dependent branches branching outward along dotted constellation lines.
   - *Implements `prd.md > The Core Journey` (Step 2) & `prd.md > Solar Tree Topology & Rendering`.*
3. **Visual Health Indicators:**
   - Merge Conflict $\rightarrow$ Jagged cracked surface overlay.
   - CI Failure $\rightarrow$ Emissive red fissure lines.
   - Aged Branch (>2 weeks) $\rightarrow$ Golden planetary rings.
   - Review Comments $\rightarrow$ Orbiting moon satellites.
   - *Implements `prd.md > The Core Journey` (Step 2) & `prd.md > Look and Feel`.*
4. **Inspect & Action Selection:**
   - Hovering displays the glass metadata card.
   - Clicking selects the planet and summons the floating Action Capsule (`Sync`, `Cascade Sync`, `Open in Repo`).
   - *Implements `prd.md > The Core Journey` (Steps 3 & 4) & `prd.md > Interactive Planet Selection & Action Capsule`.*
5. **Generic Cascade Sync Execution:**
   - Clicking `Cascade Sync` dispatches `POST /api/cascade-sync` with `{ branch }`.
   - The server launches the terminal command `claude "/cascade-sync <branch>"`.
   - The UI launches a radiant particle wave propagating down the branch chain, smoothing away surface cracks and updating status to healthy.
   - *Implements `prd.md > The Core Journey` (Step 5) & `prd.md > Interactive Planet Selection & Action Capsule`.*

## Stack

- **Runtime & Server:** **Node.js (v18+)** (Native built-in `http`, `child_process`, `fs`, `url`, `path`) — Zero npm dependencies.
- **Frontend & Rendering:** **HTML5 Canvas, SVG, D3.js (v7 via CDN), JetBrains Mono & Inter fonts**.
  - *Rationale:* Instant 60 FPS performance, crisp typography, procedural crack shaders, and zero bundler friction.
- **AI Agent Integration:** **Claude CLI (`claude "/cascade-sync <branch>"`)** via native Terminal AppleScript launcher.

## Where It Runs and How Someone Tries It

- **Runtime:** Runs locally on macOS / Linux / Windows with Node.js.
- **Start Command:**
  ```bash
  npm start
  # or
  node server.mjs
  ```
- **Access:** Automatically opens `http://localhost:7777`.
- **Demo Recording Flow:**
  1. Open MR Solar via `npm start`.
  2. Switch to the "Mid-Stack Conflict" scenario from the bottom-right HUD.
  3. Inspect the broken cracked planet (`SOL-101`).
  4. Click the planet and hit **Cascade Sync**.
  5. Watch the Claude skill command launch in Terminal and the golden healing wave restore the solar system.

## Look and Feel

- **Space Background:** `#020410` with multi-layered drifting nebulae and 200+ twinkling canvas stars.
- **Sun:** Radiant gold/amber `#fbbf24` with multi-tier emissive solar glow.
- **Planets:** Procedural color palettes (Electric Blue `#3b82f6`, Neon Cyan `#22d3ee`, Purple `#8b5cf6`, Crimson `#dc2626`).
- **Surface Cracks:** Procedural SVG fissure paths.
- **Review Moons:** Orbiting white/cyan micro-spheres.
- **HUD:** Glassmorphic containers (`rgba(6, 8, 28, 0.88)`) with `JetBrains Mono` monospace typography.

## Components

### 1. Server & Scenario Engine (`server.mjs`)
- Manages HTTP server, SSE event stream, scenario presets, and Terminal command launcher.
- Endpoints:
  - `GET /` — Serves `index.html`.
  - `GET /api/mrs` — Returns current graph `{ nodes, links }`.
  - `GET /api/events` — Real-time SSE stream.
  - `POST /api/scenario` — Switches active demo scenario (Clean, Conflict, Review Storm).
  - `POST /api/sync` — Triggers `claude "/sync <branch>"`.
  - `POST /api/cascade-sync` — Triggers `claude "/cascade-sync <branch>"` and broadcasts healed state.
  - `POST /api/refresh` — Refreshes stack state.
- *Implements `prd.md > Features and Behavior`.*

### 2. Space Canvas & Starfield Engine (`index.html`)
- High-performance Canvas starfield generator with twinkling stars and drifting CSS blur nebulae.
- *Implements `prd.md > Screens and Layout` (Central 3D Canvas).*

### 3. Solar Tree & Orbital Physics (`index.html`)
- D3.js orbital layout anchoring `master`/`main` at $(0,0)$.
- Concentric orbital rings, directional constellation lines, planetary rings (>2 weeks), and review satellites.
- *Implements `prd.md > Solar Tree Topology & Rendering`.*

### 4. Floating Action Capsule & Hover Modal (`index.html`)
- Floating glass action capsule above selected planet (`Sync`, `Cascade Sync`, `Open in Repo`).
- Glass hover modal with MR ID, ticket, source/target branches, and diff metrics.
- *Implements `prd.md > Interactive Planet Selection & Action Capsule`.*

### 5. HUD Controls & Scenario Switcher (`index.html`)
- Top-Right collapsible legend for status markers.
- Bottom-Left live counter and timestamp.
- Bottom-Right Scenario switcher & refresh button.
- *Implements `prd.md > Screens and Layout` (HUD).*

## Data Model

```typescript
interface MRNode {
  id: string;              // branch name (e.g. 'SOL-101')
  iid: number;             // PR/MR number (e.g. 12942)
  ticketId: string | null; // Jira ticket (e.g. 'SOL-101')
  title: string;           // MR title
  state: 'opened' | 'merged' | 'closed';
  draft: boolean;
  target_branch: string;   // parent branch in the stack
  web_url: string;         // repo web URL
  type: 'master' | 'mr';
  pipeline: 'success' | 'failed' | 'running' | null;
  changes: number;         // files changed
  notes: number;           // review comments (satellites count)
  createdAt: string;       // ISO date string
  foreign: boolean;        // teammate MR flag
  conflicts: boolean;      // merge conflict flag
  depth: number;           // 0 = master, 1 = root MR, 2+ = stacked child
}

interface MRGraph {
  nodes: MRNode[];
  links: Array<{ source: string; target: string }>;
}
```

## File Structure

```
mr-solar/
├── server.mjs                  # Node HTTP server, Scenario engine, SSE stream, Terminal bridge
├── index.html                  # D3/Canvas/SVG Solar System UI, Shaders, Action Capsules & HUD
├── package.json                # Project metadata & npm scripts (npm start)
├── README.md                   # Project overview & demo instructions
├── .gitignore                  # Git ignore rules (.env, learner-profile.md)
└── devpost/                    # Devpost Hackathon planning documents
    ├── learner-profile.md      # Learner background & preferences
    ├── scope.md                # Approved project scope & boundary
    ├── prd.md                  # Approved product requirements document
    └── spec.md                 # Approved technical specification
```

## External Services and Dependencies

- **D3.js (v7):** Loaded via CDN (`https://d3js.org/d3.v7.min.js`).
- **Google Fonts:** `Inter` and `JetBrains Mono`.
- **Claude CLI:** Invoked locally via AppleScript for terminal skill execution.

## Important Failure Modes

- **Port 7777 In Use:** Catches `EADDRINUSE`, notifies user, and opens the existing browser instance.
- **Terminal Permissions:** Falls back to in-browser simulated rebase healing if AppleScript permissions are pending.

## What Was Simplified and Why

- **Decoupled Standalone Server with Demo Scenarios** instead of hardcoded proprietary GitLab host — enables instant testing by hackathon judges and anyone who clones the repository.
- **Generic `cascade-sync` CLI Skill Bridge** — works seamlessly with any local Claude or agent skill setup.
- **GitHub Integration Deferred to Later** — clean separation for future OAuth / GitHub API extension.

## Decisions and Open Issues

- **Standalone Hackathon Architecture:** Decoupled from private GitLab endpoints; packaged as a self-contained, high-polish repository ready for public GitHub release and Devpost demo video.
