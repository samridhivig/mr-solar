#!/usr/bin/env node
import http from 'node:http';
import { execSync, exec } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = readFileSync(join(__dirname, 'index.html'), 'utf8');

const PORT = 7777;

// ── Scenario & Mock Data Engine ────────────────────────────────────────────

const SCENARIOS = {
  default: [
    {
      iid: 1042,
      source_branch: 'feat/session-tokens-v2',
      target_branch: 'feat/auth-core-service',
      title: 'feat: upgrade session token rotation and refresh handling',
      state: 'opened',
      draft: false,
      pipeline: 'failed', // triggers the red glowing aura around the planet body
      changes_count: 6,
      user_notes_count: 3,
      created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: true, // merge conflict cracks
      web_url: 'https://github.com/org/repo/pull/1042'
    },
    {
      iid: 1040,
      source_branch: 'feat/auth-core-service',
      target_branch: 'main',
      title: 'feat: modularize core authentication service interfaces',
      state: 'opened',
      draft: true,
      pipeline: 'success',
      changes_count: 1, // smaller purple node
      user_notes_count: 1,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: true, // merge conflict cracks
      web_url: 'https://github.com/org/repo/pull/1040'
    },
    {
      iid: 1045,
      source_branch: 'feat/oauth-social-login',
      target_branch: 'feat/session-tokens-v2',
      title: 'feat: add GitHub & Google OAuth social provider strategies',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 3,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1045'
    },
    {
      iid: 1048,
      source_branch: 'feat/mfa-authenticator',
      target_branch: 'feat/session-tokens-v2',
      title: 'feat: support TOTP authenticator app verification',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 7,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1048'
    },
    {
      iid: 1030,
      source_branch: 'feat/billing-checkout-modal',
      target_branch: 'main',
      title: 'feat: redesign subscription checkout modal with tier comparison',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 5,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1030'
    },
    {
      iid: 1035,
      source_branch: 'docs/api-spec-v2',
      target_branch: 'main',
      title: 'docs: publish OpenAPI v3 specifications for developer SDK',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 2,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      foreign: true,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1035'
    },
    {
      iid: 1025,
      source_branch: 'feat/analytics-event-pipeline',
      target_branch: 'main',
      title: 'feat: batch telemetry event emission for performance tracking',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 4,
      user_notes_count: 1,
      created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1025'
    },
    {
      iid: 980,
      source_branch: 'chore/legacy-cookie-migration',
      target_branch: 'main',
      title: 'chore: migrate legacy session cookies to httpOnly standard',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 5,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 22 * 86400000).toISOString(), // >2 weeks = Saturn ring
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/980'
    },
    {
      iid: 990,
      source_branch: 'test/e2e-flaky-suite',
      target_branch: 'main',
      title: 'test: stabilize flaky integration tests in Playwright suite',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 4,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 19 * 86400000).toISOString(), // >2 weeks = Saturn ring
      foreign: false,
      has_conflicts: true, // subtle cracks on stale branch as in img 1
      web_url: 'https://github.com/org/repo/pull/990'
    },
    {
      iid: 995,
      source_branch: 'fix/dark-mode-contrast',
      target_branch: 'main',
      title: 'fix: resolve accessibility contrast ratios on dark mode inputs',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 4,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 17 * 86400000).toISOString(), // >2 weeks = Saturn ring
      foreign: false,
      has_conflicts: true, // subtle cracks on stale branch as in img 1
      web_url: 'https://github.com/org/repo/pull/995'
    },
    {
      iid: 1010,
      source_branch: 'refactor/graphql-query-cache',
      target_branch: 'main',
      title: 'refactor: deduplicate normalized entity caching in client store',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 5,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1010'
    },
    {
      iid: 1015,
      source_branch: 'perf/image-lazy-loading',
      target_branch: 'main',
      title: 'perf: implement intersection observer on planetary asset textures',
      state: 'opened',
      draft: false,
      pipeline: 'success',
      changes_count: 2,
      user_notes_count: 0,
      created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      foreign: false,
      has_conflicts: false,
      web_url: 'https://github.com/org/repo/pull/1015'
    }
  ]
};

let currentScenarioData = JSON.parse(JSON.stringify(SCENARIOS.default));

// ── Graph builder ──────────────────────────────────────────────────────────

function computeDepths(links) {
  const depth = { main: 0, master: 0 };
  let changed = true;
  while (changed) {
    changed = false;
    for (const { source, target } of links) {
      if (depth[target] !== undefined && depth[source] === undefined) {
        depth[source] = depth[target] + 1;
        changed = true;
      }
    }
  }
  return depth;
}

