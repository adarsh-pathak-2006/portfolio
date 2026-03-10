// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Typed effect
  const typedSpan = document.getElementById('typed-role');
  if (typedSpan) {
    const roles = ['CSE student', 'full-stack dev', 'Python enthusiast', 'problem solver'];
    let idx = 0, charIdx = 0, isDeleting = false;
    
    function typeEffect() {
      const current = roles[idx];
      if (isDeleting) {
        typedSpan.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typedSpan.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }
      
      if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        idx = (idx + 1) % roles.length;
        setTimeout(typeEffect, 300);
      } else {
        setTimeout(typeEffect, isDeleting ? 50 : 80);
      }
    }
    typeEffect();
  }

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      navMenu.classList.remove('active');
      const icon = hamburger?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // Contact form
  const contactForm = document.getElementById('contactForm');
  const errorSpan = document.getElementById('formError');
  
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    
    if (!name || !email || !msg) {
      errorSpan.textContent = 'All fields are required.';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorSpan.textContent = 'Enter a valid email address.';
      return;
    }
    
    errorSpan.textContent = '';
    
    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = 'var(--accent)';
    }, 3000);
    
    contactForm.reset();
  });

  // Handle missing portrait image
  const portraitImg = document.querySelector('.portrait-frame img');
  if (portraitImg) {
    portraitImg.addEventListener('error', function() {
      this.style.display = 'none';
      const placeholder = this.nextElementSibling;
      if (placeholder) {
        placeholder.style.display = 'flex';
      }
    });
  }
});