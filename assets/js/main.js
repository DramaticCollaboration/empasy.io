document.addEventListener('DOMContentLoaded', () => {
    // 0. Mobile Menu Injection
    const navContainer = document.querySelector('.nav-container');
    const navLinksEl = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (navContainer && navLinksEl) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;
        navContainer.appendChild(mobileBtn);

        mobileBtn.addEventListener('click', () => {
            navLinksEl.classList.toggle('active');
            if (navActions) navActions.classList.toggle('active');
            navContainer.classList.toggle('active');
        });
    }

    // 0.5 Mobile Menu Dropdown Toggle
    const dropdownBtns = document.querySelectorAll('.nav-container .dropdown > .dropbtn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (window.innerWidth <= 1023) {
                e.preventDefault(); // Prevent jumping to link on mobile
                const dropdown = btn.parentElement;
                
                // Close other dropdowns
                document.querySelectorAll('.nav-container .dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('open');
                });
                
                dropdown.classList.toggle('open');
            }
        });
    });

    // 1. Intersection Observer for Fade-In-Up Animations
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header height
                const headerHeight = document.querySelector('.glass-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Header Background Change on Scroll
    const header = document.querySelector('.glass-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Counter Animation
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +(counter.innerText.replace(/[^0-9]/g, ''));
            const inc = target / 100;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
                if (counter.hasAttribute('data-plus')) counter.innerText += '+';
                if (counter.hasAttribute('data-percent')) counter.innerText += '%';
            }
        };
        
        const cObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counter.innerText = '0';
                updateCount();
                cObserver.disconnect();
            }
        });
        cObserver.observe(counter);
    });

    // 5. Masonry Shuffle Simulation (SyncCMS)
    const masonryGrid = document.querySelector('.theme-cms .masonry-grid');
    if (masonryGrid) {
        setInterval(() => {
            const items = Array.from(masonryGrid.children);
            items.forEach(item => item.classList.add('shuffle-anim'));
            setTimeout(() => {
                if(items.length > 0) {
                    masonryGrid.appendChild(items[0]);
                }
                items.forEach(item => item.classList.remove('shuffle-anim'));
            }, 500);
        }, 5000);
    }

    // 6. Network Nodes Generation (SyncBoot)
    const nodeGrid = document.querySelector('.node-grid');
    if (nodeGrid) {
        for(let i=0; i<40; i++) {
            const node = document.createElement('div');
            node.className = 'node';
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            node.style.animationDelay = (Math.random() * 2) + 's';
            nodeGrid.appendChild(node);
        }
    }

    // 7. Global Dynamic Background (Making pages feel alive)
    const addDynamicBackground = () => {
        const targetSection = document.querySelector('.hero') || document.querySelector('.page-header');
        if (targetSection && !document.querySelector('.dynamic-bg-container')) {
            const bgContainer = document.createElement('div');
            bgContainer.className = 'dynamic-bg-container';
            targetSection.style.position = 'relative';
            
            for(let i=0; i<3; i++) {
                const orb = document.createElement('div');
                orb.className = `dynamic-orb orb-${i+1}`;
                bgContainer.appendChild(orb);
            }
            targetSection.prepend(bgContainer);
            
            // Bring content to front
            Array.from(targetSection.children).forEach(child => {
                if(child !== bgContainer) {
                    child.style.position = 'relative';
                    child.style.zIndex = '10';
                }
            });
        }
    };
    addDynamicBackground();

    // 8. Terminal Command Copy-to-Clipboard Functionality
    const copyBtns = document.querySelectorAll('.terminal-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const cmdText = btn.getAttribute('data-cmd') || 'empasy eta run --target https://app.example.com --scenario "결제 검증"';
            try {
                await navigator.clipboard.writeText(cmdText);
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check" style="color: #22c55e;"></i> Copied!';
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy command:', err);
            }
        });
    });

});
