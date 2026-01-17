// ============================================
// WHALY Website - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCopyButton();
    initScrollAnimations();
    initMouseParallax();
    initButtonRipple();
});

// ============================================
// Floating Particles System
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    const colors = [
        'rgba(155, 77, 202, 0.6)',
        'rgba(0, 212, 255, 0.6)',
        'rgba(255, 107, 203, 0.6)',
        'rgba(74, 222, 128, 0.6)'
    ];

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, colors);
    }

    // Continuously create new particles
    setInterval(() => {
        if (particlesContainer.children.length < particleCount + 10) {
            createParticle(particlesContainer, colors);
        }
    }, 500);
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 8 + 4;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: radial-gradient(circle, ${color}, transparent);
        animation: particleFloat ${duration}s linear ${delay}s infinite;
        box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, (duration + delay) * 1000);
}

// ============================================
// Copy Contract Address
// ============================================
function initCopyButton() {
    const copyBtn = document.getElementById('copyBtn');
    const caInput = document.querySelector('.ca-input');

    if (copyBtn && caInput) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(caInput.value);
                showCopyFeedback(copyBtn);
            } catch (err) {
                // Fallback for older browsers
                caInput.select();
                document.execCommand('copy');
                showCopyFeedback(copyBtn);
            }
        });
    }
}

function showCopyFeedback(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;
    button.style.color = '#10b981';
    
    // Create toast notification
    showToast('Copied to clipboard!');
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.style.color = '';
    }, 2000);
}

function showToast(message) {
    // Check if toast already exists
    let toast = document.querySelector('.toast');
    if (toast) {
        toast.remove();
    }

    toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #7c3aed, #06b6d4);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: toastSlide 3s ease-in-out forwards;
    `;

    // Add animation keyframes
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toastSlide {
                0% { transform: translateX(-50%) translateY(100px); opacity: 0; }
                15% { transform: translateX(-50%) translateY(0); opacity: 1; }
                85% { transform: translateX(-50%) translateY(0); opacity: 1; }
                100% { transform: translateX(-50%) translateY(-20px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============================================
// Scroll Reveal Animations
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.about-section, .character-section').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// Mouse Parallax Effect
// ============================================
function initMouseParallax() {
    const hero = document.querySelector('.hero');
    const character = document.querySelector('.character-container');
    const crystals = document.querySelectorAll('.crystal');

    if (hero && character) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate movement
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            // Apply subtle movement to character
            character.style.transform = `
                translateX(${xPos * 10}px) 
                translateY(${yPos * 10}px)
            `;

            // Apply movement to crystals
            crystals.forEach((crystal, index) => {
                const depth = (index + 1) * 0.5;
                crystal.style.transform = `
                    translateX(${xPos * 15 * depth}px) 
                    translateY(${yPos * 15 * depth}px)
                `;
            });
        });

        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            character.style.transform = '';
            crystals.forEach(crystal => {
                crystal.style.transform = '';
            });
        });
    }
}

// ============================================
// Button Ripple Effect
// ============================================
function initButtonRipple() {
    const buttons = document.querySelectorAll('.buy-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;

            // Add ripple animation
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// Typing Effect for Title (Optional Enhancement)
// ============================================
function initTypingEffect() {
    const title = document.querySelector('.title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';

    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// ============================================
// Smooth Number Counter (For future use)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    update();
}

// ============================================
// Dynamic Background Gradient Animation
// ============================================
function initDynamicBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        hero.style.setProperty('--dynamic-hue', hue);
    }, 50);
}

// Console Easter Egg
console.log(`
%c🐋 WHALY %c- The White Whale
%cNo charts. No fear. Just vibes.

`, 
'color: #7c3aed; font-size: 24px; font-weight: bold;',
'color: #06b6d4; font-size: 24px;',
'color: #a5b4fc; font-size: 14px;'
);
