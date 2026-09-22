// Loaded in <head> (not deferred) so a saved theme applies before first paint.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      root.setAttribute('data-theme', saved);
    }
  } catch (e) { /* storage blocked: fall back to the system setting */ }
})();
