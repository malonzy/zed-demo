/* Category page. One template for every section, plus search results.
   URL: category.html?c=politics   or   category.html?c=search&q=gold */

(function () {
  const params = new URLSearchParams(window.location.search);
  const slugParam = params.get("c") || "politics";
  const query = (params.get("q") || "").trim();
  const isSearch = slugParam === "search";
  const slug = isSearch ? "news" : (ZED.CATS[slugParam] ? slugParam : "politics");
  const cfg = ZED.CATS[slug];
  const root = document.getElementById("cat-root");
  let tab = 0;

  mountLayout(isSearch ? "" : slug);
  document.title = (isSearch ? `Search: ${query}` : cfg.name) + " – Zed Multimedia";

  const rotate = (arr, n) => arr.map((_, i) => arr[(i + n) % arr.length]);
  const pick = (list, idx) => idx.map((i) => list[i % list.length]).filter(Boolean);
  const showTag = slug === "news" || isSearch;

  const card = (p, mod = "") => `
    <article class="card ${mod}">
      <a class="card-img" href="${articleUrl(p)}"><img src="${p.image}" alt="" loading="lazy"></a>
      <div class="card-body">
        ${showTag ? `<span class="cat-tag">${esc(p.cat)}</span>` : ""}
        <h3><a href="${articleUrl(p)}">${esc(p.title)}</a></h3>
        <span class="time">${fmtAgo(p.minsAgo)}</span>
      </div>
    </article>`;

  const sectionTitle = (text) => `<h2 class="section-title section-title--sm">${esc(text)}</h2>`;

  function renderSearch() {
    const results = searchPosts(query);
    root.innerHTML = `
      <header class="cat-head">
        <h1>Search</h1>
        <p class="cat-sub">${results.length} result${results.length === 1 ? "" : "s"} for “${esc(query)}”</p>
      </header>
      ${results.length
        ? `<div class="grid-4">${results.map((p) => card(p)).join("")}</div>`
        : `<div class="empty">
             <p>Nothing matched “${esc(query)}”. Try a person, place or topic, or browse a section.</p>
             <p class="empty-links">${["politics", "business", "sports", "entertainment"].map((s) => `<a href="${catUrl(s)}">${ZED.CATS[s].name}</a>`).join("")}</p>
           </div>`}
      ${videoRow()}`;
  }

  function videoRow() {
    return `
      <section class="section">
        <div class="video-row">
          ${ZED.VIDEOS.map((v) => `
            <div class="video-card">
              <div class="play-badge"><img src="${v.image}" alt="" loading="lazy"><span class="play-overlay">${ICON.play}</span></div>
              <h4>${esc(v.title)}</h4>
            </div>`).join("")}
        </div>
      </section>`;
  }

  function render() {
    if (isSearch) return renderSearch();

    const base = ZED.BY_CAT[slug];
    const list = rotate(base, (tab * 2) % base.length);
    const [lead, second] = list;
    const grid = list.slice(2, 8);
    const mostRead = pick(list, [3, 7, 1, 5, 9]);
    const trending = pick(list, [2, 5, 0, 7]);
    /* Always fill the row of four: top up from the News mix if a section is short. */
    const extra = ZED.BY_CAT.news.filter((p) => !list.includes(p));
    const more = [...list.slice(8, 12), ...extra].slice(0, 4);

    root.innerHTML = `
      <header class="cat-head">
        <h1>${esc(cfg.name)}</h1>
        <nav class="cat-tabs" aria-label="${esc(cfg.name)} sections">
          ${cfg.tabs.map((t, i) => `<button type="button" class="${i === tab ? "is-active" : ""}" data-tab="${i}" aria-pressed="${i === tab}">${esc(t)}</button>`).join("")}
        </nav>
      </header>

      <section class="cat-main">
        <div class="cat-left">
          <div class="cat-lead">
            <article class="card card--feature">
              <a class="card-img" href="${articleUrl(lead)}"><img src="${lead.image}" alt=""></a>
              <div class="card-body">
                ${showTag ? `<span class="cat-tag">${esc(lead.cat)}</span>` : ""}
                <h2><a href="${articleUrl(lead)}">${esc(lead.title)}</a></h2>
                <p class="excerpt">${esc(lead.excerpt)}</p>
                <span class="time">${fmtAgo(lead.minsAgo)}</span>
              </div>
            </article>
            ${card(second, "card--tall")}
          </div>
          <div class="grid-3">${grid.map((p) => card(p)).join("")}</div>
        </div>
        <aside class="cat-side">
          ${adBlock("tall")}
          <div class="most-read">
            <h3 class="eyebrow">Most read</h3>
            <ol>
              ${mostRead.map((p, i) => `<li><span class="num">${i + 1}</span><a href="${articleUrl(p)}">${esc(p.title)}</a></li>`).join("")}
            </ol>
          </div>
          <div class="stocks-panel side-markets">
            <h3 class="eyebrow">Markets</h3>
            <ul class="mini-market">
              ${ZED.MARKET.map((m) => `<li><span>${esc(m.name)}</span><strong>${m.value}</strong><span class="${cls(m.change)}">${sign(m.change)}</span></li>`).join("")}
            </ul>
            <p class="fine">Mock data for prototype.</p>
          </div>
        </aside>
      </section>

      <section class="section">
        ${sectionTitle("Trending now")}
        <div class="trending">
          ${trending.map((p, i) => `
            <a class="trend" href="${articleUrl(p)}">
              <span class="num">${i + 1}</span>
              <span>${esc(p.title)}</span>
            </a>`).join("")}
        </div>
      </section>

      <section class="section">
        ${sectionTitle(`More in ${cfg.name}`)}
        <div class="grid-4">${more.map((p) => card(p)).join("")}</div>
      </section>

      ${videoRow()}`;

    root.querySelectorAll("[data-tab]").forEach((b) =>
      b.addEventListener("click", () => { tab = Number(b.dataset.tab); render(); }));
  }

  render();
})();
