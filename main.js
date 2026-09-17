/* ============================================================
   Portfolio — Main JavaScript
   Scroll reveals, nav behaviour, contribution graph, cursor glow
   ============================================================ */

(function () {
  'use strict';

  // ── Navbar scroll state ──────────────────────────────────────
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Mobile nav toggle ────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close on click outside (mobile)
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });

    // Close on Escape key (mobile/accessibility)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Smooth-scroll for anchor links ───────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Intersection Observer — reveal on scroll ─────────────────
  const reveals = document.querySelectorAll('.reveal, .reveal-children');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 60px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));


  // ── High-Performance Cursor Spotlight ─────────────────────────
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let initialized = false;
    let isMoving = false;

    function renderGlow() {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      currentX += dx * 0.15;
      currentY += dy * 0.15;

      cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
        requestAnimationFrame(renderGlow);
      } else {
        isMoving = false;
      }
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!initialized) {
        currentX = mouseX;
        currentY = mouseY;
        cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        cursorGlow.style.opacity = '1';
        initialized = true;
        return;
      }

      cursorGlow.style.opacity = '1';

      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(renderGlow);
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      isMoving = false;
    });

    document.addEventListener('mouseenter', () => {
      cursorGlow.style.opacity = '1';
    });
  }

  // ── Active nav link highlight ────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkEls.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: '-70px 0px -40% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));

})();
