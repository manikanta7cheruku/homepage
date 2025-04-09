// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        document.querySelectorAll('.nav-links li').forEach((item, index) => {
            item.style.setProperty('--i', index + 1);
        });
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
    });
});

// Particle system
const particlesContainer = document.getElementById('particles-container');
const particleCount = 15;

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), (duration + delay) * 1000);
}

for (let i = 0; i < particleCount; i++) createParticle();
setInterval(createParticle, 1000);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Typing text effect
const words = ['Analysis', 'Prediction'];
let currentWord = 0, currentLetter = 0, isDeleting = false;
const typedWord = document.getElementById('typed-word');

function type() {
    const current = words[currentWord];
    const displayed = current.substring(0, currentLetter);
    typedWord.textContent = displayed;
    if (!isDeleting && currentLetter < current.length) {
        currentLetter++;
        setTimeout(type, 120);
    } else if (isDeleting && currentLetter > 0) {
        currentLetter--;
        setTimeout(type, 80);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) currentWord = (currentWord + 1) % words.length;
        setTimeout(type, isDeleting ? 1500 : 300);
    }
}
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 2000));

// Counter animation
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const updateCount = () => {
            const target = +counter.parentElement.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / 80;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

let triggered = false;
window.addEventListener('scroll', () => {
    const section = document.getElementById('facts-section');
    if (!triggered && isInViewport(section)) {
        animateCounters();
        triggered = true;
    }
});
