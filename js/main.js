// Common functionality for all pages

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    const header = document.querySelector('.header');

    let isMenuOpen = false;

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Open menu
            navLinks.classList.add('mobile-menu', 'open');
            navActions.classList.add('mobile-menu', 'open');

            // Create and show overlay
            let overlay = document.querySelector('.mobile-menu-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'mobile-menu-overlay';
                document.body.appendChild(overlay);
            }
            overlay.classList.add('active');

            // Add close icon with animation
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Close menu
            navLinks.classList.remove('open');
            navActions.classList.remove('open');

            // Hide overlay
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            }

            // Add hamburger icon
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');

            // Restore body scroll
            document.body.style.overflow = '';

            // Remove classes after animation
            setTimeout(() => {
                navLinks.classList.remove('mobile-menu');
                navActions.classList.remove('mobile-menu');
            }, 400);
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    }

    // Close menu when clicking outside or on overlay
    document.addEventListener('click', function(event) {
        if (isMenuOpen) {
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (!header.contains(event.target) || (overlay && overlay.contains(event.target))) {
                toggleMobileMenu();
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu styles for desktop
            isMenuOpen = false;
            navLinks.classList.remove('mobile-menu');
            navActions.classList.remove('mobile-menu');
            navLinks.style.display = 'flex';
            navActions.style.display = 'flex';

            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        } else {
            // Ensure menu is closed on mobile
            if (!isMenuOpen) {
                navLinks.classList.remove('mobile-menu');
                navActions.classList.remove('mobile-menu');
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            }
        }
    });

    // Initialize on page load
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('mobile-menu');
        navActions.classList.remove('mobile-menu');
        navLinks.style.display = 'none';
        navActions.style.display = 'none';
    }
});

// Hero functionality is now loaded as a separate script

// Icon appearance animations (staggered) on page load
document.addEventListener('DOMContentLoaded', function() {
    try {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const main = document.querySelector('main') || document.body;
        // pick elements that represent icons or feature blocks
        const nodeList = main.querySelectorAll('i, .feature-icon, .stat-icon, .feature-card, .stat-card, .testimonial-author img');
        const nodes = Array.from(nodeList);

        nodes.forEach(n => {
            if (!n.classList.contains('icon-appear')) n.classList.add('icon-appear');
        });

        nodes.forEach((el, i) => {
            const delay = 120 + Math.floor(i * 80);
            setTimeout(() => {
                el.classList.add('icon-visible');
                // some cards also get an appeared marker for subtle transform
                if (el.classList.contains('feature-card') || el.classList.contains('stat-card')) el.classList.add('appeared');
            }, delay);
        });
    } catch (e) {
        console.error('Icon animation error:', e);
    }
});