function buildGraph(mrs) {
  const sourceBranches = new Set(mrs.map(mr => mr.source_branch));

  const links = mrs.map(mr => ({
    source: mr.source_branch,
    target: sourceBranches.has(mr.target_branch) ? mr.target_branch : 'main',
  }));

  const depths = computeDepths(links);

  const nodes = [
    { id: 'main', type: 'master', title: 'main', depth: 0 },
    ...mrs.map(mr => ({
      id: mr.source_branch,
      iid: mr.iid,
      ticketId: mr.source_branch.match(/([A-Za-z]+-\d+)/)?.[1] ?? null,
      title: mr.title,
      state: mr.state,
      draft: mr.draft || false,
      target_branch: mr.target_branch,
      web_url: mr.web_url,
      type: 'mr',
      pipeline: mr.pipeline ?? 'success',
      changes: parseInt(mr.changes_count, 10) || 0,
      notes: mr.user_notes_count ?? 0,
      createdAt: mr.created_at,
      foreign: mr.foreign ?? false,
      conflicts: mr.has_conflicts ?? false,
      syncing: mr.syncing ?? false,
      depth: depths[mr.source_branch] ?? 1,
    })),
  ];

  return { nodes, links };
}

// ── Simulated sync ─────────────────────────────────────────────────────────

// A real rebase takes a moment: show the branches as syncing, then heal them
const SYNC_MS = 3000;

function syncThenHeal(mrs) {
  mrs.forEach(mr => { mr.syncing = true; });
  cachedGraph = buildGraph(currentScenarioData);
  broadcast(cachedGraph);

  setTimeout(() => {
    mrs.forEach(mr => {
      mr.syncing = false;
      mr.has_conflicts = false;
      mr.pipeline = 'success';
    });
    cachedGraph = buildGraph(currentScenarioData);
    broadcast(cachedGraph);
  }, SYNC_MS);
}

// ── Terminal launcher ──────────────────────────────────────────────────────

function openTerminal(command) {
  const escaped = command.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  if (process.platform === 'darwin') {
    exec(
      `osascript -e 'tell application "Terminal" to do script "${escaped}"' ` +
      `-e 'tell application "Terminal" to activate'`,
      err => { if (err) console.log(`Command triggered: ${command}`); }
    );
  } else {
    console.log(`[Terminal Action] Executing: ${command}`);
  }
}

// ── SSE & state ────────────────────────────────────────────────────────────

let cachedGraph = buildGraph(currentScenarioData);
const sseClients = new Set();

function broadcast(graph) {
  const data = `data: ${JSON.stringify(graph)}\n\n`;
  for (const res of sseClients) {
    try { res.write(data); } catch { sseClients.delete(res); }
  }
}

function readBody(req) {
  return new Promise(resolve => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
  });
}

// ── HTTP Server ────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(HTML);
  }

  if (req.method === 'GET' && pathname === '/api/mrs') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(cachedGraph));
  }

  if (req.method === 'GET' && pathname === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write(':\n\n');
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  if (req.method === 'POST' && pathname === '/api/sync') {
    const { branch } = JSON.parse(await readBody(req) || '{}');
    openTerminal(`claude "/cascade-sync ${branch}"`);

    // Heal the branch in memory
    const target = currentScenarioData.find(mr => mr.source_branch === branch);
    if (target) syncThenHeal([target]);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ launched: true, graph: cachedGraph }));
  }

  if (req.method === 'POST' && pathname === '/api/cascade-sync') {
    const { branch } = JSON.parse(await readBody(req) || '{}');
    openTerminal(`claude "/cascade-sync ${branch}"`);

    // Cascade heal from root to branch and its children
    const branchSet = new Set([branch]);
    const train = currentScenarioData.filter(mr => {
      if (!branchSet.has(mr.target_branch) && !branchSet.has(mr.source_branch)) return false;
      branchSet.add(mr.source_branch);
      return true;
    });
    syncThenHeal(train);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ launched: true, graph: cachedGraph }));
  }

  if (req.method === 'POST' && pathname === '/api/scenario') {
    const { scenario } = JSON.parse(await readBody(req) || '{}');
    if (scenario === 'reset') {
      currentScenarioData = JSON.parse(JSON.stringify(SCENARIOS.default));
    }
    cachedGraph = buildGraph(currentScenarioData);
    broadcast(cachedGraph);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(cachedGraph));
  }

  if (req.method === 'POST' && pathname === '/api/refresh') {
    cachedGraph = buildGraph(currentScenarioData);
    broadcast(cachedGraph);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(cachedGraph));
  }

  res.writeHead(404);
  res.end();
});

server.on('error', e => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} already in use — MR Solar may already be running.`);
    exec(`open http://localhost:${PORT}`);
  } else {
    throw e;
  }
});

server.listen(PORT, () => {
  console.log(`\n🪐 MR Solar System ready at http://localhost:${PORT}\n`);
});
