/* Zed Multimedia prototype – theme.
   Loaded in <head> so the theme is set before first paint (no flash).
   Uses the saved choice, else the system preference. */
(function () {
  const KEY = "zed-theme";
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const saved = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const apply = (t) => document.documentElement.setAttribute("data-theme", t);

  apply(saved() || (mq.matches ? "dark" : "light"));
  mq.addEventListener("change", (e) => { if (!saved()) apply(e.matches ? "dark" : "light"); });

  window.toggleTheme = function () {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    return next;
  };
})();
