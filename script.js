// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
    
    // Animate menu items when opening
    if (navLinks.classList.contains('active')) {
        document.querySelectorAll('.nav-links li').forEach((item, index) => {
            item.style.setProperty('--i', index + 1);
        });
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
    });
});

// Create classic floating particles
const particlesContainer = document.getElementById('particles-container');
const particleCount = 15;

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 1 and 3px
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = `-${size}px`;
    
    // Random animation duration and delay
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// Create initial particles
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// Keep creating particles
setInterval(createParticle, 1000);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//Homepage

const words = ['Analysis', 'Prediction'];
let currentWord = 0;
let currentLetter = 0;
let isDeleting = false;

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
        if (!isDeleting) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else {
            isDeleting = false;
            currentWord = (currentWord + 1) % words.length;
            setTimeout(type, 300);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 2000); // slight delay after fade
});
