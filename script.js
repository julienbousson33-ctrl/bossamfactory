/**
 * Bossam Factory - Modern Artistic Frontpage
 * JavaScript for interactivity and animations
 */

// ============================================
// DOM Elements
// ============================================
const DOM = {
    // Header & Navigation
    header: document.querySelector('.header'),
    navToggle: document.getElementById('navToggle'),
    mobileNav: document.getElementById('mobileNav'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
    
    // Back to top
    backToTop: document.getElementById('backToTop'),
    
    // Floating elements
    floatingElements: document.getElementById('floatingElements'),
    
    // Portfolio
    filterBtns: document.querySelectorAll('.filter-btn'),
    portfolioItems: document.querySelectorAll('.portfolio-item'),
    
    // Stats
    statNumbers: document.querySelectorAll('.stat-number'),
    
    // Contact form
    contactForm: document.getElementById('contactForm'),
    
    // All sections
    sections: document.querySelectorAll('section[id]')
};

// ============================================
// Configuration
// ============================================
const CONFIG = {
    // Scroll threshold for header
    scrollThreshold: 100,
    
    // Animation thresholds
    animationThreshold: 0.1,
    
    // Floating elements count
    floatingElementsCount: 15,
    
    // Colors for floating elements
    floatingColors: [
        '#ff4757', '#ff6b6b', '#ffa502', '#ff3838',
        '#48cae4', '#023e8a', '#0096c7', '#0077b6',
        '#2ed573', '#ff793f', '#badc58', '#f0932b'
    ]
};

// ============================================
// Utility Functions
// ============================================
const Utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if element is in viewport
    isInViewport(element, threshold = 0) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    },
    
    // Random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // Random integer between min and max
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Get random color from array
    randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)];
    },
    
    // Animate number counting
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    },
    
    // Add animation class with delay
    animateOnScroll(element, animationClass, delay = 0) {
        if (this.isInViewport(element, CONFIG.animationThreshold)) {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, delay);
        }
    }
};

// ============================================
// Floating Elements
// ============================================
class FloatingElements {
    constructor(container, count, colors) {
        this.container = container;
        this.count = count;
        this.colors = colors;
        this.elements = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.count; i++) {
            this.createElement(i);
        }
    }
    
    createElement(index) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random properties
        const size = Utils.randomInt(20, 80);
        const color = Utils.randomColor(this.colors);
        const left = Utils.random(0, 100);
        const top = Utils.random(0, 100);
        const delay = Utils.random(0, 20);
        const duration = Utils.randomInt(15, 25);
        
        // Apply styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.background = color;
        element.style.left = `${left}%`;
        element.style.top = `${top}%`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        element.style.opacity = Utils.random(0.05, 0.15);
        
        // Add to container
        this.container.appendChild(element);
        this.elements.push(element);
    }
    
    updateOnScroll(scrollY) {
        this.elements.forEach((element, index) => {
            // Subtle parallax effect
            const speed = 0.1 + (index * 0.01);
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ============================================
// Navigation
// ============================================
class Navigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Mobile navigation toggle
        if (DOM.navToggle && DOM.mobileNav) {
            DOM.navToggle.addEventListener('click', this.toggleMobileNav.bind(this));
            
            // Close mobile nav when clicking a link
            DOM.mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileNav();
                });
            });
        }
        
        // Smooth scroll for navigation links
        this.initSmoothScroll();
        
        // Update active nav link on scroll
        this.initScrollSpy();
    }
    
    toggleMobileNav() {
        DOM.navToggle.classList.toggle('active');
        DOM.mobileNav.classList.toggle('active');
        document.body.style.overflow = DOM.mobileNav.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileNav() {
        DOM.navToggle.classList.remove('active');
        DOM.mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    initSmoothScroll() {
        const links = [...DOM.navLinks, ...DOM.mobileNavLinks];
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = DOM.header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        this.updateActiveLink(targetId);
                        
                        // Close mobile nav if open
                        this.closeMobileNav();
                    }
                }
            });
        });
    }
    
    initScrollSpy() {
        window.addEventListener('scroll', Utils.throttle(() => {
            const scrollY = window.scrollY + DOM.header.offsetHeight;
            
            DOM.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = `#${section.id}`;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    this.updateActiveLink(sectionId);
                }
            });
        }, 100));
    }
    
    updateActiveLink(targetId) {
        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
}

