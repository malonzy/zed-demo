/* Zed Multimedia prototype – shared layout.
   Renders the header, ticker and footer on every page, and provides helpers.
   Icons are from Lucide (https://lucide.dev, ISC licence), inlined as SVG. */

const LUCIDE = (children, size = 20) =>
  `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;

const ICON = {
  menu: LUCIDE('<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>', 22),
  search: LUCIDE('<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>', 18),
  tv: LUCIDE('<path d="m17 2-5 5-5-5"/><rect width="20" height="15" x="2" y="7" rx="2"/>', 18),
  radio: LUCIDE('<path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/><circle cx="12" cy="12" r="2"/>', 18),
  play: LUCIDE('<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>', 16),
  sun: LUCIDE('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>', 18).replace('class="icon"', 'class="icon icon-sun"'),
  moon: LUCIDE('<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>', 18).replace('class="icon"', 'class="icon icon-moon"'),
  pause: LUCIDE('<rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/>', 16)
};

/* ---------- Helpers ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sign = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
const cls = (n) => (n >= 0 ? "up" : "down");
const articleUrl = (p) => `article.html?id=${encodeURIComponent(p.id)}`;
const catUrl = (slug) => (slug === "home" ? "index.html" : `category.html?c=${slug}`);

const fmtAgo = (mins) => {
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  return "Yesterday";
};
const fmtPublished = (mins) => {
  const d = new Date(new Date("2026-10-22T11:00:00Z").getTime() - mins * 60000);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })
    .replace(",", "").toUpperCase();
};

/* Placeholder ad blocks. Swap for real ad tags later. */
const adBlock = (variant = "tall") => {
  if (variant === "banner") {
    return `<div class="ad ad-banner" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-copy"><strong>Own a piece of paradise</strong><span>2, 3 &amp; 4 bedroom homes</span></div>
      <span class="ad-cta">Enquire now</span>
    </div>`;
  }
  return `<div class="ad ad-tall" role="complementary" aria-label="Advertisement">
    <span class="ad-label">Advertisement</span>
    <svg class="ad-art" viewBox="0 0 200 120" aria-hidden="true"><rect x="0" y="86" width="200" height="34" fill="#12346b"/><rect x="30" y="44" width="38" height="38" rx="2" fill="#ff7a1a"/><rect x="72" y="44" width="38" height="38" rx="2" fill="#2fa3d8"/><rect x="114" y="44" width="38" height="38" rx="2" fill="#e8e8e8"/><rect x="50" y="60" width="38" height="38" rx="2" fill="#4B0083" opacity=".9"/></svg>
    <div class="ad-copy"><strong>Secure the latest rates</strong></div>
    <span class="ad-cta">Book now</span>
  </div>`;
};

/* ---------- Header ---------- */
const NAV = [
  ["home", "Home"], ["news", "News"], ["business", "Business"], ["politics", "Politics"],
  ["lifestyle", "Lifestyle"], ["sports", "Sports"], ["entertainment", "Entertainment"], ["technology", "Technology"]
];

function headerHTML(active) {
  return `
  <header class="site-header">
    <div class="container header-top">
      <button class="icon-btn menu-toggle" aria-label="Open menu" aria-expanded="false">${ICON.menu}</button>
      <a class="brand" href="/" aria-label="Zed Multimedia home">
        <img src="assets/zed-logo.png" alt="Zed Multimedia – New Vision" width="150" height="56">
      </a>
      <nav class="main-nav" aria-label="Primary">
        ${NAV.map(([slug, label]) => `<a href="${catUrl(slug)}"${slug === active ? ' class="is-active" aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
      <div class="header-tools">
        <form class="search" role="search" data-search autocomplete="off">
          <input type="search" placeholder="Search" aria-label="Search" data-search-input>
          <button type="submit" aria-label="Search">${ICON.search}</button>
          <div class="search-results" data-search-results hidden></div>
        </form>
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode" title="Toggle dark mode">${ICON.moon}${ICON.sun}</button>
        <button class="live-chip" data-live-tvaria-label="Live TV" title="Live TV">${ICON.tv}<span class="live-label">Live TV</span></button>
        <button class="live-chip" data-radio-toggle aria-expanded="false" aria-label="Live Radio" title="Live Radio">${ICON.radio}<span class="live-label">Live Radio</span></button>
      </div>
    </div>
    <div class="radio-panel" hidden data-radio-panel>
      <div class="radio-card">
        <img src="assets/zed-logo.png" alt="" width="100" height="37">
        <p class="radio-name">ZED 101.9 FM</p>
        <button class="open-player-btn" data-open-player>${ICON.play}<span>Listen live</span></button>
        <p class="radio-note" data-radio-note aria-live="polite">Opens in a small window so it keeps playing while you browse.</p>
      </div>
    </div>
    <div class="ticker" aria-label="Market ticker">
      <div class="container ticker-track">
        <span class="tick tick-weather" data-weather-tick>Weather…</span>
        ${ZED.TICKER.map((t) => `<span class="tick">${esc(t.name)} <strong>${t.value}</strong> <span class="${cls(t.change)}">${sign(t.change)}</span></span>`).join("")}
      </div>
    </div>
  </header>`;
}

/* ---------- Footer ---------- */
function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="container footer-logo-row">
      <img src="assets/zed-logo.png" alt="Zed Multimedia" width="140" height="52">
      <div class="social">
        <a href="https://web.facebook.com/zedfmgh" aria-label="Facebook">f</a>
        <a href="https://twitter.com/zedfmgh" aria-label="X">X</a>
        <a href="https://www.linkedin.com/company/zedmultimedia" aria-label="LinkedIn">in</a>
        <a href="https://www.instagram.com/zedfmgh/" aria-label="Instagram">ig</a>
        <a href="https://youtube.com/@zedtvgh" aria-label="YouTube">yt</a>
        <a href="https://www.tiktok.com/@zedmultimedia" aria-label="TikTok">tt</a>
      </div>
    </div>
    <div class="container footer-grid">
      <ul>
        <li><a href="#">About ZED Multimedia</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Partners</a></li>
      </ul>
      <ul>
        ${["politics", "business", "sports", "technology", "lifestyle", "entertainment"].map((s) => `<li><a href="${catUrl(s)}">${ZED.CATS[s].name}</a></li>`).join("")}
      </ul>
      <div class="newsletter">
        <h4>Subscribe to our newsletter</h4>
        <p>Be the first to know what we have for you. Stay on top of the latest news and happenings.</p>
        <form data-newsletter>
          <input type="email" placeholder="Enter your email" aria-label="Email" required>
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div class="enquiries">
        <h4>Enquiries</h4>
        <p>For any enquiries, <a href="mailto:info@zedmultimedia.com">send us a message</a>.</p>
        <p>Zed Multimedia offers a comprehensive media experience including TV, Radio, Newspaper, Online platforms and a Tech Hub.</p>
      </div>
    </div>
    <div class="footer-legal">
      <a href="#">Privacy Policy</a><span>|</span><a href="#">Cookie Notice</a><span>|</span><a href="#">Terms of Service</a>
      <p>All rights reserved. © 2026 ZED Multimedia Ltd.</p>
    </div>
  </footer>`;
}

/* ---------- Behaviour ---------- */
function wireRadio() {
  const btn = document.querySelector("[data-radio-toggle]");
  const panel = document.querySelector("[data-radio-panel]");
  btn.addEventListener("click", () => {
    const open = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden", !open);
    btn.setAttribute("aria-expanded", String(open));
  });
  // Playback lives in a pop-out window so it survives page navigation.
  document.querySelector("[data-open-player]").addEventListener("click", () => {
    const w = window.open("radio.html", "zed-radio", "popup,width=300,height=230");
    if (w) w.focus();
    else document.querySelector("[data-radio-note]").textContent = "Allow pop-ups to open the player.";
  });
}

/* ---------- Weather (Open-Meteo, no API key) ---------- */
const WEATHER_CITIES = {
  Accra: [5.56, -0.2], Kumasi: [6.69, -1.62], Takoradi: [4.9, -1.76], Tamale: [9.4, -0.84]
};
const WEATHER_TTL = 20 * 60 * 1000;

/* WMO weather code -> [emoji, label] */
function weatherInfo(code) {
  if (code === 0) return ["☀️", "Clear"];
  if (code <= 2) return ["⛅", "Partly cloudy"];
  if (code === 3) return ["☁️", "Overcast"];
  if (code <= 48) return ["🌫️", "Fog"];
  if (code <= 57) return ["🌦️", "Drizzle"];
  if (code <= 67) return ["🌧️", "Rain"];
  if (code <= 77) return ["❄️", "Snow"];
  if (code <= 82) return ["🌧️", "Showers"];
  return ["⛈️", "Thunderstorm"];
}

function savedCity() {
  try { const c = localStorage.getItem("zed-weather-city"); if (WEATHER_CITIES[c]) return c; } catch (e) {}
  return "Accra";
}

async function fetchWeather(city) {
  const key = `zed-weather-${city}`;
  try {
    const hit = JSON.parse(localStorage.getItem(key));
    if (hit && Date.now() - hit.t < WEATHER_TTL) return hit.data;
  } catch (e) {}
  const [lat, lon] = WEATHER_CITIES[city];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=auto&forecast_days=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("weather " + res.status);
  const data = await res.json();
  try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), data })); } catch (e) {}
  return data;
}

async function wireWeather() {
  const tick = document.querySelector("[data-weather-tick]");
  const card = document.querySelector("[data-weather-card]");

  const load = async (city) => {
    try {
      const w = await fetchWeather(city);
      const [icon] = weatherInfo(w.current.weather_code);
      tick.innerHTML = `${esc(city)} <strong>${Math.round(w.current.temperature_2m)}°C</strong> ${icon}`;
      if (card) renderWeatherCard(card, city, w);
    } catch (e) {
      tick.hidden = true;
      if (card) card.querySelector("[data-weather-body]").textContent = "Weather unavailable right now.";
    }
  };

  if (card) {
    const sel = card.querySelector("[data-weather-city]");
    sel.innerHTML = Object.keys(WEATHER_CITIES).map((c) => `<option>${c}</option>`).join("");
    sel.value = savedCity();
    sel.addEventListener("change", () => {
      try { localStorage.setItem("zed-weather-city", sel.value); } catch (e) {}
      load(sel.value);
    });
  }
  load(savedCity());
}

function renderWeatherCard(card, city, w) {
  const [icon, label] = weatherInfo(w.current.weather_code);
  const day = (iso) => new Date(iso + "T12:00").toLocaleDateString("en-GB", { weekday: "short" });
  card.querySelector("[data-weather-body]").innerHTML = `
    <div class="weather-now">
      <span class="weather-icon">${icon}</span>
      <div><strong>${Math.round(w.current.temperature_2m)}°C</strong><span>${label}</span></div>
    </div>
    <ul class="weather-days">
      ${w.daily.time.slice(1, 5).map((d, i) => `
        <li><span>${day(d)}</span><span>${weatherInfo(w.daily.weather_code[i + 1])[0]}</span>
        <span>${Math.round(w.daily.temperature_2m_max[i + 1])}° / ${Math.round(w.daily.temperature_2m_min[i + 1])}°</span></li>`).join("")}
    </ul>`;
}

/* Mock search: filters the prototype's posts by title and excerpt. */
function searchPosts(q) {
  const term = q.trim().toLowerCase();
  if (term.length < 2) return [];
  return ZED.ALL.filter((p) => (p.title + " " + p.excerpt + " " + p.cat).toLowerCase().includes(term));
}

function wireSearch() {
  const form = document.querySelector("[data-search]");
  const input = document.querySelector("[data-search-input]");
  const box = document.querySelector("[data-search-results]");

  const render = () => {
    const results = searchPosts(input.value);
    if (input.value.trim().length < 2) { box.setAttribute("hidden", ""); return; }
    box.removeAttribute("hidden");
    box.innerHTML = results.length
      ? results.slice(0, 6).map((p) => `
          <a class="sr-item" href="${articleUrl(p)}">
            <img src="${p.image}" alt="" loading="lazy">
            <span><strong>${esc(p.title)}</strong><em>${esc(p.cat)}</em></span>
          </a>`).join("") + `<a class="sr-all" href="category.html?c=search&q=${encodeURIComponent(input.value.trim())}">See all ${results.length} result${results.length > 1 ? "s" : ""}</a>`
      : `<p class="sr-empty">No results for “${esc(input.value.trim())}”.</p>`;
  };

  input.addEventListener("input", render);
  input.addEventListener("focus", render);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) window.location.href = `category.html?c=search&q=${encodeURIComponent(q)}`;
  });
  document.addEventListener("click", (e) => { if (!form.contains(e.target)) box.setAttribute("hidden", ""); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") box.setAttribute("hidden", ""); });
}

function wireNewsletter() {
  const f = document.querySelector("[data-newsletter]");
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    f.innerHTML = "<p>Thanks, you're on the list.</p>";
  });
}

/* Entry point: each page calls mountLayout("<active nav slug>") */
function mountLayout(active) {
  document.getElementById("site-header").outerHTML = headerHTML(active);
  document.getElementById("site-footer").outerHTML = footerHTML();
  document.querySelector("[data-theme-toggle]").addEventListener("click", () => window.toggleTheme());
  wireRadio();
  wireWeather();
  wireSearch();
  wireNewsletter();
}
