/* ============================================================
   Timothy Poorman — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  /* ---- Sticky nav shadow on scroll ---- */
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  /* Close mobile menu after clicking a link */
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Active-section highlighting ---- */
  const sections = document.querySelectorAll('main section[id], #top');
  const linkMap = new Map();
  navLinks.querySelectorAll('a[href^="#"]').forEach((a) => {
    linkMap.set(a.getAttribute('href').slice(1), a);
  });

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        linkMap.forEach((a) => a.classList.remove('is-active'));
        const active = linkMap.get(id);
        if (active) active.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---- Reveal-on-scroll animation ---- */
  const revealTargets = document.querySelectorAll(
    '.about, .project, .process__step, .skills__group, .timeline__item, .education, .contact__card'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => revealer.observe(el));

  /* ---- Skill → project/job cross-linking with highlight ---- */
  const decode = (s) =>
    s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  const highlightInTarget = (targetEl, tagName) => {
    if (!targetEl) return;

    // Glow the whole card/item briefly.
    targetEl.classList.remove('highlight-target');
    void targetEl.offsetWidth; // reflow to restart animation
    targetEl.classList.add('highlight-target');

    // Pulse any matching tag(s) inside the target.
    const want = decode(tagName).toLowerCase();
    const tags = targetEl.querySelectorAll('.project__tags span[data-tag]');
    let matched = false;
    tags.forEach((tag) => {
      const val = decode(tag.getAttribute('data-tag')).toLowerCase();
      if (val === want) {
        matched = true;
        tag.classList.remove('tag-highlight');
        void tag.offsetWidth;
        tag.classList.add('tag-highlight');
        window.setTimeout(() => tag.classList.remove('tag-highlight'), 2100);
      }
    });
    window.setTimeout(() => targetEl.classList.remove('highlight-target'), 2100);
    return matched;
  };

  document.querySelectorAll('a.skill').forEach((skill) => {
    skill.addEventListener('click', (e) => {
      const href = skill.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const tagName = skill.getAttribute('data-highlight');
      // Wait for the smooth scroll to settle before pulsing.
      window.setTimeout(() => highlightInTarget(target, tagName), 450);
    });
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
