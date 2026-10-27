/* Zed Multimedia prototype – pop-out radio player.
   Lives in its own window so the stream keeps playing while the main site navigates. */

const RADIO_STREAM_URL = "https://radio.zedmultimedia.com:8000/radio.mp3";

const svg = (children) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;
const PLAY = svg('<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>');
const PAUSE = svg('<rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/>');

const playBtn = document.querySelector("[data-play]");
const volume = document.querySelector("[data-volume]");
const note = document.querySelector("[data-radio-note]");
const audio = new Audio();
audio.preload = "none";
audio.volume = volume.value / 100;

const setState = (playing, msg = "") => {
  playBtn.dataset.on = playing ? "1" : "0";
  playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
  playBtn.innerHTML = playing ? PAUSE : PLAY;
  note.textContent = msg;
};

const start = () => {
  audio.src = RADIO_STREAM_URL;
  setState(true, "Connecting…");
  return audio.play().catch(() => setState(false, "Press play to listen."));
};

const stop = () => {
  audio.pause();
  audio.removeAttribute("src");
  audio.load(); // drop the connection so resuming rejoins the live edge
  setState(false);
};

playBtn.addEventListener("click", () => (playBtn.dataset.on === "1" ? stop() : start()));
volume.addEventListener("input", () => { audio.volume = volume.value / 100; });
audio.addEventListener("playing", () => { note.textContent = "Live now"; });
audio.addEventListener("waiting", () => { if (playBtn.dataset.on === "1") note.textContent = "Buffering…"; });
audio.addEventListener("error", () => {
  if (audio.getAttribute("src")) setState(false, "Stream unavailable right now.");
});

setState(false);
start(); // opened from a click on the main site; falls back to the play button if blocked
