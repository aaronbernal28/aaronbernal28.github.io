/**
 * Dynamic Procedural Scientific Visual Generator
 * Generates deterministic, domain-specific SVG visualizations seeded by project ID
 * whenever an explicit figure is not provided (or as a fallback).
 */

function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createPRNG(seedStr) {
  let a = hashSeed(seedStr || 'default-seed');
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fmt(num, digits = 1) {
  return Number(num).toFixed(digits);
}

/**
 * 1. Bipartite & Modular Network Topology (Network Science)
 */
function renderNetworkSVG(project, rand) {
  const w = 480;
  const h = 190;
  const uid = `net-${project.id.replace(/[^a-z0-9]/gi, '')}`;

  const clusters = [
    { cx: 115, cy: 95, color: '#38bdf8', count: 7 },
    { cx: 245, cy: 85, color: '#a855f7', count: 4 }, // Bridge cluster
    { cx: 370, cy: 98, color: '#34d399', count: 7 },
  ];

  const nodes = [];
  clusters.forEach((c, cIdx) => {
    for (let i = 0; i < c.count; i++) {
      const angle = (i / c.count) * Math.PI * 2 + rand() * 0.5;
      const radius = cIdx === 1 ? 18 + rand() * 22 : 26 + rand() * 38;
      const x = Math.max(28, Math.min(w - 28, c.cx + Math.cos(angle) * radius));
      const y = Math.max(26, Math.min(h - 28, c.cy + Math.sin(angle) * (radius * 0.72)));
      const r = cIdx === 1 ? 5.2 + rand() * 2.5 : 3.5 + rand() * 3.2;
      nodes.push({ id: nodes.length, x, y, r, cluster: cIdx, color: c.color });
    }
  });

  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const ni = nodes[i];
      const nj = nodes[j];
      const dist = Math.hypot(ni.x - nj.x, ni.y - nj.y);
      const sameCluster = ni.cluster === nj.cluster;
      const isBridge = Math.abs(ni.cluster - nj.cluster) === 1;
      if ((sameCluster && dist < 82 && rand() > 0.25) || (isBridge && dist < 135 && rand() > 0.62)) {
        edges.push({ a: ni, b: nj, isBridge, weight: sameCluster ? 1.4 : 1.0 });
      }
    }
  }

  const edgesSvg = edges
    .map((e, idx) => {
      const opacity = e.isBridge ? 0.42 : 0.28;
      const stroke = e.isBridge ? `url(#${uid}-grad)` : e.a.color;
      const dash = e.isBridge && idx % 2 === 0 ? 'stroke-dasharray="3 3"' : '';
      return `<line x1="${fmt(e.a.x)}" y1="${fmt(e.a.y)}" x2="${fmt(e.b.x)}" y2="${fmt(e.b.y)}" stroke="${stroke}" stroke-width="${e.weight}" stroke-opacity="${opacity}" ${dash} />`;
    })
    .join('');

  // Pick up to 3 bridge edges for animated signal particles
  const bridgeEdges = edges.filter((e) => e.isBridge).slice(0, 3);
  const pulsesSvg = bridgeEdges
    .map(
      (e, idx) => `
      <circle r="2.4" fill="#38bdf8" filter="url(#${uid}-glow)">
        <animateMotion dur="${3.2 + idx * 0.9}s" repeatCount="indefinite" path="M${fmt(e.a.x)},${fmt(e.a.y)} L${fmt(e.b.x)},${fmt(e.b.y)}" />
      </circle>`
    )
    .join('');

  const nodesSvg = nodes
    .map(
      (n, idx) => `
      <g class="proc-node">
        <circle cx="${fmt(n.x)}" cy="${fmt(n.y)}" r="${fmt(n.r + 3.5)}" fill="${n.color}" fill-opacity="0.12" />
        <circle cx="${fmt(n.x)}" cy="${fmt(n.y)}" r="${fmt(n.r)}" fill="${n.color}" stroke="#0b1120" stroke-width="1.3">
          ${
            idx % 4 === 0
              ? `<animate attributeName="r" values="${fmt(n.r)};${fmt(n.r + 1.4)};${fmt(n.r)}" dur="${2.8 + (idx % 3)}s" repeatCount="indefinite" />`
              : ''
          }
        </circle>
      </g>`
    )
    .join('');

  return `
    <svg viewBox="0 0 ${w} ${h}" class="procedural-svg" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="50%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#34d399" />
        </linearGradient>
        <filter id="${uid}-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="${w}" height="${h}" fill="transparent" />
      <g opacity="0.16" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4">
        <line x1="0" y1="45" x2="${w}" y2="45" />
        <line x1="0" y1="95" x2="${w}" y2="95" />
        <line x1="0" y1="145" x2="${w}" y2="145" />
        <line x1="160" y1="0" x2="160" y2="${h}" />
        <line x1="320" y1="0" x2="320" y2="${h}" />
      </g>
      ${edgesSvg}
      ${pulsesSvg}
      ${nodesSvg}
      <text x="14" y="20" class="proc-hud-label">G = (V, E) · |V|=${nodes.length} · Q_mod=${fmt(0.58 + rand() * 0.22, 2)}</text>
      <text x="${w - 14}" y="${h - 10}" text-anchor="end" class="proc-hud-tag">BIPARTITE PROJECTION</text>
    </svg>`;
}

