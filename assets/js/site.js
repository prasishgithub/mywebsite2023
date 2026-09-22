// Progressive enhancement only. Every page works without this file.
(function () {
  'use strict';

  var root = document.documentElement;

  // Theme toggle: system default, with a remembered manual override.
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      toggle.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  // Mobile navigation.
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };
    navToggle.addEventListener('click', function () {
      setOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // App category filter.
  var chips = document.querySelectorAll('.chip[data-filter]');
  var apps = document.querySelectorAll('.app[data-cat]');
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      Array.prototype.forEach.call(chips, function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      Array.prototype.forEach.call(apps, function (app) {
        app.hidden = f !== 'all' && app.getAttribute('data-cat') !== f;
      });
    });
  });
  var filterBar = document.querySelector('.filters');
  if (filterBar) filterBar.hidden = false;

  // Horizontal tools rail: arrow buttons, disabled at either end.
  var rail = document.getElementById('tool-rail');
  var railBtns = document.querySelectorAll('.rail-btn[data-rail]');
  if (rail && railBtns.length) {
    var updateRail = function () {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      Array.prototype.forEach.call(railBtns, function (b) {
        var dir = Number(b.getAttribute('data-rail'));
        b.disabled = dir < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= max;
      });
    };
    Array.prototype.forEach.call(railBtns, function (b) {
      b.addEventListener('click', function () {
        var dir = Number(b.getAttribute('data-rail'));
        rail.scrollBy({ left: dir * Math.max(rail.clientWidth * 0.8, 200), behavior: 'smooth' });
      });
    });
    rail.addEventListener('scroll', updateRail, { passive: true });
    window.addEventListener('resize', updateRail);
    updateRail();
  }

  // Highlight the nav link of the section in view.
  var navLinks = document.querySelectorAll('#site-nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    Array.prototype.forEach.call(navLinks, function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Array.prototype.forEach.call(navLinks, function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  // Deep links such as /#privacy_policy: once the web fonts have loaded and
  // reflowed the page, bring the target back to the top of the viewport.
  if (location.hash.length > 1 && document.fonts && document.fonts.ready) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
      document.fonts.ready.then(function () { target.scrollIntoView({ block: 'start' }); });
    }
  }

  // Footer year.
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
