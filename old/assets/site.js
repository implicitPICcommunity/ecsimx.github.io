const pages = [
  ["Home", "index.html"],
  ["Scientific Method", "scientific-method.html"],
  ["MPI Parallelization", "parallelization.html"],
  ["GPU Acceleration", "gpu-acceleration.html"],
  ["Benchmarks", "benchmarks.html"],
  ["Documentation", "documentation.html"],
  ["Developers", "developer-guide.html"],
  ["Contribute", "contribute.html"],
  ["Code of Conduct", "code-of-conduct.html"],
  ["Applications", "applications.html"],
  ["About", "about.html"]
];

const leaf = location.pathname.split("/").pop() || "index.html";
const current = leaf.endsWith(".html") ? leaf : leaf + ".html";
const savedTheme = (() => { try { return localStorage.getItem("ecsimx-theme"); } catch { return null; } })();
if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme;

const nav = document.querySelector("[data-site-nav]");
if (nav) {
  nav.innerHTML = `
    <a class="brand" href="index.html" aria-label="ECsim-X home">
      <img class="brand-logo" data-brand-logo src="assets/ecsimx-logo-dark.svg" alt="ECsim-X: Energy-Conserving Semi-Implicit PIC" width="190" height="64">
    </a>
    <div class="nav-controls">
      <button class="theme-toggle" type="button" aria-label="Switch to light mode" title="Switch theme"><span class="theme-icon" aria-hidden="true">☼</span><span class="theme-label">Light mode</span></button>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open ECsim-X navigation" title="Open navigation"><span class="menu-brand-label">ECsim<span class="menu-brand-hyphen">-</span><b>X</b></span><svg class="menu-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
    <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation" hidden>
      <div class="nav-section-label">Explore ECsim-X</div>
      ${pages.map(([label, href]) => `<a href="${href}" ${current === href ? 'aria-current="page"' : ''}>${label}</a>`).join("")}
    </nav>`;
  const toggle = nav.querySelector(".menu-toggle");
  const menu = nav.querySelector(".primary-nav");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open ECsim-X navigation");
    menu.hidden = true;
    menu.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "Open ECsim-X navigation" : "Close ECsim-X navigation");
    menu.hidden = open;
    menu.classList.toggle("is-open", !open);
  });
  menu.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", e => { if (!nav.contains(e.target)) closeMenu(); });

  const themeButton = nav.querySelector(".theme-toggle");
  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    themeButton.querySelector(".theme-label").textContent = theme === "dark" ? "Light mode" : "Dark mode";
    themeButton.querySelector(".theme-icon").textContent = theme === "dark" ? "☼" : "◐";
    const logo = nav.querySelector("[data-brand-logo]");
    if (logo) logo.src = theme === "light" ? "assets/ecsimx-logo-light.svg" : "assets/ecsimx-logo-dark.svg";
    try { localStorage.setItem("ecsimx-theme", theme); } catch {}
  };
  applyTheme(document.documentElement.dataset.theme || "dark");
  themeButton.addEventListener("click", () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
}

const footer = document.querySelector("[data-site-footer]");
if (footer) {
  footer.innerHTML = `
    <div class="footer-main">
      <a class="brand footer-brand" href="index.html"><img class="footer-logo" src="assets/ecsimx-logo-dark.svg" alt="ECsim-X" width="180" height="60" data-footer-logo></a>
      <p>ECsim-X is a scientific application for space plasma physics simulations using an energy-conserving semi-implicit Particle-in-Cell method.</p>
      <p class="footer-note">The code is publicly available. Public availability does not by itself imply an open-source license; users should consult the project's official distribution terms.</p>
    </div>
    <div class="footer-links"><span>Project</span>${pages.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div>
    <div class="footer-bottom"><span>© <span data-year></span> ECsim-X · Scientific simulation software</span><a href="#main">Back to top ↑</a></div>`;
  const syncFooterLogo = () => { const img=footer.querySelector('[data-footer-logo]'); if(img) img.src=document.documentElement.dataset.theme==='light'?'assets/ecsimx-logo-light.svg':'assets/ecsimx-logo-dark.svg'; };
  syncFooterLogo();
  document.addEventListener('click', e => { if(e.target.closest('.theme-toggle')) syncFooterLogo(); });
}

