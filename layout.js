/* Zed Multimedia prototype – shared layout.
   Renders the header, ticker and footer on every page, and provides helpers.
   Icons are from Lucide (https://lucide.dev, ISC licence), inlined as SVG. */

const LUCIDE = (children, size = 20) =>
  `<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;

const ICON = {
  menu: LUCIDE('<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>', 22),
  facebook: LUCIDE('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>', 18),
  twitter: LUCIDE('<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>', 18),
  linkedin: LUCIDE('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>', 18),
  instagram: LUCIDE('<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>', 18),
  youtube: LUCIDE('<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>', 18),
  tiktok: LUCIDE('<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>', 18), /* not in Lucide: drawn in the same style */
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
  if (variant === "video") {
    // Placeholder for a video ad, or a video that complements the article.
    // Swap .ad-video-frame's contents for a <video> or an <iframe> embed.
    return `<div class="ad ad-video" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-video-frame">
        <button class="ad-video-play" type="button" aria-label="Play video">${ICON.play}</button>
        <span class="ad-video-time">0:30</span>
      </div>
      <div class="ad-copy">
        <strong>Own a piece of paradise</strong>
        <span>2, 3 &amp; 4 bedroom homes. Watch the tour and book a viewing today.</span>
        <span class="ad-cta">Enquire now</span>
      </div>
    </div>`;
  }
  if (variant === "leaderboard") {
    return `<div class="ad ad-leaderboard" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-copy"><strong>Advertise on Zed Multimedia</strong><span>Put your brand in front of Ghana’s readers, listeners and viewers</span></div>
      <span class="ad-cta">Get in touch</span>
    </div>`;
  }
  if (variant === "house") {
    return `<div class="ad ad-square ad-house" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-copy"><strong>Listen live on ZED 101.9 FM</strong><span>News, music and talk, all day</span></div>
      <span class="ad-cta">Tune in</span>
    </div>`;
  }
  if (variant === "generic") {
    return `<div class="ad ad-square ad-generic" role="complementary" aria-label="Advertisement">
      <span class="ad-label">Advertisement</span>
      <div class="ad-copy"><strong>Your brand could be here</strong><span>Reach Ghana’s readers every day</span></div>
      <span class="ad-cta">Advertise with us</span>
    </div>`;
  }
  return `<div class="ad ad-tall" role="complementary" aria-label="Advertisement">
    <span class="ad-label">Advertisement</span>
    <svg class="ad-art" viewBox="0 0 200 120" aria-hidden="true"><rect x="0" y="86" width="200" height="34" fill="#12346b"/><rect x="30" y="44" width="38" height="38" rx="2" fill="#ff7a1a"/><rect x="72" y="44" width="38" height="38" rx="2" fill="#2fa3d8"/><rect x="114" y="44" width="38" height="38" rx="2" fill="#e8e8e8"/><rect x="50" y="60" width="38" height="38" rx="2" fill="#4B0083" opacity=".9"/></svg>
    <div class="ad-copy"><strong>Secure the latest rates</strong></div>
    <span class="ad-cta">Book now</span>
  </div>`;
};

/* Long right-hand strip: a mix of Zed's own promos and generic placeholders */
const RAIL_ADS = [
  // short: true makes a 300x250 block; otherwise a 300x600 half-page
  { own: true,  title: "Listen live on ZED 101.9 FM", sub: "News, music and talk, all day", cta: "Tune in" },
  { own: false, short: true, title: "Fast, reliable mobile data", sub: "Stay connected anywhere in Ghana", cta: "Learn more" },
  { own: false, variant: "tall" },
  { own: true,  short: true, title: "Watch ZED TV live", sub: "Streaming now on YouTube", cta: "Watch" },
  { own: false, short: true, title: "Your brand could be here", sub: "Reach Ghana’s readers every day", cta: "Advertise with us" },
  { own: true,  short: true, title: "Get the Zed newsletter", sub: "The day’s top stories in your inbox", cta: "Subscribe" },
];
const adRail = () => RAIL_ADS.map((a) => a.variant
  ? adBlock(a.variant)
  : `<div class="ad ad-square ${a.own ? "ad-house" : "ad-generic"}${a.short ? " ad-short" : ""}" role="complementary" aria-label="${a.own ? "From Zed Multimedia" : "Advertisement"}">
      <span class="ad-label">${a.own ? "From Zed" : "Advertisement"}</span>
      <div class="ad-copy"><strong>${a.title}</strong><span>${a.sub}</span></div>
      <span class="ad-cta">${a.cta}</span>
    </div>`).join("");

/* ---------- Header ---------- */
const NAV = [
  ["home", "Home"], ["news", "News"], ["business", "Business"], ["lifestyle", "Lifestyle"],
  ["leisure", "Leisure"], ["politics", "Politics"], ["technology", "Technology"]
];
/* Sub-sections that live under a menu item (so their stories highlight the right tab) */
const NAV_ALIAS = { sports: "leisure", entertainment: "leisure", tourism: "leisure" };

function headerHTML(active) {
  active = NAV_ALIAS[active] || active;
  return `
  <header class="site-header">
    <div class="header-brand-row">
      <a class="brand" href="/" aria-label="Zed Multimedia home">
        <img src="assets/zed-logo.png" alt="Zed Multimedia – New Vision" width="150" height="56">
      </a>
      ${adBlock("leaderboard")}
    </div>
    <div class="container header-top header-nav-row">
      <button class="icon-btn menu-toggle" aria-label="Open menu" aria-expanded="false">${ICON.menu}</button>
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
        <button class="live-chip" data-live-tv aria-label="Live TV" title="Live TV">${ICON.tv}<span class="live-dot" aria-hidden="true" hidden></span><span class="live-label">Live TV</span></button>
        <button class="live-chip" data-radio-toggle aria-expanded="false" aria-label="Live Radio" title="Live Radio">${ICON.radio}<span class="live-label">Live Radio</span></button>
      </div>
      <div class="radio-panel" hidden data-radio-panel>
      <div class="radio-card">
        <img src="assets/zed-logo.png" alt="" width="100" height="37">
        <p class="radio-name">ZED 101.9 FM</p>
        <button class="open-player-btn" data-open-player>${ICON.play}<span>Listen live</span></button>
        <p class="radio-note" data-radio-note aria-live="polite">Opens in a small window so it keeps playing while you browse.</p>
      </div>
    </div>
    </div>
    <div class="ticker" aria-label="Market ticker">
      <div class="container ticker-track">
        <span class="tick tick-weather" data-weather-tick>Weather…</span>
        ${ZED.TICKER.map((t, i) => `<span class="tick tick-market" tabindex="0" data-tick="${i}">${esc(t.name)} <strong>${t.value}</strong> <span class="${cls(t.change)}">${sign(t.change)}</span></span>`).join("")}
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
        <a href="https://web.facebook.com/zedfmgh" aria-label="Facebook">${ICON.facebook}</a>
        <a href="https://twitter.com/zedfmgh" aria-label="X (Twitter)">${ICON.twitter}</a>
        <a href="https://www.linkedin.com/company/zedmultimedia" aria-label="LinkedIn">${ICON.linkedin}</a>
        <a href="https://www.instagram.com/zedfmgh/" aria-label="Instagram">${ICON.instagram}</a>
        <a href="https://youtube.com/@zedtvgh" aria-label="YouTube">${ICON.youtube}</a>
        <a href="https://www.tiktok.com/@zedmultimedia" aria-label="TikTok">${ICON.tiktok}</a>
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
        ${["politics", "business", "leisure", "technology", "lifestyle"].map((s) => `<li><a href="${catUrl(s)}">${ZED.CATS[s].name}</a></li>`).join("")}
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

