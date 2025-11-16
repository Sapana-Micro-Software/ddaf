// DDAF GitHub Pages JavaScript - Ultra Jazzy & Snazzy! 🚀✨
// Copyright (C) 2025, Shyamal Suhana Chandra

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initBenchmarkTabs();
    initAnimations();
    initParticles();
    initParallax();
    initActiveNav();
    initTypewriter();
    initCounters();
    initMagneticEffect();
    initCursorEffects();
    initSmoothReveal();
    init3DEffects();
    initConfetti();
    initAdvancedScrollAnimations();
    initEnhancedHoverEffects();
    initSparkleEffects();
    initProgressBars();
});

// Sparkle Effects for Special Elements
function initSparkleEffects() {
    const sparkleElements = document.querySelectorAll('.section-title, .hero-title');
    sparkleElements.forEach(el => {
        el.classList.add('sparkle');
    });
}

// Animated Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.chart-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width || bar.getAttribute('data-width') || '0%';
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Navigation Functions
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect with enhanced styling
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Intersection Observer for fade-in animations with stagger
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with stagger effect
    const animatedElements = document.querySelectorAll(
        '.feature-card, .doc-card, .advantage-item, .contribution-item, .timeline-item, .stat-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Parallax scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-title, .hero-content');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Benchmark Tabs
function initBenchmarkTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-gradient-to-r', 'from-primary-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-primary-500/50');
                btn.classList.add('bg-white', 'border-2', 'border-primary-200', 'text-gray-700');
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.opacity = '0';
            });

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            this.classList.remove('bg-white', 'border-2', 'border-primary-200', 'text-gray-700');
            this.classList.add('bg-gradient-to-r', 'from-primary-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-primary-500/50');
            
            const targetContent = document.getElementById(targetTab + '-tab');
            
            if (targetContent) {
                targetContent.classList.add('active');
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                    animateChartBars(targetContent);
                }, 100);
            }
        });
    });

    // Animate chart bars with enhanced animation
    function animateChartBars(container) {
        const chartBars = container.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            const width = bar.style.width || bar.getAttribute('data-width') || '0%';
            bar.style.width = '0%';
            bar.setAttribute('data-width', width);
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 100);
        });
    }

    // Initial animation for first tab
    const firstTab = document.querySelector('.tab-content.active');
    if (firstTab) {
        setTimeout(() => {
            animateChartBars(firstTab);
        }, 500);
    }
}

// Advanced Animations
function initAnimations() {
    // Floating animation for icons
    const icons = document.querySelectorAll('.feature-icon, .doc-icon, .advantage-icon');
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });

    // Hover effect for cards
    const cards = document.querySelectorAll('.feature-card, .doc-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Ripple effect on buttons
    const buttons = document.querySelectorAll('.btn, .tab-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Particle System
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const colors = [
                'rgba(99, 102, 241, 0.6)',
                'rgba(139, 92, 246, 0.6)',
                'rgba(236, 72, 153, 0.6)',
                'rgba(59, 130, 246, 0.6)'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    createParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = particle.color;
                    ctx.globalAlpha = (150 - distance) / 150 * 0.3;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Recreate particles on resize
    window.addEventListener('resize', () => {
        createParticles();
    });
}

// Parallax Effects
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.15);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.001 + index) * 20;
            orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// Active Navigation Link Highlighting
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call
}

// Typewriter Effect (optional enhancement)
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isNumber = !isNaN(parseFloat(target));
                
                if (isNumber) {
                    const finalValue = parseFloat(target);
                    const duration = 2000;
                    const increment = finalValue / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < finalValue) {
                            counter.textContent = Math.floor(current) + (isPercentage ? '%' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Magnetic Effect for Interactive Elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .feature-card, .doc-card, .tab-button, .arch-badge');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Custom Cursor Effects
function initCursorEffects() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        width: 40px;
        height: 40px;
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Scale cursor on hover
    const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .doc-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Smooth Reveal Animation
function initSmoothReveal() {
    const revealElements = document.querySelectorAll('.section, .feature-card, .doc-card, .advantage-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });
}

// 3D Tilt Effects
function init3DEffects() {
    const tiltElements = document.querySelectorAll('.feature-card, .doc-card, .advantage-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Confetti Effect on Button Clicks
function initConfetti() {
    const buttons = document.querySelectorAll('.btn-primary, .tab-button.active');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createConfetti(e.clientX, e.clientY);
        });
    });
}

function createConfetti(x, y) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    const confettiCount = 20;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        function animate() {
            posX += vx;
            posY += vy + 0.5; // gravity
            opacity -= 0.02;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            
            if (opacity > 0 && posY < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Debounce function
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations are handled by individual functions
}, 16));

// Add page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.feature-card, .doc-card, .advantage-item');
    cards.forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Enhanced Scroll Animations
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add bounce effect to numbers
                if (entry.target.classList.contains('stat-number')) {
                    entry.target.style.animation = 'bounceIn 0.8s ease-out';
                }
            }
        });
    }, observerOptions);

    // Observe all elements that should fade in on scroll
    document.querySelectorAll('.fade-in-scroll, .stat-item, .benchmark-chart').forEach(el => {
        el.classList.add('fade-in-scroll');
        observer.observe(el);
    });
}

// Enhanced Hover Effects
function initEnhancedHoverEffects() {
    // Add glow effect to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .feature-card, .doc-card, .tab-button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .tab-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedScrollAnimations();
    initEnhancedHoverEffects();
});
