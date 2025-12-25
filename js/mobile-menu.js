document.addEventListener('DOMContentLoaded', function() {
    var mobileBtn = document.querySelector('.mobile-menu-btn');
    var navLinks = document.querySelector('.nav-links');
    var navActions = document.querySelector('.nav-actions');

    if (!mobileBtn || !navLinks) return;

    function closeMenu() {
        navLinks.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        navLinks.classList.add('open');
        mobileBtn.setAttribute('aria-expanded', 'true');
    }

    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navLinks.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close when clicking a nav link
    navLinks.addEventListener('click', function(e) {
        var target = e.target.closest('a');
        if (target) {
            closeMenu();
        }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
});
