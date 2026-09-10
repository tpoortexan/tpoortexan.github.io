/* ============================================================
   Lightweight image gallery + lightbox
   Works on any page that contains .gallery__item elements.
   ============================================================ */
(function () {
  'use strict';

  const items = Array.from(document.querySelectorAll('.gallery__item'));
  if (!items.length) return;

  // Build a list of full-size sources (data-full falls back to img src).
  const sources = items.map((item) => {
    const img = item.querySelector('img');
    return {
      src: item.getAttribute('data-full') || (img ? img.getAttribute('src') : ''),
      alt: img ? img.getAttribute('alt') : '',
    };
  });

  // Build the lightbox DOM once.
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-hidden', 'true');
  lb.innerHTML =
    '<button class="lightbox__close" aria-label="Close">&times;</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">&#8249;</button>' +
    '<img alt="" />' +
    '<button class="lightbox__nav lightbox__nav--next" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const btnClose = lb.querySelector('.lightbox__close');
  const btnPrev = lb.querySelector('.lightbox__nav--prev');
  const btnNext = lb.querySelector('.lightbox__nav--next');

  let current = 0;

  const show = (i) => {
    current = (i + sources.length) % sources.length;
    lbImg.setAttribute('src', sources[current].src);
    lbImg.setAttribute('alt', sources[current].alt);
  };

  const open = (i) => {
    show(i);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(i);
      }
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(current - 1));
  btnNext.addEventListener('click', () => show(current + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();
