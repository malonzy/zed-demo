/* Zed Multimedia prototype – home page.
   Data comes from data.js, shared layout from layout.js. */

mountLayout("home");

const POSTS = ZED.HOME;

function renderHero() {
  const [lead, ...rest] = POSTS;
  document.querySelector("[data-hero]").innerHTML = `
    <img src="${lead.image}" alt="">
    <div class="hero-copy">
      <span class="cat-tag">${esc(lead.cat)}</span>
      <h1><a href="${articleUrl(lead)}">${esc(lead.title)}</a></h1>
      <span class="time">${fmtAgo(lead.minsAgo)}</span>
    </div>`;

  document.querySelector("[data-hero-side]").innerHTML = rest.slice(0, 2).map((p) => `
    <article>
      <a href="${articleUrl(p)}"><img src="${p.image}" alt=""></a>
      <span class="cat-tag">${esc(p.cat)}</span>
      <h3><a href="${articleUrl(p)}">${esc(p.title)}</a></h3>
      <span class="time">${fmtAgo(p.minsAgo)}</span>
    </article>`).join("");
}

function renderLatest() {
  document.querySelector("[data-latest]").innerHTML = POSTS.slice(0, 6).map((p) => `
    <li>
      <span class="time">${fmtAgo(p.minsAgo)}</span>
      <a href="${articleUrl(p)}">${esc(p.title)}</a>
    </li>`).join("");
}

function renderStocks() {
  document.querySelector("[data-stocks]").innerHTML = ZED.STOCKS.map((s) => `
    <tr><td>${s.symbol}</td><td>${s.price.toFixed(2)}</td><td class="${cls(s.change)}">${sign(s.change)}</td></tr>`).join("");
  document.querySelector("[data-mini-market]").innerHTML = ZED.MARKET.map((m) => `
    <li><span>${esc(m.name)}</span><strong>${m.value}</strong><span class="${cls(m.change)}">${sign(m.change)}</span></li>`).join("");
}

function renderStoryList() {
  document.querySelector("[data-story-list]").innerHTML = POSTS.slice(2, 6).map((p) => `
    <article>
      <div>
        <span class="cat-tag">${esc(p.cat)}</span>
        <h3><a href="${articleUrl(p)}">${esc(p.title)}</a></h3>
        <span class="time">${fmtAgo(p.minsAgo)}</span>
      </div>
      <a href="${articleUrl(p)}"><img src="${p.image}" alt=""></a>
    </article>`).join("");
}

function renderVideos() {
  document.querySelector("[data-video]").innerHTML = ZED.VIDEOS.map((v) => `
    <div class="video-card">
      <div class="play-badge"><img src="${v.image}" alt=""><span class="play-overlay">${ICON.play}</span></div>
      <h4>${esc(v.title)}</h4>
    </div>`).join("");
}

function renderMarket() {
  document.querySelector("[data-market]").innerHTML = `
    <table>
      <thead><tr><th>Index</th><th>Value</th><th>Change</th></tr></thead>
      <tbody>${ZED.MARKET.map((m) => `<tr><td>${esc(m.name)}</td><td>${m.value}</td><td class="${cls(m.change)}">${sign(m.change)}</td></tr>`).join("")}</tbody>
    </table>`;
}

function renderPolitics() {
  document.querySelector("[data-politics]").innerHTML = ZED.BY_CAT.politics.slice(0, 3).map((p) => `
    <article>
      <a href="${articleUrl(p)}"><img src="${p.image}" alt=""></a>
      <h3><a href="${articleUrl(p)}">${esc(p.title)}</a></h3>
    </article>`).join("");
}

document.querySelector("[data-banner-ad]").innerHTML = adBlock("banner");
const railInner = document.querySelector("[data-ad-rail]");
railInner.innerHTML = adRail();

/* The rail is taller than the screen, so it follows the reader: scrolling down it pins its
   bottom to the bottom of the window (showing the lower ads), scrolling up it pins its top. */
(function stickyRail() {
  const column = railInner.parentElement;
  const GAP = 16;
  const wide = window.matchMedia("(min-width: 1281px)");
  let offset = 0, queued = false;

  function update() {
    queued = false;
    if (!wide.matches) { railInner.style.transform = ""; offset = 0; return; }
    const colTop = column.getBoundingClientRect().top + window.scrollY;
    const maxOffset = Math.max(0, column.offsetHeight - railInner.offsetHeight);
    const vh = window.innerHeight;
    const upper = window.scrollY + GAP - colTop;                          // top may not fall below the window top
    const lower = window.scrollY + vh - GAP - railInner.offsetHeight - colTop; // bottom may not rise above the window bottom
    // Rail shorter than the window: just pin the top.
    offset = lower > upper ? upper : Math.min(Math.max(offset, lower), upper);
    offset = Math.min(Math.max(offset, 0), maxOffset);
    railInner.style.transform = `translateY(${offset}px)`;
  }
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  wide.addEventListener("change", queue);
  update();
})();

renderHero();
renderLatest();
renderStocks();
renderStoryList();
renderVideos();
renderMarket();
renderPolitics();
