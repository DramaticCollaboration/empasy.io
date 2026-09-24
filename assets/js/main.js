function initMain() {
    // 0. Mobile Menu Injection
    const navContainer = document.querySelector('.nav-container');
    const navLinksEl = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (navContainer && navLinksEl && !document.querySelector('.mobile-menu-btn')) {
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

    // 0.4 Announcement Bar Close Handler
    const announcementBar = document.querySelector('.top-announcement-bar');
    const announcementClose = document.querySelector('.announcement-close');
    if (announcementBar && announcementClose) {
        announcementClose.addEventListener('click', () => {
            announcementBar.style.display = 'none';
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
    
    // Immediate activation for elements already in or near viewport to prevent blank page bugs
    animatedElements.forEach(el => {
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

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        if (!el.classList.contains('visible')) {
            observer.observe(el);
        }
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

    // 3. Header Background Change on Scroll (rAF Throttled + Passive)
    const header = document.querySelector('.glass-header');
    if (header) {
        let ticking = false;
        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(11, 17, 32, 0.95)';
                header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
                header.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            } else {
                header.style.background = 'rgba(11, 17, 32, 0.85)';
                header.style.boxShadow = 'none';
                header.style.borderColor = 'rgba(255, 255, 255, 0.08)';
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
            
            // Bring content to front (preserve absolute background decorations)
            const bgClasses = ['dynamic-bg-container', 'hero-grid-bg', 'hero-blur-circle', 'node-grid', 'verse-hero-glow'];
            Array.from(targetSection.children).forEach(child => {
                const isBg = bgClasses.some(cls => child.classList.contains(cls));
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

    // 8. Terminal Command Copy-to-Clipboard Functionality
    const copyBtns = document.querySelectorAll('.terminal-copy-btn');
    const pageLang = document.documentElement.lang || 'ko';
    const langKey = pageLang.startsWith('en') ? 'en' : (pageLang.startsWith('ja') ? 'ja' : 'ko');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const defaultCmd = langKey === 'en'
                ? 'empasy eta run --target https://app.example.com --scenario "checkout-verification"'
                : (langKey === 'ja'
                    ? 'empasy eta run --target https://app.example.com --scenario "決済検証"'
                    : 'empasy eta run --target https://app.example.com --scenario "결제 검증"');
            const cmdText = btn.getAttribute('data-cmd') || defaultCmd;
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

    // 9. Interactive Agent CLI Terminal Simulator
    const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
    const terminalInput = document.querySelector('.terminal-cmd-text');
    const terminalOutput = document.querySelector('.terminal-output-container');
    const terminalCopyBtn = document.querySelector('.terminal-copy-btn');
    const terminalRoleBanner = document.querySelector('.terminal-role-banner');

    const agentTerminalData = {
        verse: {
            cmd: {
                ko: 'empasy verse dispatch --workflow "order-flow" --mode "autonomous"',
                en: 'empasy verse dispatch --workflow "order-flow" --mode "autonomous"',
                ja: 'empasy verse dispatch --workflow "order-flow" --mode "autonomous"'
            },
            copyCmd: {
                ko: 'empasy verse dispatch --workflow "order-flow" --mode "autonomous"',
                en: 'empasy verse dispatch --workflow "order-flow" --mode "autonomous"',
                ja: 'empasy verse dispatch --workflow "order-flow" --mode "autonomous"'
            },
            tag: { ko: '중앙 관제탑', en: 'Control Tower', ja: '中央管制塔' },
            desc: {
                ko: '다중 에이전트 간 트랜잭션을 조율하고 시스템 보안 및 FinOps 가드레일을 통제합니다.',
                en: 'Orchestrates multi-agent transactions, enforcing system security & FinOps guardrails.',
                ja: 'マルチエージェント間のトランザクションを統調し、セキュリティとFinOpsを制御します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncVerse Orchestrator]</div>
                    <div>&nbsp;↳ A2A MessageHub initialized [Agents: SyncBoot, SyncEta, SyncLLM]</div>
                    <div>&nbsp;↳ Dispatching distributed transaction... <span style="color: #22c55e;">[DISPATCHED]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncVerse Guardrail]</div>
                    <div>&nbsp;↳ PII Masked &amp; Redis Semantic Cache HIT (Latency: 12ms) <span style="color: #22c55e;">[SAFE]</span></div>
                    <div>&nbsp;↳ All agent SLAs verified &amp; Audit Trace ID: #trc-9842a <span style="color: #22c55e;">[100% HEALTHY]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncVerse Orchestrator]</div>
                    <div>&nbsp;↳ A2A MessageHub initialized [Agents: SyncBoot, SyncEta, SyncLLM]</div>
                    <div>&nbsp;↳ Dispatching distributed transaction... <span style="color: #22c55e;">[DISPATCHED]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncVerse Guardrail]</div>
                    <div>&nbsp;↳ PII Masked &amp; Redis Semantic Cache HIT (Latency: 12ms) <span style="color: #22c55e;">[SAFE]</span></div>
                    <div>&nbsp;↳ All agent SLAs verified &amp; Audit Trace ID: #trc-9842a <span style="color: #22c55e;">[100% HEALTHY]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncVerse Orchestrator]</div>
                    <div>&nbsp;↳ A2A MessageHub initialized [Agents: SyncBoot, SyncEta, SyncLLM]</div>
                    <div>&nbsp;↳ Dispatching distributed transaction... <span style="color: #22c55e;">[DISPATCHED]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncVerse Guardrail]</div>
                    <div>&nbsp;↳ PII Masked &amp; Redis Semantic Cache HIT (Latency: 12ms) <span style="color: #22c55e;">[SAFE]</span></div>
                    <div>&nbsp;↳ All agent SLAs verified &amp; Audit Trace ID: #trc-9842a <span style="color: #22c55e;">[100% HEALTHY]</span></div>
                `
            }
        },
        eta: {
            cmd: {
                ko: 'empasy eta run --target https://app.example.com --scenario "결제 검증"',
                en: 'empasy eta run --target https://app.example.com --scenario "checkout-verification"',
                ja: 'empasy eta run --target https://app.example.com --scenario "決済検証"'
            },
            copyCmd: {
                ko: 'empasy eta run --target https://app.example.com --scenario "결제 검증"',
                en: 'empasy eta run --target https://app.example.com --scenario "checkout-verification"',
                ja: 'empasy eta run --target https://app.example.com --scenario "決済検証"'
            },
            tag: { ko: '자가치유 QA', en: 'Self-Healing QA', ja: '自己修復QA' },
            desc: {
                ko: 'UI 레이아웃이 변경되어도 Vision-LLM이 요소를 재추적하여 테스트 스크립트 장애를 방지합니다.',
                en: 'Vision-LLM re-identifies UI elements visually to self-heal broken test scripts.',
                ja: 'UIが変更されてもVision-LLMが要素を再特定し、テスト障害を自己修復します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncEta Engine]</div>
                    <div>&nbsp;↳ Vision-LLM 화면 요소 식별 중... <span style="color: #38bdf8;">[식별 완료: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ DOM 변경 감지: 셀렉터 자가 복구(Self-Healing) 적용... <span style="color: #22c55e;">[성공]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncEta Inspector]</div>
                    <div>&nbsp;↳ E2E 결제 시나리오 및 트랜잭션 응답 검증... <span style="color: #22c55e;">[PASS (0.84s)]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncEta Engine]</div>
                    <div>&nbsp;↳ Vision-LLM identifying UI elements... <span style="color: #38bdf8;">[Identified: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ DOM mutation detected: Applying Self-Healing selector... <span style="color: #22c55e;">[Success]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncEta Inspector]</div>
                    <div>&nbsp;↳ E2E checkout scenario &amp; transaction response verified... <span style="color: #22c55e;">[PASS (0.84s)]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncEta Engine]</div>
                    <div>&nbsp;↳ Vision-LLMが画面要素を識別中... <span style="color: #38bdf8;">[識別完了: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ DOM変更を検知: セレクター自己修復(Self-Healing)を適用... <span style="color: #22c55e;">[成功]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncEta Inspector]</div>
                    <div>&nbsp;↳ E2E決済シナリオおよびトランザクション応答検証... <span style="color: #22c55e;">[PASS (0.84s)]</span></div>
                `
            }
        },
        boot: {
            cmd: {
                ko: 'empasy boot generate --domain "PaymentService" --pattern "Saga"',
                en: 'empasy boot generate --domain "PaymentService" --pattern "Saga"',
                ja: 'empasy boot generate --domain "PaymentService" --pattern "Saga"'
            },
            copyCmd: {
                ko: 'empasy boot generate --domain "PaymentService" --pattern "Saga"',
                en: 'empasy boot generate --domain "PaymentService" --pattern "Saga"',
                ja: 'empasy boot generate --domain "PaymentService" --pattern "Saga"'
            },
            tag: { ko: 'MSA 생성/운영', en: 'MSA Engineer', ja: 'MSA自動構築' },
            desc: {
                ko: '도메인 모델 기반 Spring Boot 마이크로서비스 코드 및 Saga 분산 보상 트랜잭션을 자동화합니다.',
                en: 'Automates Spring Boot microservices code generation and Saga distributed transactions.',
                ja: 'ドメインモデルに基づくSpring Bootマイクロサービス生成とSaga補償トランザクションを自動化します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncBoot Engine]</div>
                    <div>&nbsp;↳ Analyzing domain schema &amp; DDD entity relationships... <span style="color: #22c55e;">[Done]</span></div>
                    <div>&nbsp;↳ Generating Spring Boot 3.3 / Java 21 microservices scaffolding...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot Verifier]</div>
                    <div>&nbsp;↳ Saga compensation transaction &amp; zero-mock tests generated... <span style="color: #22c55e;">[BUILD SUCCESS (1.2s)]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncBoot Engine]</div>
                    <div>&nbsp;↳ Analyzing domain schema &amp; DDD entity relationships... <span style="color: #22c55e;">[Done]</span></div>
                    <div>&nbsp;↳ Generating Spring Boot 3.3 / Java 21 microservices scaffolding...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot Verifier]</div>
                    <div>&nbsp;↳ Saga compensation transaction &amp; zero-mock tests generated... <span style="color: #22c55e;">[BUILD SUCCESS (1.2s)]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncBoot Engine]</div>
                    <div>&nbsp;↳ Analyzing domain schema &amp; DDD entity relationships... <span style="color: #22c55e;">[Done]</span></div>
                    <div>&nbsp;↳ Generating Spring Boot 3.3 / Java 21 microservices scaffolding...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot Verifier]</div>
                    <div>&nbsp;↳ Saga compensation transaction &amp; zero-mock tests generated... <span style="color: #22c55e;">[BUILD SUCCESS (1.2s)]</span></div>
                `
            }
        },
        cms: {
            cmd: {
                ko: 'empasy cms publish --page "launch-campaign" --languages "ko,en,ja"',
                en: 'empasy cms publish --page "launch-campaign" --languages "ko,en,ja"',
                ja: 'empasy cms publish --page "launch-campaign" --languages "ko,en,ja"'
            },
            copyCmd: {
                ko: 'empasy cms publish --page "launch-campaign" --languages "ko,en,ja"',
                en: 'empasy cms publish --page "launch-campaign" --languages "ko,en,ja"',
                ja: 'empasy cms publish --page "launch-campaign" --languages "ko,en,ja"'
            },
            tag: { ko: '퍼블리싱 에이전트', en: 'Publisher Agent', ja: '配信エージェント' },
            desc: {
                ko: '자연어 명령으로 다국어 반응형 웹 레이아웃과 콘텐츠를 실시간 생성 및 동기화합니다.',
                en: 'Generates and synchronizes multi-lingual layouts and content via natural language.',
                ja: '自然言語のプロンプトから多言語レスポンシブWebとコンテンツをリアルタイム生成します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncCMS Core]</div>
                    <div>&nbsp;↳ Natural language prompt transformed into responsive layout blocks</div>
                    <div>&nbsp;↳ Translating &amp; synchronizing resource tokens across 3 locales... <span style="color: #22c55e;">[Done]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS Edge]</div>
                    <div>&nbsp;↳ Atomic cache purge &amp; Zero-Downtime multi-site deployment... <span style="color: #22c55e;">[LIVE (15+ Sites)]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncCMS Core]</div>
                    <div>&nbsp;↳ Natural language prompt transformed into responsive layout blocks</div>
                    <div>&nbsp;↳ Translating &amp; synchronizing resource tokens across 3 locales... <span style="color: #22c55e;">[Done]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS Edge]</div>
                    <div>&nbsp;↳ Atomic cache purge &amp; Zero-Downtime multi-site deployment... <span style="color: #22c55e;">[LIVE (15+ Sites)]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncCMS Core]</div>
                    <div>&nbsp;↳ Natural language prompt transformed into responsive layout blocks</div>
                    <div>&nbsp;↳ Translating &amp; synchronizing resource tokens across 3 locales... <span style="color: #22c55e;">[Done]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS Edge]</div>
                    <div>&nbsp;↳ Atomic cache purge &amp; Zero-Downtime multi-site deployment... <span style="color: #22c55e;">[LIVE (15+ Sites)]</span></div>
                `
            }
        },
        crawl: {
            cmd: {
                ko: 'empasy crawl run --target "https://market.data.org" --schema "pricing.json"',
                en: 'empasy crawl run --target "https://market.data.org" --schema "pricing.json"',
                ja: 'empasy crawl run --target "https://market.data.org" --schema "pricing.json"'
            },
            copyCmd: {
                ko: 'empasy crawl run --target "https://market.data.org" --schema "pricing.json"',
                en: 'empasy crawl run --target "https://market.data.org" --schema "pricing.json"',
                ja: 'empasy crawl run --target "https://market.data.org" --schema "pricing.json"'
            },
            tag: { ko: '지능형 데이터 수집', en: 'Intelligence Scout', ja: 'データ収集' },
            desc: {
                ko: '사이트 구조 변화에 동적으로 대응하며 차단 없이 고품질 RAG 지식 데이터를 수집합니다.',
                en: 'Dynamically adapts to DOM changes and bypasses bot defenses to extract RAG knowledge.',
                ja: 'DOM構造の変化に動的適応し、アクセス遮断を回避して高品質RAGデータを収集します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncCrawl Scout]</div>
                    <div>&nbsp;↳ Rotating residential proxy session &amp; bypassing dynamic CAPTCHA... <span style="color: #22c55e;">[Success]</span></div>
                    <div>&nbsp;↳ Target DOM layout changed: Auto-inferring semantic selectors... <span style="color: #38bdf8;">[Resolved]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCrawl Pipeline]</div>
                    <div>&nbsp;↳ Structured JSON extracted &amp; Vectorized into RAG Knowledge Base... <span style="color: #22c55e;">[1,420 Items Synced]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncCrawl Scout]</div>
                    <div>&nbsp;↳ Rotating residential proxy session &amp; bypassing dynamic CAPTCHA... <span style="color: #22c55e;">[Success]</span></div>
                    <div>&nbsp;↳ Target DOM layout changed: Auto-inferring semantic selectors... <span style="color: #38bdf8;">[Resolved]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCrawl Pipeline]</div>
                    <div>&nbsp;↳ Structured JSON extracted &amp; Vectorized into RAG Knowledge Base... <span style="color: #22c55e;">[1,420 Items Synced]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncCrawl Scout]</div>
                    <div>&nbsp;↳ Rotating residential proxy session &amp; bypassing dynamic CAPTCHA... <span style="color: #22c55e;">[Success]</span></div>
                    <div>&nbsp;↳ Target DOM layout changed: Auto-inferring semantic selectors... <span style="color: #38bdf8;">[Resolved]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCrawl Pipeline]</div>
                    <div>&nbsp;↳ Structured JSON extracted &amp; Vectorized into RAG Knowledge Base... <span style="color: #22c55e;">[1,420 Items Synced]</span></div>
                `
            }
        }
    };

    if (terminalTabs.length > 0 && terminalInput && terminalOutput) {
        let typingTimer = null;

        // Initialize ARIA accessibility attributes
        const tabList = terminalTabs[0].parentElement;
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
            tabList.setAttribute('aria-label', 'Agent Terminal Switcher');
        }

        terminalTabs.forEach((tab, index) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('id', `terminal-tab-${index}`);
            tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
            tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');

            tab.addEventListener('click', () => {
                terminalTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                    t.setAttribute('tabindex', '-1');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
                
                // Smoothly center active tab on mobile/scrollable viewports
                if (typeof tab.scrollIntoView === 'function') {
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
                
                const agentKey = tab.getAttribute('data-agent');
                const data = agentTerminalData[agentKey] || agentTerminalData.verse;
                const activeCmd = (data.cmd && (data.cmd[langKey] || data.cmd.ko)) || '';
                const activeCopyCmd = (data.copyCmd && (data.copyCmd[langKey] || data.copyCmd.ko)) || activeCmd;
                const activeOutput = (data.output && (data.output[langKey] || data.output.ko)) || '';

                if (terminalCopyBtn) {
                    terminalCopyBtn.setAttribute('data-cmd', activeCopyCmd);
                }

                // Smooth typing effect for terminal command
                if (typingTimer) clearInterval(typingTimer);
                terminalInput.innerText = '';
                terminalOutput.style.opacity = '0.3';
                terminalOutput.style.transition = 'opacity 0.2s ease';

                let charIndex = 0;
                const fullCmd = activeCmd;
                typingTimer = setInterval(() => {
                    if (charIndex < fullCmd.length) {
                        terminalInput.innerText += fullCmd.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typingTimer);
                        terminalOutput.innerHTML = activeOutput;
                        terminalOutput.style.opacity = '1';
                    }
                }, 12);

                if (terminalRoleBanner) {
                    const tagEl = terminalRoleBanner.querySelector('.terminal-role-tag');
                    const textEl = terminalRoleBanner.querySelector('.terminal-role-text');
                    if (tagEl && data.tag) tagEl.innerText = data.tag[langKey] || data.tag.ko;
                    if (textEl && data.desc) textEl.innerText = data.desc[langKey] || data.desc.ko;
                }
            });
        });
    }

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}