/**
 * 2. Topological Persistence Manifold & Waveform (TDA & Signal Processing)
 */
function renderPersistenceSVG(project, rand) {
  const w = 480;
  const h = 190;
  const uid = `tda-${project.id.replace(/[^a-z0-9]/gi, '')}`;

  // Left: Takens phase-space / oscillatory signal (x: 20..240)
  const wavePts = [];
  const freq1 = 2.2 + rand() * 1.6;
  const freq2 = 5.5 + rand() * 2.5;
  for (let i = 0; i <= 65; i++) {
    const t = i / 65;
    const x = 22 + t * 215;
    const env = Math.sin(t * Math.PI);
    const y =
      98 +
      Math.sin(t * Math.PI * 2 * freq1) * 32 * env +
      Math.cos(t * Math.PI * 2 * freq2) * 14 * env;
    wavePts.push(`${fmt(x)},${fmt(y)}`);
  }

  // Right: Persistence Diagram (birth vs death, x: 275..445, y: 25..165)
  const pdX0 = 280;
  const pdY0 = 162;
  const pdSize = 132;
  const pdPoints = [];
  for (let i = 0; i < 14; i++) {
    const birth = rand() * 0.72;
    const persistence = i < 3 ? 0.32 + rand() * 0.45 : 0.04 + rand() * 0.16;
    const death = Math.min(0.96, birth + persistence);
    const px = pdX0 + birth * pdSize;
    const py = pdY0 - death * pdSize;
    const isH1 = i < 4;
    pdPoints.push({
      px,
      py,
      diagX: pdX0 + ((birth + death) / 2) * pdSize,
      diagY: pdY0 - ((birth + death) / 2) * pdSize,
      color: isH1 ? '#f43f5e' : '#38bdf8',
      r: isH1 ? 4.4 : 3.0,
      isH1,
    });
  }

  const pdSvg = pdPoints
    .map(
      (p) => `
      ${
        p.isH1
          ? `<line x1="${fmt(p.px)}" y1="${fmt(p.py)}" x2="${fmt(p.diagX)}" y2="${fmt(p.diagY)}" stroke="${p.color}" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="2 2" />`
          : ''
      }
      <circle cx="${fmt(p.px)}" cy="${fmt(p.py)}" r="${fmt(p.r)}" fill="${p.color}" fill-opacity="0.88" stroke="#0b1120" stroke-width="1" />`
    )
    .join('');

  return `
    <svg viewBox="0 0 ${w} ${h}" class="procedural-svg" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
          <stop offset="50%" stop-color="#38bdf8" stop-opacity="1" />
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0.85" />
        </linearGradient>
      </defs>
      <!-- Signal Panel -->
      <line x1="22" y1="98" x2="237" y2="98" stroke="currentColor" stroke-opacity="0.15" stroke-dasharray="2 3" />
      <polyline fill="none" stroke="url(#${uid}-wave)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" points="${wavePts.join(' ')}" />
      <!-- Divider -->
      <line x1="255" y1="18" x2="255" y2="${h - 18}" stroke="currentColor" stroke-opacity="0.14" />
      <!-- Persistence Diagram Panel -->
      <line x1="${pdX0}" y1="${pdY0}" x2="${pdX0 + pdSize}" y2="${pdY0}" stroke="currentColor" stroke-opacity="0.3" />
      <line x1="${pdX0}" y1="${pdY0}" x2="${pdX0}" y2="${pdY0 - pdSize}" stroke="currentColor" stroke-opacity="0.3" />
      <line x1="${pdX0}" y1="${pdY0}" x2="${pdX0 + pdSize}" y2="${pdY0 - pdSize}" stroke="currentColor" stroke-opacity="0.28" stroke-dasharray="3 3" />
      ${pdSvg}
      <text x="18" y="20" class="proc-hud-label">TAKENS EMBEDDING τ · H₀ / H₁</text>
      <text x="${w - 14}" y="${h - 10}" text-anchor="end" class="proc-hud-tag">PERSISTENCE DIAGRAM</text>
    </svg>`;
}

