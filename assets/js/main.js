function initMain() {
    // 0. Mobile Menu Injection & Background Scroll Lock
    const navContainer = document.querySelector('.nav-container');
    const navLinksEl = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    const setMobileMenuOpen = (isOpen) => {
        if (!navContainer || !navLinksEl) return;
        navLinksEl.classList.toggle('active', isOpen);
        if (navActions) navActions.classList.toggle('active', isOpen);
        navContainer.classList.toggle('active', isOpen);
        document.documentElement.classList.toggle('mobile-menu-open', isOpen);
        document.body.classList.toggle('mobile-menu-open', isOpen);
        const btn = navContainer.querySelector('.mobile-menu-btn');
        if (btn) {
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        if (!isOpen) {
            navContainer.scrollTop = 0;
        }
    };

    if (navContainer && navLinksEl && !navContainer.dataset.empNavBound) {
        navContainer.dataset.empNavBound = 'true';
        let mobileBtn = navContainer.querySelector('.mobile-menu-btn');
        if (!mobileBtn) {
            mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.setAttribute('type', 'button');
            mobileBtn.setAttribute('aria-label', 'Menu');
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.innerHTML = `
                <svg class="icon-hamburger" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg class="icon-close" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
            navContainer.appendChild(mobileBtn);
        }

        mobileBtn.addEventListener('click', () => {
            const nextOpen = !navContainer.classList.contains('active');
            setMobileMenuOpen(nextOpen);
        });

        navContainer.querySelectorAll('a:not(.dropbtn)').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1023 && navContainer.classList.contains('active')) {
                    setMobileMenuOpen(false);
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navContainer.classList.contains('active')) {
                setMobileMenuOpen(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1023 && navContainer.classList.contains('active')) {
                setMobileMenuOpen(false);
            }
        });

        // Mobile Menu Dropdown Toggle
        const dropdownBtns = navContainer.querySelectorAll('.dropdown > .dropbtn');
        dropdownBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                if (window.innerWidth <= 1023) {
                    e.preventDefault();
                    const dropdown = btn.parentElement;
                    navContainer.querySelectorAll('.dropdown').forEach((d) => {
                        if (d !== dropdown) d.classList.remove('open');
                    });
                    dropdown.classList.toggle('open');
                }
            });
        });
    }

    // 1. Intersection Observer for Fade-In-Up Animations
    const animatedElements = document.querySelectorAll('.fade-in-up');

    animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100 && rect.bottom > -50) {
            el.classList.add('visible');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el) => {
        if (!el.classList.contains('visible')) {
            observer.observe(el);
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerEl = document.querySelector('.glass-header');
                const headerHeight = headerEl ? headerEl.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header Background Change on Scroll (rAF Throttled + Passive, Light Editorial)
    const header = document.querySelector('.glass-header');
    if (header) {
        let ticking = false;
        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px -12px rgba(15, 23, 42, 0.14)';
                header.style.borderColor = '#e2e8f0';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
                header.style.borderColor = '#e2e8f0';
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    // 4. Global Dynamic Background
    const addDynamicBackground = () => {
        const targetSection = document.querySelector('.hero') || document.querySelector('.page-header');
        if (targetSection && !document.querySelector('.dynamic-bg-container')) {
            const bgContainer = document.createElement('div');
            bgContainer.className = 'dynamic-bg-container';
            targetSection.style.position = 'relative';

            for (let i = 0; i < 3; i++) {
                const orb = document.createElement('div');
                orb.className = `dynamic-orb orb-${i + 1}`;
                bgContainer.appendChild(orb);
            }
            targetSection.prepend(bgContainer);

            const bgClasses = ['dynamic-bg-container', 'hero-grid-bg', 'hero-blur-circle', 'verse-hero-glow'];
            Array.from(targetSection.children).forEach((child) => {
                const isBg = bgClasses.some((cls) => child.classList.contains(cls));
                if (!isBg && child !== bgContainer) {
                    const compPos = window.getComputedStyle(child).position;
                    if (compPos === 'static') {
                        child.style.position = 'relative';
                    }
                    child.style.zIndex = '10';
                }
            });
        }
    };
    addDynamicBackground();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}
