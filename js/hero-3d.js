// Enhanced 3D Hero Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles if particles.js is included
    initParticles();
    
    // Initialize molecule viewer interactions
    initMoleculeViewer();
    
    // Add scroll animations
    initScrollAnimations();
});

function initParticles() {
    // This would initialize particles.js if included
    // For now, we'll create a simple fallback
    createParticleFallback();
}

function createParticleFallback() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    
    // Create simple CSS particles as fallback
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle-fallback';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(58, 134, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 20 + 10}s infinite linear;
        `;
        
        const keyframes = `
            @keyframes particleFloat {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg);
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
            }
        `;
        
        // Add keyframes to head if not already added
        if (!document.getElementById('particle-animations')) {
            const style = document.createElement('style');
            style.id = 'particle-animations';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        container.appendChild(particle);
    }
}

function initMoleculeViewer() {
    const moleculeDisplay = document.querySelector('.molecule-display');
    const rotateToggle = document.getElementById('rotate-toggle');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    
    let isRotating = true;
    let scale = 1;
    
    // Toggle rotation
    if (rotateToggle) {
        rotateToggle.addEventListener('click', function() {
            isRotating = !isRotating;
            if (isRotating) {
                moleculeDisplay.style.animationPlayState = 'running';
                this.innerHTML = '<i class="fas fa-sync-alt"></i>';
            } else {
                moleculeDisplay.style.animationPlayState = 'paused';
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
    
    // Zoom controls
    if (zoomIn) {
        zoomIn.addEventListener('click', function() {
            scale = Math.min(scale + 0.1, 1.5);
            moleculeDisplay.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
    }
    
    if (zoomOut) {
        zoomOut.addEventListener('click', function() {
            scale = Math.max(scale - 0.1, 0.7);
            moleculeDisplay.style.transform = `translate(-50%, -50%) scale(${scale})`;
        });
    }
    
    // Mouse interaction for manual rotation
    let isDragging = false;
    let previousX, previousY;
    let rotateX = 0, rotateY = 0;
    
    moleculeDisplay.addEventListener('mousedown', function(e) {
        isDragging = true;
        previousX = e.clientX;
        previousY = e.clientY;
        moleculeDisplay.style.animationPlayState = 'paused';
        isRotating = false;
        rotateToggle.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - previousX;
        const deltaY = e.clientY - previousY;
        
        rotateY += deltaX * 0.5;
        rotateX += deltaY * 0.5;
        
        moleculeDisplay.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        
        previousX = e.clientX;
        previousY = e.clientY;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Touch support for mobile
    moleculeDisplay.addEventListener('touchstart', function(e) {
        isDragging = true;
        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;
        moleculeDisplay.style.animationPlayState = 'paused';
        isRotating = false;
        rotateToggle.innerHTML = '<i class="fas fa-play"></i>';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - previousX;
        const deltaY = e.touches[0].clientY - previousY;
        
        rotateY += deltaX * 0.5;
        rotateX += deltaY * 0.5;
        
        moleculeDisplay.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        
        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;
        
        e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
        isDragging = false;
    });
}

function initScrollAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.stat, .feature-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const scrollAnimations = `
    .stat, .feature-card, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .stat.animate-in, .feature-card.animate-in, .testimonial-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stat:nth-child(1) { transition-delay: 0.1s; }
    .stat:nth-child(2) { transition-delay: 0.2s; }
    .stat:nth-child(3) { transition-delay: 0.3s; }
    .feature-card:nth-child(1) { transition-delay: 0.1s; }
    .feature-card:nth-child(2) { transition-delay: 0.2s; }
    .feature-card:nth-child(3) { transition-delay: 0.3s; }
`;

// Add scroll animations to head
if (!document.getElementById('scroll-animations')) {
    const style = document.createElement('style');
    style.id = 'scroll-animations';
    style.textContent = scrollAnimations;
    document.head.appendChild(style);
}