// ============================================
// Header Scroll Effect
// ============================================
class HeaderScroll {
    constructor(header, threshold) {
        this.header = header;
        this.threshold = threshold;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', Utils.throttle(this.handleScroll.bind(this), 50));
        this.handleScroll();
    }
    
    handleScroll() {
        if (window.scrollY > this.threshold) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// ============================================
// Back to Top Button
// ============================================
class BackToTop {
    constructor(button, threshold = 300) {
        this.button = button;
        this.threshold = threshold;
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', Utils.throttle(this.handleScroll.bind(this), 50));
        this.button.addEventListener('click', this.scrollToTop.bind(this));
        this.handleScroll();
    }
    
    handleScroll() {
        if (window.scrollY > this.threshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// Portfolio Filter
// ============================================
class PortfolioFilter {
    constructor(filterBtns, portfolioItems) {
        this.filterBtns = filterBtns;
        this.portfolioItems = portfolioItems;
        this.init();
    }
    
    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterItems(btn.dataset.filter);
            });
        });
    }
    
    filterItems(filter) {
        this.portfolioItems.forEach(item => {
            const categories = item.dataset.category.split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = '';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// ============================================
// Stats Counter
// ============================================
class StatsCounter {
    constructor(statNumbers) {
        this.statNumbers = statNumbers;
        this.animated = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', Utils.throttle(() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection && Utils.isInViewport(aboutSection, CONFIG.animationThreshold) && !this.animated) {
                this.animateAll();
                this.animated = true;
            }
        }, 100));
    }
    
    animateAll() {
        this.statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            Utils.animateCounter(stat, target, 2000);
        });
    }
}

// ============================================
// Contact Form
// ============================================
class ContactForm {
    constructor(form) {
        this.form = form;
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Real-time validation
        this.form.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearError.bind(this));
        });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = this.validateForm();
        
        if (isValid) {
            // Show success message
            this.showMessage('Votre message a été envoyé avec succès !', 'success');
            this.form.reset();
        }
    }
    
    validateForm() {
        let isValid = true;
        this.form.querySelectorAll('.form-input').forEach(input => {
            if (!this.validateField({ target: input })) {
                isValid = false;
            }
        });
        return isValid;
    }
    
    validateField(e) {
        const input = e.target;
        const value = input.value.trim();
        let isValid = true;
        let message = '';
        
        // Required validation
        if (input.required && !value) {
            isValid = false;
            message = 'Ce champ est obligatoire';
        }
        
        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Veuillez entrer une adresse email valide';
            }
        }
        
        // Show/hide error
        if (!isValid) {
            this.showError(input, message);
        } else {
            this.clearError({ target: input });
        }
        
        return isValid;
    }
    
    showError(input, message) {
        input.classList.add('error');
        
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #ff4757; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    clearError(e) {
        const input = e.target;
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    showMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.style.cssText = `
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            background: ${type === 'success' ? '#2ed573' : '#ff4757'};
            color: white;
            font-weight: 500;
            animation: fadeInUp 0.5s ease;
        `;
        messageElement.textContent = text;
        
        this.form.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => messageElement.remove(), 500);
        }, 5000);
    }
}

// ============================================
// Scroll Animations
// ============================================
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll(
            '.section-header, .about-content, .about-visual, .service-card, .portfolio-item, .contact-info, .contact-form'
        );
        this.init();
    }
    
    init() {
        // Initial check
        this.checkElements();
        
        // Check on scroll
        window.addEventListener('scroll', Utils.throttle(this.checkElements.bind(this), 100));
    }
    
    checkElements() {
        this.animatedElements.forEach((element, index) => {
            if (Utils.isInViewport(element, CONFIG.animationThreshold)) {
                const delay = index * 100;
                setTimeout(() => {
                    element.classList.add('animate-fade-in-up');
                }, delay);
            }
        });
    }
}

