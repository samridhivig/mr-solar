# MR Solar

A local dashboard that draws a stack of merge requests as a solar system. The target branch is the Sun, and each dependent branch is a planet that orbits further out the deeper it sits in the stack.

Built for the Devpost [Learn AI Basics](https://learn-ai-basics.devpost.com/) hackathon.

## What it shows

- **Merge conflict:** cracks across the planet's surface
- **Failed pipeline:** red glowing aura
- **Branch older than two weeks:** rings
- **Review comments:** orbiting moons

Hover a planet to see its branch metadata. Click it to open the action capsule (`Sync`, `Cascade Sync`, `Open in Repo`). `Cascade Sync` runs `claude "/cascade-sync <branch>"` in a new Terminal window and plays a healing animation down the branch chain that clears the cracks.

The MR data is a built-in demo stack in `server.mjs`, so it runs without a GitLab or GitHub account.

## Run it

Requires Node.js 18+. There are no npm dependencies to install.

```bash
npm start
# or
node server.mjs
```

Then open http://localhost:7777.

Opening Terminal for `Sync` / `Cascade Sync` only works on macOS. On other platforms the server logs the command instead. Running the command also requires the [Claude Code](https://claude.com/claude-code) CLI and a `/cascade-sync` skill. The animation plays either way.

## Files

| Path | What it is |
|---|---|
| `server.mjs` | HTTP server, demo MR data, SSE stream (`/api/events`), sync endpoints |
| `index.html` | The whole client: starfield canvas, D3 layout, planet rendering, HUD |
| `devpost/` | Planning docs written during the hackathon (scope, PRD, spec, build checklist) |
| `skills/` | The Learn AI Basics curriculum skills used to plan and build this project |

## License

MIT