/**
 * 3. Deep Neural Architecture & RL Policy Flow (ML, DL & RL)
 */
function renderNeuralSVG(project, rand) {
  const w = 480;
  const h = 190;
  const layers = [4, 6, 6, 3];
  const layerX = [68, 175, 285, 395];
  const layerColors = ['#38bdf8', '#818cf8', '#a855f7', '#34d399'];

  const nodesByLayer = layers.map((count, lIdx) => {
    const span = (count - 1) * 24;
    const startY = h / 2 - span / 2 + 4;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: layerX[lIdx],
        y: startY + i * 24,
        color: layerColors[lIdx],
      });
    }
    return arr;
  });

  const synapses = [];
  for (let l = 0; l < nodesByLayer.length - 1; l++) {
    const curr = nodesByLayer[l];
    const next = nodesByLayer[l + 1];
    curr.forEach((a) => {
      next.forEach((b) => {
        const weight = rand();
        if (weight > 0.28) {
          synapses.push({
            a,
            b,
            active: weight > 0.78,
            opacity: 0.12 + weight * 0.32,
            width: 0.7 + weight * 1.4,
          });
        }
      });
    });
  }

  const linesSvg = synapses
    .map(
      (s) =>
        `<line x1="${fmt(s.a.x)}" y1="${fmt(s.a.y)}" x2="${fmt(s.b.x)}" y2="${fmt(s.b.y)}" stroke="${
          s.active ? '#38bdf8' : '#94a3b8'
        }" stroke-opacity="${fmt(s.opacity, 2)}" stroke-width="${fmt(s.width, 1)}" />`
    )
    .join('');

  const activePaths = synapses.filter((s) => s.active).slice(0, 4);
  const pulsesSvg = activePaths
    .map(
      (s, i) => `
      <circle r="2.2" fill="#34d399">
        <animateMotion dur="${1.8 + i * 0.55}s" repeatCount="indefinite" path="M${fmt(s.a.x)},${fmt(s.a.y)} L${fmt(s.b.x)},${fmt(s.b.y)}" />
      </circle>`
    )
    .join('');

  const nodesSvg = nodesByLayer
    .flat()
    .map(
      (n) => `
      <circle cx="${fmt(n.x)}" cy="${fmt(n.y)}" r="6.2" fill="${n.color}" fill-opacity="0.16" />
      <circle cx="${fmt(n.x)}" cy="${fmt(n.y)}" r="3.8" fill="${n.color}" stroke="#0b1120" stroke-width="1.2" />`
    )
    .join('');

  return `
    <svg viewBox="0 0 ${w} ${h}" class="procedural-svg" aria-hidden="true">
      ${linesSvg}
      ${pulsesSvg}
      ${nodesSvg}
      <text x="16" y="20" class="proc-hud-label">π_θ(a|s) · GRADIENT FLOW</text>
      <text x="${w - 14}" y="${h - 10}" text-anchor="end" class="proc-hud-tag">NEURAL / RL TOPOLOGY</text>
    </svg>`;
}

