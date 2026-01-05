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
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;

    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
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
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
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
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Form Validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
        
        // If validation passes, the form will submit normally to Web3Forms
    });
}

// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Particle Effect for Hero Section (Simple)
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(99, 102, 241, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        heroParticles.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
        }
        75% {
            transform: translateY(-20px) translateX(-5px);
        }
    }
`;
document.head.appendChild(style);

createParticles();

// Preloader (Optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mouse move effect for hero image
const heroImage = document.querySelector('.image-wrapper');

if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
}

// Console Message
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #94a3b8;');
console.log('%c🔗 GitHub: https://github.com/Rajput-xv', 'font-size: 12px; color: #6366f1;');
console.log('%c📧 Email: yash44365@gmail.com', 'font-size: 12px; color: #6366f1;');

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 100);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// Add cursor trail effect (optional, subtle)
const cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Copy email to clipboard functionality
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.textContent;
        
        navigator.clipboard.writeText(email).then(() => {
            // Show tooltip or notification
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied to clipboard!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(99, 102, 241, 0.95);
                color: white;
                padding: 15px 30px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                z-index: 10000;
                animation: fadeInOut 2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

// Add fade in/out animation for tooltip
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(tooltipStyle);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');


                }
                observer.unobserve(img);


            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Navigate to next section with arrow down
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Navigate to previous section with arrow up
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPreviousSection(currentSection);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }


    }
});

function getCurrentSection() {
    let current = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
        }
    });
    return current;
}

function getNextSection(currentSection) {
    if (!currentSection) return sections[0];
    const sectionsArray = Array.from(sections);
    const currentIndex = sectionsArray.indexOf(currentSection);
    return sectionsArray[currentIndex + 1] || null;
}

function getPreviousSection(currentSection) {
    if (!currentSection) return sections[sections.length - 1];
    const sectionsArray = Array.from(sections);
    const currentIndex = sectionsArray.indexOf(currentSection);
    return sectionsArray[currentIndex - 1] || null;
}

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
                // Add waitUntil=networkidle0 to wait for full page load (React/JS apps need time to hydrate)
                // Add waitFor=3000 (3 seconds) as additional delay for dynamic content
                const shotUrl = `https://api.microlink.io?url=${encodeURIComponent(href)}&screenshot=true&meta=false&fullPage=false&viewport=${viewport}&waitUntil=networkidle0&waitFor=3000`;
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