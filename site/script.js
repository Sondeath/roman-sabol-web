// ============ NAV ============
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

burger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ============ SMOOTH ANCHORS WITH OFFSET ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length < 2) return;
    const t = document.querySelector(href);
    if (!t) return;
    e.preventDefault();
    const top = t.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============ REVEAL ON SCROLL ============
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ============ BEFORE / AFTER SLIDERS ============
function initBA(figure) {
  const after = figure.querySelector('.ba-after');
  const handle = figure.querySelector('.ba-handle');
  if (!after || !handle) return;

  let dragging = false;
  let pct = 50;

  const setPct = (p) => {
    pct = Math.max(0, Math.min(100, p));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
  };

  // Init position
  setPct(50);

  const onMove = (clientX) => {
    if (!dragging) return;
    const r = figure.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPct(p);
  };

  const start = (e) => {
    dragging = true;
    after.classList.add('dragging');
    e.preventDefault?.();
  };
  const end = () => {
    dragging = false;
    after.classList.remove('dragging');
  };

  handle.addEventListener('mousedown', start);
  figure.addEventListener('mousedown', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    dragging = true;
    after.classList.add('dragging');
    onMove(e.clientX);
  });
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', end);

  handle.addEventListener('touchstart', start, { passive: false });
  figure.addEventListener('touchstart', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    dragging = true;
    onMove(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', end);

  // Subtle auto-demo on hero slider (only once, on first view)
  if (figure.id === 'ba') {
    const demoIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        demoIO.unobserve(figure);
        let dir = -1, p = 50;
        const t = setInterval(() => {
          p += dir * 1.2;
          if (p <= 28) dir = 1;
          if (p >= 72) dir = -1;
          setPct(p);
          if (Math.abs(p - 50) < 1 && dir === -1) {
            clearInterval(t);
            setPct(50);
          }
        }, 20);
        // Stop demo if user interacts
        const stop = () => { clearInterval(t); };
        figure.addEventListener('mousedown', stop, { once: true });
        figure.addEventListener('touchstart', stop, { once: true });
      });
    }, { threshold: 0.4 });
    demoIO.observe(figure);
  }
}

document.querySelectorAll('.ba').forEach(initBA);

// ============ YEAR ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