/**
 * 4. Minimum-Cost Flow & Warehouse Routing Grid (Optimization & OR)
 */
function renderOptimizationSVG(project, rand) {
  const w = 480;
  const h = 190;
  const cols = 7;
  const rows = 4;
  const startX = 56;
  const startY = 36;
  const stepX = 60;
  const stepY = 38;

  const gridNodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      gridNodes.push({
        r,
        c,
        x: startX + c * stepX,
        y: startY + r * stepY,
        blocked: rand() > 0.82 && !(r === 0 && c === 0) && !(r === rows - 1 && c === cols - 1),
      });
    }
  }

  // Construct an optimal monotone path from (0,0) to (rows-1, cols-1)
  let cr = 0;
  let cc = 0;
  const pathPts = [[startX, startY]];
  while (cr < rows - 1 || cc < cols - 1) {
    if (cr === rows - 1) cc++;
    else if (cc === cols - 1) cr++;
    else if (rand() > 0.42) cc++;
    else cr++;
    pathPts.push([startX + cc * stepX, startY + cr * stepY]);
  }

  const gridLines = [];
  for (let r = 0; r < rows; r++) {
    gridLines.push(
      `<line x1="${startX}" y1="${startY + r * stepY}" x2="${
        startX + (cols - 1) * stepX
      }" y2="${startY + r * stepY}" stroke="currentColor" stroke-opacity="0.14" stroke-width="1" />`
    );
  }
  for (let c = 0; c < cols; c++) {
    gridLines.push(
      `<line x1="${startX + c * stepX}" y1="${startY}" x2="${
        startX + c * stepX
      }" y2="${startY + (rows - 1) * stepY}" stroke="currentColor" stroke-opacity="0.14" stroke-width="1" />`
    );
  }

  const pathD = pathPts.map((pt, idx) => `${idx === 0 ? 'M' : 'L'}${pt[0]},${pt[1]}`).join(' ');
  const polyPts = pathPts.map((pt) => `${pt[0]},${pt[1]}`).join(' ');

  const racksSvg = gridNodes
    .map((n) => {
      const onPath = pathPts.some((p) => p[0] === n.x && p[1] === n.y);
      if (onPath) {
        return `<circle cx="${n.x}" cy="${n.y}" r="4.8" fill="#34d399" stroke="#0b1120" stroke-width="1.3" />`;
      }
      if (n.blocked) {
        return `<rect x="${n.x - 8}" y="${n.y - 6}" width="16" height="12" rx="2.5" fill="#f59e0b" fill-opacity="0.28" stroke="#f59e0b" stroke-width="1" />`;
      }
      return `<circle cx="${n.x}" cy="${n.y}" r="2.8" fill="#64748b" fill-opacity="0.55" />`;
    })
    .join('');

  return `
    <svg viewBox="0 0 ${w} ${h}" class="procedural-svg" aria-hidden="true">
      ${gridLines.join('')}
      <polyline points="${polyPts}" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.88" />
      <circle r="3.5" fill="#38bdf8">
        <animateMotion dur="3.4s" repeatCount="indefinite" path="${pathD}" />
      </circle>
      ${racksSvg}
      <text x="16" y="20" class="proc-hud-label">MIN ∑ c_ij x_ij · s.t. Ax ≤ b</text>
      <text x="${w - 14}" y="${h - 10}" text-anchor="end" class="proc-hud-tag">COMBINATORIAL FLOW</text>
    </svg>`;
}

