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
    const targets = document.querySelectorAll('.stat, .proof-statement, .problem-grid li, .case, .xp-head, .pg, .panel, .tags, .service-list li, .belief-list li, .about-grid > div, .process-track li, .story li, .logo-wall, .co, .cta-inner');
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

  /* ---------- Contact form ----------
     Sends to the Formspree endpoint in the form's action="" attribute.
     Until that placeholder is replaced, it falls back to opening the
     visitor's email app with the message pre-filled. */
  const form = document.getElementById('contact-form');
  if (form) {
    form.noValidate = true; // we show our own messages; native validation still applies without JS
    const statusEl = form.querySelector('.form-status');
    const submitBtn = form.querySelector('.form-submit');
    const topicSet = form.querySelector('.topics');
    const EMAIL = 'sowmyadevangk@gmail.com';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const setError = (el, errEl, msg) => {
      if (errEl) errEl.textContent = msg || '';
      if (el) el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };
    const checks = {
      name: () => form.elements['name'].value.trim() ? '' : 'Please add your name.',
      email: () => {
        const v = form.elements['email'].value.trim();
        if (!v) return 'Please add your email so I can reply.';
        return emailRe.test(v) ? '' : 'That email doesn’t look right — e.g. name@company.com';
      },
      area: () => form.querySelector('input[name="area"]:checked') ? '' : 'Pick the area that fits best.',
      message: () => {
        const v = form.elements['message'].value.trim();
        if (!v) return 'Tell me a little about what you need.';
        return v.length < 10 ? 'A little more detail, please (at least 10 characters).' : '';
      }
    };
    const fields = {
      name: [form.elements['name'], document.getElementById('f-name-error')],
      email: [form.elements['email'], document.getElementById('f-email-error')],
      area: [null, document.getElementById('f-topic-error')],
      message: [form.elements['message'], document.getElementById('f-message-error')]
    };
    const validate = key => {
      const msg = checks[key]();
      const [el, errEl] = fields[key];
      setError(el, errEl, msg);
      if (key === 'area') topicSet.classList.toggle('invalid', !!msg);
      return !msg;
    };

    // Re-validate a field once the visitor has interacted with it
    ['name', 'email', 'message'].forEach(key => {
      const el = fields[key][0];
      el.addEventListener('blur', () => { if (el.value.trim()) validate(key); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validate(key); });
    });
    form.querySelectorAll('input[name="area"]').forEach(r => r.addEventListener('change', () => validate('area')));

    const showStatus = (type, html) => {
      statusEl.className = 'form-status ' + type;
      statusEl.innerHTML = html;
      statusEl.focus();
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.elements['_gotcha'] && form.elements['_gotcha'].value) return; // bot
      const order = ['name', 'email', 'area', 'message'];
      const results = order.map(validate);
      const firstBad = order[results.indexOf(false)];
      if (firstBad) {
        statusEl.className = 'form-status';
        statusEl.textContent = '';
        (firstBad === 'area' ? form.querySelector('input[name="area"]') : fields[firstBad][0]).focus();
        return;
      }

      const data = new FormData(form);
      const endpoint = form.getAttribute('action') || '';

      // Not configured yet: hand over to the visitor's email app instead
      if (!/^https:\/\/formspree\.io\/f\/\w+/.test(endpoint)) {
        const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || '-'}\nArea: ${data.get('area')}\n\n${data.get('message')}`;
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Let’s talk: ' + data.get('area'))}&body=${encodeURIComponent(body)}`;
        showStatus('ok', `Your email app should open with your message ready to send. If it doesn’t, email me at <a href="mailto:${EMAIL}">${EMAIL}</a>.`);
        return;
      }

      submitBtn.disabled = true;
      const label = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending…';
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        form.querySelectorAll('[aria-invalid]').forEach(el => el.setAttribute('aria-invalid', 'false'));
        showStatus('ok', 'Message received. I’ll get back to you soon.');
      } catch (err) {
        showStatus('error', `Sorry, that didn’t send. Please try again, or email me directly at <a href="mailto:${EMAIL}">${EMAIL}</a>.`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = label;
      }
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('.year');
  if (year) year.textContent = new Date().getFullYear();
})();
