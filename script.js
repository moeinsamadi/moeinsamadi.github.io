(function () {
  // ---- Mobile menu ----
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });

  // ---- Navbar shadow, scroll-to-top button ----
  var nav = document.getElementById('header-nav');
  var topBtn = document.getElementById('scrolltop');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 40);
    topBtn.classList.toggle('show', y > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Active section highlighting ----
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var targets = links.map(function (l) { return document.querySelector(l.getAttribute('href')); });
  function spy() {
    var pos = window.scrollY + 120, current = -1;
    targets.forEach(function (t, i) { if (t && t.offsetTop <= pos) current = i; });
    links.forEach(function (l, i) { l.classList.toggle('is-active', i === current); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  // ---- Reveal on scroll ----
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Research carousel: drag to scroll, edge fades, hint ----
  var car = document.getElementById('carousel');
  var fl = document.querySelector('.fade-left');
  var fr = document.querySelector('.fade-right');
  var hint = document.querySelector('.scroll-hint');
  function edges() {
    var max = car.scrollWidth - car.clientWidth;
    fl.classList.toggle('is-visible', car.scrollLeft > 8);
    fr.classList.toggle('is-visible', car.scrollLeft < max - 8);
    hint.classList.toggle('hidden', car.scrollLeft > 20);
  }
  car.addEventListener('scroll', edges, { passive: true });
  window.addEventListener('resize', edges);
  edges();

  var down = false, startX = 0, startLeft = 0, moved = false;
  car.addEventListener('mousedown', function (e) {
    down = true; moved = false; startX = e.pageX; startLeft = car.scrollLeft;
  });
  window.addEventListener('mouseup', function () {
    down = false; car.classList.remove('dragging');
  });
  window.addEventListener('mousemove', function (e) {
    if (!down) return;
    var dx = e.pageX - startX;
    if (Math.abs(dx) > 4) { moved = true; car.classList.add('dragging'); }
    car.scrollLeft = startLeft - dx;
  });
  car.addEventListener('click', function (e) {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  // ---- Footer year ----
  document.getElementById('year').textContent = new Date().getFullYear();
})();
