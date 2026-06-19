/* ============================================================
   TIMELESS STUDIO — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- 1. NAVBAR: Scrolled state ---- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load


  /* ---- 2. MOBILE MENU: Hamburger toggle ---- */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link, .navbar__mobile-cta');

  function openMenu() {
    hamburger.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu on mobile link click
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      !navbar.contains(e.target) &&
      hamburger.classList.contains('is-open')
    ) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });


  /* ---- 3. SMOOTH SCROLL for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '80',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ---- 4. ACTIVE NAV LINK on scroll (IntersectionObserver) ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('is-active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));

})();
