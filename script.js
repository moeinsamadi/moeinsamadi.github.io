// Mobile menu toggle
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', false);
  })
);

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
