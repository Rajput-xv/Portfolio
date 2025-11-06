// ============================================
// MODERN PORTFOLIO - JAVASCRIPT
// ============================================

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = [
    'Full Stack Developer',
    'Software Developer',
    'Photographer & Traveller',
    'Problem Solver'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
typeText();

// Smooth Scroll for Navigation Links
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

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll(
    '.skill-category, .timeline-item, .education-card, .project-card, .about-image, .about-text'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Form Validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        try {
            // Here you would typically send the form data to a backend
            // console.log('Form data:', data);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        }
    });
}

// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Particle Effect for Hero Section (Simple)
// You can replace this with a library like particles.js for more advanced effects

// --------------------------------------------------
// Replace project card images with live website screenshot previews
// Uses Microlink public API with localStorage caching for fast loading
// --------------------------------------------------
(async function replaceProjectImagesWithLinkPreview() {
    const CACHE_KEY_PREFIX = 'portfolio_preview_';
    const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    try {
        const cards = document.querySelectorAll('.project-card');
        if (!cards || cards.length === 0) return;

        for (const card of cards) {
            try {
                if (card.dataset.previewLoaded) continue;

                const anchors = Array.from(card.querySelectorAll('a[href]'));
                const target = anchors.find(a => a.querySelector('.fa-external-link-alt')) || anchors[0];
                if (!target) continue;

                const href = target.href;
                if (!href || !href.startsWith('http')) continue;

                const imgEl = card.querySelector('.project-image img');
                if (!imgEl) continue;

                // fallback placeholder
                const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="%23333"/><text x="50%" y="50%" fill="%23fff" font-size="20" text-anchor="middle" alignment-baseline="middle">Preview unavailable</text></svg>';
                if (!imgEl.dataset.fallback) imgEl.dataset.fallback = imgEl.src || placeholder;
                imgEl.onerror = () => { imgEl.src = imgEl.dataset.fallback || placeholder; };

                // Check localStorage cache first (instant load!)
                const cacheKey = CACHE_KEY_PREFIX + encodeURIComponent(href);
                try {
                    const cached = localStorage.getItem(cacheKey);
                    if (cached) {
                        const { url, timestamp } = JSON.parse(cached);
                        const age = Date.now() - timestamp;
                        
                        if (age < CACHE_DURATION && url) {
                            imgEl.src = url;
                            card.dataset.previewLoaded = '1';
                            // console.log(`✓ Loaded from cache (${Math.round(age / 1000 / 60 / 60)}h old): ${href}`);
                            continue; // Skip API call
                        } else {
                            // Cache expired, remove it
                            localStorage.removeItem(cacheKey);
                        }
                    }
                } catch (storageErr) {
                    // localStorage might be disabled or full, continue without cache
                    console.warn('localStorage error:', storageErr);
                }

                // compute viewport size based on card width for sharp screenshot
                const cardWidth = Math.max(360, Math.round(card.clientWidth || 360));
                const cardHeight = Math.max(240, Math.round(cardWidth * 0.5625)); // 16:9 aspect
                const viewport = `${cardWidth * 2}x${cardHeight * 2}`; // 2x for retina

                // Request screenshot (website preview) instead of meta image/logo
                const shotUrl = `https://api.microlink.io?url=${encodeURIComponent(href)}&screenshot=true&meta=false&fullPage=false&viewport=${viewport}`;
                let resp = await fetch(shotUrl);
                if (resp.ok) {
                    const json = await resp.json();
                    const shot = json?.data?.screenshot?.url;
                    if (shot) {
                        imgEl.src = shot;
                        imgEl.alt = json?.data?.title || imgEl.alt || '';
                        card.dataset.previewLoaded = '1';
                        
                        // Cache the screenshot URL
                        try {
                            localStorage.setItem(cacheKey, JSON.stringify({
                                url: shot,
                                timestamp: Date.now()
                            }));
                        } catch (storageErr) {
                            console.warn('Failed to cache preview:', storageErr);
                        }
                        
                        // console.log(`✓ Loaded screenshot for: ${href}`);
                        continue;
                    }
                }

                // Fallback to metadata image/logo if screenshot not available
                const metaUrl = `https://api.microlink.io?url=${encodeURIComponent(href)}&screenshot=false&meta=true`;
                resp = await fetch(metaUrl);
                if (resp.ok) {
                    const json = await resp.json();
                    const preview = json?.data?.image?.url || json?.data?.logo?.url;
                    if (preview) {
                        imgEl.src = preview;
                        imgEl.alt = json?.data?.title || imgEl.alt || '';
                        card.dataset.previewLoaded = '1';
                        
                        // Cache the fallback image too
                        try {
                            localStorage.setItem(cacheKey, JSON.stringify({
                                url: preview,
                                timestamp: Date.now()
                            }));
                        } catch (storageErr) {
                            console.warn('Failed to cache preview:', storageErr);
                        }
                        
                        // console.log(`✓ Loaded meta image for: ${href}`);
                    }
                }
            } catch (innerErr) {
                console.warn('Preview load failed for a project card:', innerErr);
                // keep static image
            }
        }
    } catch (err) {
        console.warn('replaceProjectImagesWithLinkPreview failed:', err);
    }
})();