/**
 * 5. Causal DAG & Posterior Density Curves (Statistics & Bioinformatics)
 */
function renderStatsBioSVG(project, rand) {
  const w = 480;
  const h = 190;
  const uid = `stat-${project.id.replace(/[^a-z0-9]/gi, '')}`;

  const mu1 = 155 + rand() * 25;
  const mu2 = 245 + rand() * 30;
  const sigma1 = 42;
  const sigma2 = 48;
  const baseY = 160;

  const curve1 = [];
  const curve2 = [];
  for (let x = 24; x <= 360; x += 6) {
    const y1 = baseY - 96 * Math.exp(-0.5 * ((x - mu1) / sigma1) ** 2);
    const y2 = baseY - 84 * Math.exp(-0.5 * ((x - mu2) / sigma2) ** 2);
    curve1.push(`${fmt(x)},${fmt(y1)}`);
    curve2.push(`${fmt(x)},${fmt(y2)}`);
  }

  const area1 = `24,${baseY} ${curve1.join(' ')} 360,${baseY}`;
  const area2 = `24,${baseY} ${curve2.join(' ')} 360,${baseY}`;

  // Mini Causal DAG in top-right (Z -> X, Z -> Y, X -> Y)
  const z = { x: 405, y: 42 };
  const xNode = { x: 368, y: 98 };
  const yNode = { x: 442, y: 98 };

  return `
    <svg viewBox="0 0 ${w} ${h}" class="procedural-svg" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}-c1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.38" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.02" />
        </linearGradient>
        <linearGradient id="${uid}-c2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.36" />
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="20" y1="${baseY}" x2="365" y2="${baseY}" stroke="currentColor" stroke-opacity="0.25" />
      <polygon points="${area1}" fill="url(#${uid}-c1)" />
      <polygon points="${area2}" fill="url(#${uid}-c2)" />
      <polyline points="${curve1.join(' ')}" fill="none" stroke="#38bdf8" stroke-width="2.2" />
      <polyline points="${curve2.join(' ')}" fill="none" stroke="#a855f7" stroke-width="2.2" stroke-dasharray="4 2" />
      <!-- Causal DAG -->
      <line x1="${z.x}" y1="${z.y}" x2="${xNode.x}" y2="${xNode.y}" stroke="#94a3b8" stroke-width="1.4" />
      <line x1="${z.x}" y1="${z.y}" x2="${yNode.x}" y2="${yNode.y}" stroke="#94a3b8" stroke-width="1.4" />
      <line x1="${xNode.x}" y1="${xNode.y}" x2="${yNode.x}" y2="${yNode.y}" stroke="#34d399" stroke-width="1.8" />
      <circle cx="${z.x}" cy="${z.y}" r="9" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
      <circle cx="${xNode.x}" cy="${xNode.y}" r="9" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" />
      <circle cx="${yNode.x}" cy="${yNode.y}" r="9" fill="#1e293b" stroke="#34d399" stroke-width="1.5" />
      <text x="${z.x}" y="${z.y + 3}" text-anchor="middle" class="proc-dag-label">Z</text>
      <text x="${xNode.x}" y="${xNode.y + 3}" text-anchor="middle" class="proc-dag-label">X</text>
      <text x="${yNode.x}" y="${yNode.y + 3}" text-anchor="middle" class="proc-dag-label">Y</text>
      <text x="16" y="20" class="proc-hud-label">P(Y | do(X)) · CI 95%</text>
      <text x="${w - 14}" y="${h - 10}" text-anchor="end" class="proc-hud-tag">STATISTICAL INFERENCE</text>
    </svg>`;
}

/**
 * 6. Autonomous Robotics LiDAR Raycasting & Trajectory (Robotics & C++)
 */
