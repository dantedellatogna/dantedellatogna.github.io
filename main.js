/* Theme toggle — dark is default */
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const iconMoon = document.getElementById('icon-moon');
const iconSun  = document.getElementById('icon-sun');

function applyTheme(isLight) {
  html.classList.toggle('light', isLight);
  iconMoon.style.display = isLight ? 'none'  : 'block';
  iconSun.style.display  = isLight ? 'block' : 'none';
}

const saved = localStorage.getItem('theme');
applyTheme(saved === 'light');

themeBtn.addEventListener('click', () => {
  const isLight = !html.classList.contains('light');
  applyTheme(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* Nav toggle */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* Scroll reveal */
const revealEls = document.querySelectorAll(
  '.pub-entry, .entry, .project-entry, .award-list li, .cert-list li, .header-text'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 50);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => io.observe(el));

/* Active nav link on scroll */
const sections = document.querySelectorAll('section[id], header[id]');
const navAs = document.querySelectorAll('.nav-links a');

const sio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-30% 0px -65% 0px' });

sections.forEach(s => sio.observe(s));