// ============================================
// Parallax Effect
// ============================================
class Parallax {
    constructor() {
        this.elements = document.querySelectorAll('.hero');
        this.init();
    }
    
    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', Utils.throttle(this.handleScroll.bind(this), 50));
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        this.elements.forEach(element => {
            const speed = 0.2;
            element.style.backgroundPositionY = `${scrollY * speed}px`;
        });
    }
}

// ============================================
// Mouse Move Effects
// ============================================
class MouseEffects {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.init();
    }
    
    init() {
        // Create custom cursor elements
        this.createCursor();
        
        // Add event listeners
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Add hover effects
        this.addHoverEffects();
    }
    
    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid #ff4757;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease, opacity 0.15s ease;
            transform: translate(-50%, -50%);
        `;
        
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';
        this.cursorDot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #ff4757;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
    }
    
    handleMouseMove(e) {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
            this.cursorDot.style.left = `${e.clientX}px`;
            this.cursorDot.style.top = `${e.clientY}px`;
        }
    }
    
    handleMouseEnter() {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.opacity = '1';
            this.cursorDot.style.opacity = '1';
        }
    }
    
    handleMouseLeave() {
        if (this.cursor && this.cursorDot) {
            this.cursor.style.opacity = '0';
            this.cursorDot.style.opacity = '0';
        }
    }
    
    addHoverEffects() {
        const interactiveElements = document.querySelectorAll('a, button, .btn, .portfolio-item, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (this.cursor) {
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
                    this.cursor.style.borderColor = '#48cae4';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (this.cursor) {
                    this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    this.cursor.style.borderColor = '#ff4757';
                }
            });
        });
    }
}

// ============================================
// Typing Effect
// ============================================
class TypingEffect {
    constructor(element, texts, speed = 100, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pause = pause;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.init();
    }
    
    init() {
        if (!this.element) return;
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = this.speed;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating elements
    if (DOM.floatingElements) {
        new FloatingElements(
            DOM.floatingElements,
            CONFIG.floatingElementsCount,
            CONFIG.floatingColors
        );
    }
    
    // Initialize navigation
    new Navigation();
    
    // Initialize header scroll effect
    if (DOM.header) {
        new HeaderScroll(DOM.header, CONFIG.scrollThreshold);
    }
    
    // Initialize back to top button
    if (DOM.backToTop) {
        new BackToTop(DOM.backToTop);
    }
    
    // Initialize portfolio filter
    if (DOM.filterBtns.length > 0 && DOM.portfolioItems.length > 0) {
        new PortfolioFilter(DOM.filterBtns, DOM.portfolioItems);
    }
    
    // Initialize stats counter
    if (DOM.statNumbers.length > 0) {
        new StatsCounter(DOM.statNumbers);
    }
    
    // Initialize contact form
    if (DOM.contactForm) {
        new ContactForm(DOM.contactForm);
    }
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize parallax effect
    new Parallax();
    
    // Initialize mouse effects (optional - can be disabled for better performance)
    // new MouseEffects();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Console message
    console.log('%c Bossam Factory ', 'background: linear-gradient(135deg, #ff4757, #48cae4); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Créer. Innover. Inspirer. ', 'color: #6c757d; font-size: 14px;');
});

// ============================================
// Window Load Event
// ============================================
window.addEventListener('load', () => {
    // Trigger initial animations
    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-fade-in-up');
        }, index * 200);
    });
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// ============================================
// Touch Support for Mobile
// ============================================
if ('ontouchstart' in window) {
    // Add touch-specific classes or behaviors
    document.body.classList.add('touch-device');
}

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile navigation
    if (e.key === 'Escape' && DOM.mobileNav.classList.contains('active')) {
        DOM.navToggle.classList.remove('active');
        DOM.mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Performance Optimization
// ============================================
// Lazy load images if they exist
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Preloader (Optional)
// ============================================
// If you want to add a preloader, uncomment this section
/*
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
*/
