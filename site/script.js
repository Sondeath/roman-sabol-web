// ===== NAV =====
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8));

burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => { burger.classList.remove('open'); navLinks.classList.remove('open'); })
);

// ===== Smooth anchors with sticky-nav offset =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    scrollTo({ top: t.getBoundingClientRect().top + scrollY - 72, behavior: 'smooth' });
  });
});

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Before/After slider (single, in hero) =====
function initBA(fig) {
  const wrap = fig.querySelector('.ba-after-wrap');
  const handle = fig.querySelector('.ba-handle');
  if (!wrap || !handle) return;

  let dragging = false;
  const set = p => {
    p = Math.max(0, Math.min(100, p));
    wrap.style.clipPath = `inset(0 0 0 ${p}%)`;
    handle.style.left = p + '%';
  };
  set(50);

  const move = x => {
    if (!dragging) return;
    const r = fig.getBoundingClientRect();
    set(((x - r.left) / r.width) * 100);
  };
  const down = x => { dragging = true; wrap.classList.add('dragging'); move(x); };
  const up = () => { dragging = false; wrap.classList.remove('dragging'); };

  fig.addEventListener('mousedown', e => { e.preventDefault(); down(e.clientX); });
  addEventListener('mousemove', e => move(e.clientX));
  addEventListener('mouseup', up);
  fig.addEventListener('touchstart', e => down(e.touches[0].clientX), { passive: true });
  addEventListener('touchmove', e => move(e.touches[0].clientX), { passive: true });
  addEventListener('touchend', up);

  // gentle auto-demo on first view
  const demo = new IntersectionObserver(es => {
    es.forEach(en => {
      if (!en.isIntersecting) return;
      demo.unobserve(fig);
      let p = 50, dir = 1, steps = 0;
      const t = setInterval(() => {
        p += dir * 1.4; steps++;
        if (p >= 74) dir = -1;
        if (p <= 30) dir = 1;
        set(p);
        if (steps > 70) { clearInterval(t); set(50); }
      }, 22);
      const stop = () => clearInterval(t);
      fig.addEventListener('mousedown', stop, { once: true });
      fig.addEventListener('touchstart', stop, { once: true });
    });
  }, { threshold: 0.45 });
  demo.observe(fig);
}
document.querySelectorAll('.ba').forEach(initBA);

// ===== Year =====
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
