import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS animation library
AOS.init({
  duration: 1000,
  offset: 100,
  once: true,
  easing: 'ease-in-out',
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.header__menu-mobile');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    console.log('Mobile menu clicked - implement mobile menu logic here');
  });
}

// Form submission handler
const contactForm = document.querySelector('.contact__form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message with animation
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = '✓ Message Envoyé!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 30px rgba(0, 119, 190, 0.4)';
    header.style.padding = '12px 64px';
  } else {
    header.style.boxShadow = '0 4px 20px rgba(0, 119, 190, 0.3)';
    header.style.padding = '20px 64px';
  }
  
  lastScroll = currentScroll;
});

// Auto-update copyright year
document.addEventListener('DOMContentLoaded', () => {
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});

// Create scroll to top button
const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0077BE, #00A8E8);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 119, 190, 0.4);
    z-index: 1000;
  `;
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
      button.style.visibility = 'hidden';
    }
  });
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1) translateY(-5px)';
    button.style.boxShadow = '0 8px 25px rgba(0, 119, 190, 0.5)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1) translateY(0)';
    button.style.boxShadow = '0 4px 15px rgba(0, 119, 190, 0.4)';
  });
  
  document.body.appendChild(button);
};

createScrollToTopButton();

// Add parallax effect to hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    if (scrolled < 800) {
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Add counter animation for stats
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '%');
    }
  }, 20);
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statElements = entry.target.querySelectorAll('.hero-stat h3');
      statElements.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);
        if (!isNaN(number)) {
          stat.textContent = '0' + (text.includes('+') ? '+' : '%');
          animateCounter(stat, number);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

// Add wave animation effect
const createWaveEffect = () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to top, rgba(0, 119, 190, 0.1), transparent);
      pointer-events: none;
    `;
    hero.appendChild(wave);
  }
};

createWaveEffect();

console.log('🏊 Piscines et Spas des Laurentides - Site web chargé avec succès!');