function renderRoboticsSVG(project, rand) {
  const w = 480;
  const h = 190;
  const rx = 225;
  const ry = 102;
  const rays = [];

  for (let i = -8; i <= 8; i++) {
    const angle = -0.35 + i * 0.12;
    const dist = 62 + rand() * 75;
    const ex = rx + Math.cos(angle) * dist;
    const ey = ry + Math.sin(angle) * dist;
    rays.push({ ex, ey });
  }

  const raysSvg = rays
    .map(
      (r) => `
      <line x1="${rx}" y1="${ry}" x2="${fmt(r.ex)}" y2="${fmt(r.ey)}" stroke="#38bdf8" stroke-opacity="0.26" stroke-width="1" />
      <circle cx="${fmt(r.ex)}" cy="${fmt(r.ey)}" r="2.3" fill="#f43f5e" />`
    )
    .join('');

  return `
    <svg viewBox="0 0 ${w} ${h}" class="procedural-svg" aria-hidden="true">
      <path d="M 45,148 Q 130,142 225,102 T 410,48" fill="none" stroke="#34d399" stroke-width="2.2" stroke-dasharray="5 4" />
      ${raysSvg}
      <circle cx="${rx}" cy="${ry}" r="12" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
      <circle cx="${rx}" cy="${ry}" r="4" fill="#38bdf8" />
      <text x="16" y="20" class="proc-hud-label">SE(2) SLAM · ROS 2 / LiDAR</text>
      <text x="${w - 14}" y="${h - 10}" text-anchor="end" class="proc-hud-tag">KINEMATIC TRAJECTORY</text>
    </svg>`;
}

/**
 * Dispatcher: Returns HTML for a project card's visual banner
 */
export function renderProjectVisualHTML(project, lang = 'en') {
  const rand = createPRNG(project.id);
  const visual = project.visual || {};
  const procType = visual.proceduralType || project.category || 'networks';
  const caption = (visual.caption && (visual.caption[lang] || visual.caption.en)) || project.title[lang] || project.title.en;

  let svgMarkup = '';
  if (procType === 'bipartite-network' || project.category === 'networks') {
    svgMarkup = renderNetworkSVG(project, rand);
  } else if (procType === 'persistence-manifold' || project.category === 'tda-signal') {
    svgMarkup = renderPersistenceSVG(project, rand);
  } else if (procType === 'neural-flow' || project.category === 'ml-ai') {
    svgMarkup = renderNeuralSVG(project, rand);
  } else if (procType === 'mincost-grid' || project.category === 'optimization') {
    svgMarkup = renderOptimizationSVG(project, rand);
  } else if (procType === 'causal-density' || project.category === 'stats-bio') {
    svgMarkup = renderStatsBioSVG(project, rand);
  } else if (procType === 'robotics-lidar' || project.category === 'robotics') {
    svgMarkup = renderRoboticsSVG(project, rand);
  } else {
    svgMarkup = renderNetworkSVG(project, rand);
  }

  if (visual.mode === 'image' && visual.src) {
    const expandLabel = lang === 'es' ? 'Ampliar figura' : 'Expand figure';
    return `
      <div class="card-visual card-visual--image" data-lightbox-src="${visual.src}" data-lightbox-caption="${caption.replace(/"/g, '&quot;')}" role="button" tabindex="0" aria-label="${expandLabel}: ${caption.replace(/"/g, '&quot;')}">
        <img src="${visual.src}" alt="${caption.replace(/"/g, '&quot;')}" loading="lazy" class="card-visual__img" onerror="this.parentElement.classList.remove('card-visual--image'); this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="card-visual__fallback" style="display:none;">${svgMarkup}</div>
        <span class="card-visual__zoom-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          ${expandLabel}
        </span>
      </div>`;
  }

  return `
    <div class="card-visual card-visual--procedural" title="${caption.replace(/"/g, '&quot;')}">
      ${svgMarkup}
    </div>`;
}
