/* ================================================
   DENTIST WEBSITE TEMPLATE — script.js
   Vanilla JavaScript — No frameworks
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Sticky Navbar on Scroll ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ---- Mobile Navbar Toggle ---- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      toggle.classList.toggle('active');
      if (toggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('active');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ---- Smooth Scrolling for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Counter animation for hero stats ---- */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(function () {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }, 16);
  }
  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window && counters.length) {
    const cObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el, parseInt(el.dataset.target), 1500);
          cObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cObserver.observe(c); });
  }

  /* ================================================
     HERO DOCTOR — Premium 3D Tilt Hover
     ================================================ */
  (function initHeroTilt() {
    const heroWrap = document.querySelector('.hero__image-wrap');
    const heroImg = document.querySelector('.hero__doctor-img');
    if (!heroWrap || !heroImg) return;

    const TILT_MAX = 8; // Max 8 degrees as requested

    heroWrap.addEventListener('mousemove', function (e) {
      const rect = heroWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = deltaY * -TILT_MAX;
      const rotateY = deltaX * TILT_MAX;

      heroImg.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.02)`;
    });

    heroWrap.addEventListener('mouseleave', function () {
      heroImg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  })();

  /* ================================================
     WHATSAPP TOOLTIP Logic
     ================================================ */
  (function initWATooltip() {
    const waBtn = document.getElementById('whatsappFloat');
    if (!waBtn) return;
    const tooltip = waBtn.querySelector('.whatsapp-float__tooltip');
    if (!tooltip) return;

    // Show tooltip after 2.5s for engagement
    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(0)';

      // Hide after 4s unless user is hovering
      setTimeout(() => {
        if (!waBtn.matches(':hover')) {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateX(10px)';
        }
      }, 4000);
    }, 2500);
  })();

}); // end DOMContentLoaded
/* ================================================
   APPOINTMENT FORM → WHATSAPP AUTO MESSAGE
   ================================================ */

const form = document.getElementById('appointmentForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const whatsappNumber = "8801750777093";

    const text = `🦷 *New Appointment Request*%0A
----------------------------%0A
👤 Name: ${name}%0A
📞 Phone: ${phone}%0A
📅 Preferred Date: ${date}%0A
🩺 Treatment: ${service}%0A
📝 Notes: ${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(url, '_blank');
  });
}
/* ==========================================
   Professional Mobile Tooltip System
   ========================================== */

const socialBtns = document.querySelectorAll('.social-float__btn');

socialBtns.forEach(btn => {

  btn.addEventListener('click', function(e) {

    // Only apply special behavior on touch devices
    if (window.matchMedia("(hover: none)").matches) {

      // If not active yet → show tooltip
      if (!btn.classList.contains('active')) {
        e.preventDefault();

        // Remove active from all buttons
        socialBtns.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');

      }
      // If already active → allow link normally
    }

  });

});

/* Close tooltip when tapping outside */
document.addEventListener('click', function(e) {
  if (!e.target.closest('.social-float__btn')) {
    socialBtns.forEach(btn => btn.classList.remove('active'));
  }
});
