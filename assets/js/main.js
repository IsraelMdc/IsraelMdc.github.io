(() => {
  'use strict';

  // Navbar scroll shadow
  const navbar = document.querySelector('.ff-navbar');
  const backTop = document.getElementById('backTop');

  const onScroll = () => {
    if (window.scrollY > 80) {
      navbar?.classList.add('scrolled');
      backTop?.classList.add('show');
    } else {
      navbar?.classList.remove('scrolled');
      backTop?.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Back to top
  backTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  // Close mobile menu on link click
  const navCollapse = document.getElementById('mainNav');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse?.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navCollapse)?.hide();
      }
    });
  });

  // Counter animation
  const counters = document.querySelectorAll('.stat-number');
  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const duration = 2000;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('pt-BR');
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  // Contact form demo handler
  const form = document.querySelector('.contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Mensagem enviada!';
    setTimeout(() => {
      form.reset();
      form.classList.remove('was-validated');
      btn.disabled = false;
      btn.innerHTML = original;
    }, 2500);
  });
})();
