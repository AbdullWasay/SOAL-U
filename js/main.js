document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navOverlay = document.querySelector('.nav-overlay');

    if (mobileBtn && mobileNav && navOverlay) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            navOverlay.classList.toggle('open');
            
            // Toggle icon
            const icon = mobileBtn.querySelector('.material-symbols-rounded');
            if (mobileNav.classList.contains('open')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });

        navOverlay.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            navOverlay.classList.remove('open');
            mobileBtn.querySelector('.material-symbols-rounded').textContent = 'menu';
        });

        // Close menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                navOverlay.classList.remove('open');
                mobileBtn.querySelector('.material-symbols-rounded').textContent = 'menu';
            });
        });
    }

    // Smooth scroll for anchor links
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

    // Reveal elements on scroll using CSS classes
    const revealElements = document.querySelectorAll('.section > .container > div, .feature-card, .masonry-item, .component-item, .grid-3 > div');
    
    // Add scroll-reveal base class
    revealElements.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        // Add slight stagger
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
