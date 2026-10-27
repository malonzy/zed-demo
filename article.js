/* Article page.  URL: article.html?id=energy-shortfall
   Posts with full text come from ZED.ARTICLES. Others show their excerpt and a link to the live story. */

(function () {
  const id = new URLSearchParams(window.location.search).get("id") || "energy-shortfall";
  const post = ZED.ALL.find((p) => p.id === id);
  const root = document.getElementById("article-root");

  mountLayout(post ? post.catSlug : "");

  if (!post) {
    document.title = "Story not found – Zed Multimedia";
    root.innerHTML = `
      <div class="empty empty--page">
        <h1>Story not found</h1>
        <p>That story isn’t in the prototype. Head back to the <a href="index.html">home page</a>.</p>
      </div>`;
    return;
  }

  document.title = `${post.title} – Zed Multimedia`;
  const full = ZED.ARTICLES[post.id];
  const body = full ? full.body : [post.excerpt, "This is a prototype preview, so the full text isn’t loaded here."];

  const stocksCard = () => `
    <div class="stocks-panel">
      <h3 class="eyebrow">Stocks</h3>
      <table class="stocks-table">
        <thead><tr><th>Symbol</th><th>Price</th><th>Change</th></tr></thead>
        <tbody>${ZED.STOCKS.map((s) => `<tr><td>${s.symbol}</td><td>${s.price.toFixed(2)}</td><td class="${cls(s.change)}">${sign(s.change)}</td></tr>`).join("")}</tbody>
      </table>
      <h3 class="eyebrow">Markets</h3>
      <ul class="mini-market">
        ${ZED.MARKET.map((m) => `<li><span>${esc(m.name)}</span><strong>${m.value}</strong><span class="${cls(m.change)}">${sign(m.change)}</span></li>`).join("")}
      </ul>
      <p class="fine">Mock data for prototype.</p>
    </div>`;

  const related = ZED.BY_CAT[post.catSlug].filter((p) => p.id !== post.id);
  const relCard = (p, mod = "") => `
    <article class="card ${mod}">
      <a class="card-img" href="${articleUrl(p)}"><img src="${p.image}" alt="" loading="lazy"></a>
      <div class="card-body">
        <h3><a href="${articleUrl(p)}">${esc(p.title)}</a></h3>
        <span class="time">${fmtAgo(p.minsAgo)}</span>
      </div>
    </article>`;

  root.innerHTML = `
    <article class="article">
      <header class="article-head">
        <a class="crumb" href="${catUrl(post.catSlug)}">${esc(post.cat)}</a>
        <h1>${esc(post.title)}</h1>
        <p class="meta">Published ${fmtPublished(post.minsAgo)}</p>
      </header>

      <div class="article-grid">
        <div class="article-main">
          ${full && full.keyPoints ? `
            <section class="key-points" aria-label="Key points">
              <h2>Key<br>points</h2>
              <ul>${full.keyPoints.map((k) => `<li>${esc(k)}</li>`).join("")}</ul>
            </section>` : ""}

          <figure class="article-figure">
            <img src="${post.image}" alt="">
            ${full && full.caption ? `<figcaption>${esc(full.caption)}</figcaption>` : ""}
          </figure>

          <div class="article-body">
            ${body.map((t) => `<p>${esc(t)}</p>`).join("")}
            ${!full && post.link ? `<a class="btn-link" href="${post.link}" target="_blank" rel="noopener">Read the full story on zedmultimedia.com</a>` : ""}
          </div>
        </div>

        <aside class="article-side">
          ${adBlock("tall")}
          ${stocksCard()}
        </aside>
      </div>
    </article>

    <section class="section">
      <h2 class="section-title">More in ${esc(post.cat)}</h2>
      <div class="grid-2">${related.slice(0, 2).map((p) => relCard(p, "card--wide")).join("")}</div>
      <div class="grid-3 grid-3--gap">${related.slice(2, 5).map((p) => relCard(p)).join("")}</div>
    </section>`;
})();