document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
const search = document.querySelector("[data-doc-search]");
if (search) {
  const cards = [...document.querySelectorAll("[data-searchable]")];
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    cards.forEach(card => { card.hidden = !card.textContent.toLowerCase().includes(q); });
  });
}
document.querySelectorAll("[data-tab-group]").forEach(group => {
  const buttons = [...group.querySelectorAll("[role=tab]")];
  const panels = [...group.querySelectorAll("[role=tabpanel]")];
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(b => b.setAttribute("aria-selected", String(b === button)));
    panels.forEach(p => p.hidden = p.id !== button.getAttribute("aria-controls"));
  }));
});
document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const code = document.getElementById(button.dataset.copy);
    if (!code) return;
    try { await navigator.clipboard.writeText(code.innerText); const old = button.textContent; button.textContent = "Copied"; setTimeout(() => button.textContent = old, 1200); }
    catch { button.textContent = "Select text to copy"; }
  });
});

/* Home hero: electrons (small, fast, one sense) and ions (large, slow, opposite sense) gyrating in a uniform B field. Illustrative only. */
(() => {
  const canvas = document.querySelector("[data-gyro]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W = 0, H = 0, dpr = 1, parts = [], colors = {}, raf = 0, running = false;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    colors = { ion: cs.getPropertyValue("--orange").trim(), ele: cs.getPropertyValue("--plasma").trim() };
  };
  const build = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const wide = W > 760, n = wide ? 15 : 9, k = Math.min(W, 1100) / 1100;
    parts = [];
    for (let i = 0; i < n; i++) {
      const ion = i % 3 === 0;
      parts.push({
        ion, cx: wide ? rnd(W * .38, W * .98) : rnd(0, W), cy: rnd(H * .1, H * .9),
        r: (ion ? rnd(70, 150) : rnd(16, 46)) * Math.max(k, .6),
        w: (ion ? -1 : 1) * (ion ? rnd(.35, .6) : rnd(1.3, 2.2)),
        a: rnd(0, 6.28), vx: rnd(.08, .22), vy: rnd(-.05, .05), trail: []
      });
    }
  };
  const step = dt => {
    for (const p of parts) {
      p.a += p.w * dt; p.cx += p.vx * dt * 18; p.cy += p.vy * dt * 18;
      if (p.cx - p.r > W + 40) { p.cx = -p.r - 40; p.trail.length = 0; p.cy = rnd(H * .1, H * .9); }
      p.trail.push([p.cx + Math.cos(p.a) * p.r, p.cy + Math.sin(p.a) * p.r]);
      if (p.trail.length > (p.ion ? 260 : 150)) p.trail.shift();
    }
  };
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    for (const p of parts) {
      const t = p.trail, n = t.length; if (n < 2) continue;
      ctx.strokeStyle = p.ion ? colors.ion : colors.ele; ctx.lineWidth = p.ion ? 2.2 : 1.5;
      for (let i = 1; i < n; i += 2) {
        ctx.globalAlpha = (i / n) * (p.ion ? .8 : .7);
        ctx.beginPath(); ctx.moveTo(t[i - 1][0], t[i - 1][1]); ctx.lineTo(t[Math.min(i + 1, n - 1)][0], t[Math.min(i + 1, n - 1)][1]); ctx.stroke();
      }
      ctx.globalAlpha = 1; ctx.fillStyle = p.ion ? colors.ion : colors.ele;
      ctx.beginPath(); ctx.arc(t[n - 1][0], t[n - 1][1], p.ion ? 4.5 : 3, 0, 6.283); ctx.fill();
    }
  };
  let last = 0;
  const loop = ts => { const dt = Math.min((ts - last) / 1000 || .016, .05); last = ts; step(dt); draw(); raf = requestAnimationFrame(loop); };
  const start = () => { if (!running && !still) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  const init = () => { readColors(); build(); for (let i = 0; i < 260; i++) step(.03); draw(); };
  init();
  addEventListener("resize", () => { init(); });
  new MutationObserver(() => { readColors(); draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  new IntersectionObserver(e => e[0].isIntersecting ? start() : stop()).observe(canvas);
})();
