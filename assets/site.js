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
