/* Sowmya — Marketing, GTM & Growth
   Small progressive enhancements only. The site works fully without JavaScript. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-links');
  const label = toggle && toggle.querySelector('.nav-toggle-label');
  const setMenu = open => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (label) label.textContent = open ? 'Close' : 'Menu';
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setMenu(false); });
  }

  /* ---------- Scroll progress bar ---------- */
  const root = document.documentElement;
  let ticking = false;
  const onScroll = () => {
    const max = root.scrollHeight - root.clientHeight;
    root.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-links-cta)')];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => {
          const on = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    root.classList.add('js-reveal');
    const targets = document.querySelectorAll('.stat, .proof-statement, .problem-grid li, .case, .tags, .service-list li, .belief-list li, .about-grid > div, .process-track li, .timeline > div, .roles li, .cta-inner');
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in');
      io.unobserve(el);
      // Drop the stagger delay afterwards so hover transitions stay snappy
      setTimeout(() => { el.style.transitionDelay = ''; }, 1300);
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => {
      el.classList.add('reveal');
      // Stagger siblings slightly for a cascading effect
      const i = [...el.parentElement.children].indexOf(el);
      el.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Count-up proof numbers ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const countIO = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.count);
      const start = performance.now();
      const dur = 1400;
      const step = now => {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    }), { threshold: 0.6 });
    counters.forEach(el => countIO.observe(el));
  }

  /* ---------- Cursor dot + hero sticker parallax (desktop pointer only) ---------- */
  if (finePointer && !reduceMotion) {
    const dot = document.querySelector('.cursor-dot');
    if (dot) {
      document.addEventListener('mousemove', e => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        dot.classList.add('on');
      }, { passive: true });
      document.addEventListener('mouseleave', () => dot.classList.remove('on'));
      document.addEventListener('mouseover', e => {
        dot.classList.toggle('big', !!e.target.closest('a, button, summary, .tags li'));
      });
    }

    const art = document.querySelector('.hero-art');
    const stickers = document.querySelectorAll('.sticker[data-depth]');
    const hero = document.querySelector('.hero');
    if (art && hero) {
      hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        stickers.forEach(s => {
          const d = Number(s.dataset.depth);
          s.style.setProperty('--tx', (x * d).toFixed(1) + 'px');
          s.style.setProperty('--ty', (y * d).toFixed(1) + 'px');
        });
      }, { passive: true });
      hero.addEventListener('mouseleave', () => stickers.forEach(s => { s.style.setProperty('--tx', '0px'); s.style.setProperty('--ty', '0px'); }));
    }
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('.year');
  if (year) year.textContent = new Date().getFullYear();
})();
