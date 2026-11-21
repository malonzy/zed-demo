/* Zed Multimedia prototype – Live TV pop-out.
   Asks the server whether the YouTube channel is on air, then embeds the stream.
   While offline it shows a fallback and keeps checking, switching to the stream
   by itself when the broadcast starts. */
const CHANNEL_URL = "https://youtube.com/@zedtvgh";
const stage = document.querySelector("[data-tv-stage]");
const dot = document.querySelector("[data-tv-dot]");
const badge = document.querySelector("[data-tv-badge]");
const title = document.querySelector("[data-tv-title]");
let playing = null; // videoId currently embedded

function showOffline() {
  playing = null;
  dot.hidden = true;
  badge.textContent = "Off air";
  title.textContent = "ZED TV";
  stage.innerHTML = `<div class="tv-offline">
    <h2>We're not live right now</h2>
    <p>This window will start the stream by itself when ZED TV goes on air.</p>
    <a href="${CHANNEL_URL}" target="_blank" rel="noopener">Watch recent shows on YouTube</a>
  </div>`;
  // Open the channel in the main browser, then close this pop-out.
  stage.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    window.open(CHANNEL_URL, "_blank", "noopener");
    window.close(); // works because the pop-out was opened by the site; otherwise the window simply stays
  });
}

function showLive(d) {
  dot.hidden = false;
  badge.textContent = "On air now";
  title.textContent = d.title || "ZED TV";
  if (playing === d.videoId) return;
  playing = d.videoId;
  stage.innerHTML = `<iframe title="ZED TV live"
    src="https://www.youtube.com/embed/${encodeURIComponent(d.videoId)}?autoplay=1&rel=0"
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
}

function check() {
  fetch("/api/tv-status", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : { live: false }))
    .then((d) => (d.live && d.videoId ? showLive(d) : showOffline()))
    .catch(showOffline);
}
check();
setInterval(check, 60 * 1000);
