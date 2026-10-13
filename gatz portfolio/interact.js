(function () {
  'use strict';

  function safeQuery(selector, root = document) {
    return root.querySelector(selector);
  }

  function safeQueryAll(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function init() {
    const body = document.body;
    if (!body) return;

    const navLinks = safeQueryAll('a[href]');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      if (window.location.pathname.endsWith(href.replace(/^[./]+/, ''))) {
        link.classList.add('active');
      }

      link.addEventListener('click', () => {
        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      });
    });

    const menuButton = safeQuery('.menu-btn, .nav-toggle, [data-menu-toggle]');
    const navMenu = safeQuery('.nav-menu, nav ul, .menu, .nav-links');

    if (menuButton && navMenu) {
      menuButton.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
      });
    }

    const themeToggle = safeQuery('[data-theme-toggle], .theme-toggle, #theme-toggle');
    if (themeToggle) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
      }

      themeToggle.addEventListener('click', () => {
        const darkMode = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
      });
    }

    const revealItems = safeQueryAll('.reveal, .fade-in, .animate');
    revealItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.5s ease';

      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 120 + 100);
    });

    const yearNode = safeQuery('#year, .year');
    if (yearNode) {
      yearNode.textContent = new Date().getFullYear();
    }

    const contactForm = safeQuery('form');
    if (contactForm) {
      contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"], input[type="submit"]');
        if (submitButton) {
          const originalText = submitButton.textContent || submitButton.value || 'Send';
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';

          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            contactForm.reset();
            window.alert('Message sent successfully!');
          }, 600);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