/* ---------- Market bar: hover/focus a chip to expand it into a detail card ---------- */
/* Prototype data: open/high/low and the trend line are derived from the mock value, not a live feed. */
function tickerDetail(t) {
  const num = (s) => parseFloat(String(s).replace(/,/g, ""));
  const decimals = (String(t.value).split(".")[1] || "").length;
  const fmt = (n) => (t.unit === "$" ? "$" : "") + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + (t.unit === "%" ? "%" : "");
  const v = num(t.value), prev = v / (1 + t.change / 100);
  // Deterministic wiggle (seeded by the name) that ends at the current value.
  let seed = [...t.name].reduce((a, c) => a + c.charCodeAt(0), 7);
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const span = Math.abs(v - prev) * 1.5 + v * 0.002;
  const pts = Array.from({ length: 24 }, (_, i) => prev + (v - prev) * (i / 23) + (rnd() - 0.5) * span);
  pts[0] = prev; pts[23] = v;
  const hi = Math.max(...pts), lo = Math.min(...pts);
  const [w0, w1] = t.wk52;
  const pos = Math.min(100, Math.max(0, ((v - w0) / (w1 - w0)) * 100));
  const W = 220, H = 46, x = (i) => (i / 23) * W, y = (p) => H - 4 - ((p - lo) / (hi - lo || 1)) * (H - 8);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(p).toFixed(1)}`).join("");
  return `
    <div class="tc-head"><strong>${esc(t.name)}</strong><span class="tc-val">${t.value}</span><span class="${cls(t.change)}">${sign(t.change)}</span></div>
    <p class="tc-desc">${esc(t.desc)}</p>
    <svg class="tc-spark ${cls(t.change)}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><path d="${line}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg>
    <dl class="tc-grid">
      <div><dt>Prev. close</dt><dd>${fmt(prev)}</dd></div>
      <div><dt>Open</dt><dd>${fmt(pts[1])}</dd></div>
      <div><dt>Day high</dt><dd>${fmt(hi)}</dd></div>
      <div><dt>Day low</dt><dd>${fmt(lo)}</dd></div>
    </dl>
    <div class="tc-range"><span>52-week range</span>
      <div class="tc-bar"><i style="left:${pos.toFixed(1)}%"></i></div>
      <div class="tc-ends"><span>${fmt(w0)}</span><span>${fmt(w1)}</span></div></div>
    <p class="tc-note">Sample data for the prototype.</p>`;
}

function wireTicker() {
  const card = document.createElement("div");
  card.className = "tick-card";
  card.setAttribute("role", "tooltip");
  card.hidden = true;
  document.body.appendChild(card);
  let hideTimer;
  const show = (el) => {
    clearTimeout(hideTimer);
    card.innerHTML = tickerDetail(ZED.TICKER[+el.dataset.tick]);
    card.hidden = false;
    const r = el.getBoundingClientRect();
    const w = card.offsetWidth;
    card.style.top = r.top + "px";
    card.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + "px";
    card.style.minWidth = r.width + "px";
    requestAnimationFrame(() => card.classList.add("is-open"));
    document.querySelectorAll(".tick-market.is-expanded").forEach((n) => n.classList.remove("is-expanded"));
    el.classList.add("is-expanded");
    el.setAttribute("aria-describedby", "tick-card");
  };
  const hide = () => {
    hideTimer = setTimeout(() => {
      card.classList.remove("is-open");
      card.hidden = true;
      document.querySelectorAll(".tick-market.is-expanded").forEach((n) => n.classList.remove("is-expanded"));
    }, 80);
  };
  card.id = "tick-card";
  document.querySelectorAll(".tick-market").forEach((el) => {
    el.addEventListener("mouseenter", () => show(el));
    el.addEventListener("focus", () => show(el));
    el.addEventListener("mouseleave", hide);
    el.addEventListener("blur", hide);
  });
  card.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  card.addEventListener("mouseleave", hide);
  window.addEventListener("scroll", () => { card.hidden = true; card.classList.remove("is-open"); }, { passive: true });
}

/* ---------- Live TV (YouTube, checked by the server) ---------- */
function wireTv() {
  const btn = document.querySelector("[data-live-tv]");
  if (!btn) return;
  const dot = btn.querySelector(".live-dot");
  const set = (live) => {
    dot.hidden = !live;
    btn.classList.toggle("is-live", live);
    const label = live ? "Live TV – on air now" : "Live TV";
    btn.setAttribute("aria-label", label);
    btn.title = label;
  };
  const poll = () =>
    fetch("/api/tv-status", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { live: false }))
      .then((d) => set(!!d.live))
      .catch(() => set(false));
  poll();
  setInterval(poll, 60 * 1000);
  btn.addEventListener("click", () => {
    const w = window.open("tv.html", "zed-tv", "popup,width=960,height=600");
    if (w) w.focus();
    else window.location.href = "tv.html";
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
  wireTv();
  wireTicker();
  wireWeather();
  wireSearch();
  wireNewsletter();
}
