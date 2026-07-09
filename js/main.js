document.addEventListener('DOMContentLoaded', () => {
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

    // 8. Brand Keyword Embossing
    const walkAndWrap = (node) => {
        if (node.nodeType === 3) {
            const text = node.nodeValue;
            if (text.includes('엠파시') || text.includes('Empasy')) {
                const regex = /(엠파시|Empasy)/g;
                if (regex.test(text) && node.parentNode.tagName !== 'SPAN' && node.parentNode.className !== 'empasy-glow' && node.parentNode.tagName !== 'TITLE' && node.parentNode.tagName !== 'SCRIPT' && node.parentNode.tagName !== 'STYLE') {
                    const span = document.createElement('span');
                    span.innerHTML = text.replace(regex, '<span class="empasy-glow">$1</span>');
                    node.parentNode.replaceChild(span, node);
                }
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            Array.from(node.childNodes).forEach(walkAndWrap);
        }
    };
    walkAndWrap(document.body);

});
