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
                header.style.background = 'rgba(11, 17, 32, 0.97)';
                header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
                header.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            } else {
                header.style.background = 'rgba(11, 17, 32, 0.94)';
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
            tag: { ko: '통합 관제', en: 'Control Tower', ja: '中央管制塔' },
            desc: {
                ko: '여러 AI의 작업 순서를 조율하고 보안과 예산을 실시간으로 관리합니다.',
                en: 'Orchestrates multi-agent transactions, enforcing system security & FinOps guardrails.',
                ja: 'マルチエージェント間のトランザクションを統調し、セキュリティとFinOpsを制御します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncVerse 통합 관제]</div>
                    <div>&nbsp;↳ 주문·결제 자동화 시작 [연결된 AI: 백엔드 개발, 자동 테스트, 비용·보안]</div>
                    <div>&nbsp;↳ 단계별 작업 자동 배분 및 실행... <span style="color: #22c55e;">[진행 완료]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[보안 및 비용 보호]</div>
                    <div>&nbsp;↳ 개인정보 자동 가림 처리 및 중복 질문 캐시 적용 (응답: 12ms) <span style="color: #22c55e;">[안전]</span></div>
                    <div>&nbsp;↳ 모든 작업 정상 처리 확인 (기록 번호: #trc-9842a) <span style="color: #22c55e;">[정상]</span></div>
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
        insight: {
            cmd: {
                ko: 'empasy insight analyze --topic "Q4-pricing-strategy" --debate-agents 3',
                en: 'empasy insight analyze --topic "Q4-pricing-strategy" --debate-agents 3',
                ja: 'empasy insight analyze --topic "Q4-pricing-strategy" --debate-agents 3'
            },
            copyCmd: {
                ko: 'empasy insight analyze --topic "Q4-pricing-strategy" --debate-agents 3',
                en: 'empasy insight analyze --topic "Q4-pricing-strategy" --debate-agents 3',
                ja: 'empasy insight analyze --topic "Q4-pricing-strategy" --debate-agents 3'
            },
            tag: { ko: '데이터 분석', en: 'Decision Intelligence', ja: '戦略意思決定' },
            desc: {
                ko: '사내 운영 데이터와 시장 동향을 함께 분석해 최적의 비즈니스 전략을 제안합니다.',
                en: 'Synthesizes internal telemetry and market data via multi-agent debate for strategic decisions.',
                ja: '社内外データの統合分析とマルチエージェント討論により最適な経営戦略を導出します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncInsight 분석 엔진]</div>
                    <div>&nbsp;↳ 외부 시장 가격 동향 및 쇼핑몰 매출 데이터 통합 중... <span style="color: #22c55e;">[완료]</span></div>
                    <div>&nbsp;↳ 매출·수익성·위험도 시뮬레이션 완료... <span style="color: #38bdf8;">[예상 이익률 +6.8% 개선]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[실행 계획 전달]</div>
                    <div>&nbsp;↳ 요약 보고서 생성 및 관리자 승인 대기 등록 <span style="color: #22c55e;">[준비 완료]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncInsight Debate Engine]</div>
                    <div>&nbsp;↳ Aggregating SyncCrawl market feeds &amp; SyncShop conversion telemetry... <span style="color: #22c55e;">[Synced]</span></div>
                    <div>&nbsp;↳ Running 3-Agent Roundtable (Growth vs Margin vs Risk)... <span style="color: #38bdf8;">[Consensus: +6.8% Net Margin]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncInsight Action Dispatch]</div>
                    <div>&nbsp;↳ Executive brief generated &amp; HITL approval queued for SyncShop/SyncCMS <span style="color: #22c55e;">[READY]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncInsight Debate Engine]</div>
                    <div>&nbsp;↳ Aggregating SyncCrawl market feeds &amp; SyncShop conversion telemetry... <span style="color: #22c55e;">[Synced]</span></div>
                    <div>&nbsp;↳ Running 3-Agent Roundtable (Growth vs Margin vs Risk)... <span style="color: #38bdf8;">[Consensus: +6.8% Net Margin]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncInsight Action Dispatch]</div>
                    <div>&nbsp;↳ Executive brief generated &amp; HITL approval queued for SyncShop/SyncCMS <span style="color: #22c55e;">[READY]</span></div>
                `
            }
        },
        llm: {
            cmd: {
                ko: 'empasy llm route --models "gpt-4o,claude-3-7,vllm-local" --pii-mask strict',
                en: 'empasy llm route --models "gpt-4o,claude-3-7,vllm-local" --pii-mask strict',
                ja: 'empasy llm route --models "gpt-4o,claude-3-7,vllm-local" --pii-mask strict'
            },
            copyCmd: {
                ko: 'empasy llm route --models "gpt-4o,claude-3-7,vllm-local" --pii-mask strict',
                en: 'empasy llm route --models "gpt-4o,claude-3-7,vllm-local" --pii-mask strict',
                ja: 'empasy llm route --models "gpt-4o,claude-3-7,vllm-local" --pii-mask strict'
            },
            tag: { ko: '비용·보안 관리', en: 'AI Gateway & FinOps', ja: 'AIゲートウェイ' },
            desc: {
                ko: '민감한 개인정보를 자동으로 가리고, 중복 질문을 재사용해 AI 비용을 아껴줍니다.',
                en: 'Controls token costs and security via multi-LLM routing, semantic caching, and PII masking.',
                ja: 'マルチLLMルーティング、セマンティックキャッシュ、PIIマスキングでコストと安全性を制御します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncLLM 보안 필터]</div>
                    <div>&nbsp;↳ 외부 전송 전 민감정보 2건(주민번호, 연락처) 자동 가림 처리 <span style="color: #22c55e;">[보호됨]</span></div>
                    <div>&nbsp;↳ 기존 유사 질문 답변 재사용... <span style="color: #38bdf8;">[캐시 적용: 4,200 토큰 절약]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[비용 관리 현황]</div>
                    <div>&nbsp;↳ 부서 예산 사용률: 41.2% | 이번 달 절감률: -54.8% <span style="color: #22c55e;">[양호]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncLLM Gateway]</div>
                    <div>&nbsp;↳ PII Guardrail: Masked 2 sensitive fields (SSN, Phone) prior to egress <span style="color: #22c55e;">[PROTECTED]</span></div>
                    <div>&nbsp;↳ Redis pgvector Semantic Cache lookup... <span style="color: #38bdf8;">[CACHE HIT: Saved 4,200 tokens]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncLLM FinOps]</div>
                    <div>&nbsp;↳ Dept budget usage: 41.2% | Cost reduction this month: -54.8% <span style="color: #22c55e;">[OPTIMAL]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncLLM Gateway]</div>
                    <div>&nbsp;↳ PII Guardrail: Masked 2 sensitive fields (SSN, Phone) prior to egress <span style="color: #22c55e;">[PROTECTED]</span></div>
                    <div>&nbsp;↳ Redis pgvector Semantic Cache lookup... <span style="color: #38bdf8;">[CACHE HIT: Saved 4,200 tokens]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncLLM FinOps]</div>
                    <div>&nbsp;↳ Dept budget usage: 41.2% | Cost reduction this month: -54.8% <span style="color: #22c55e;">[OPTIMAL]</span></div>
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
            tag: { ko: '자동 테스트', en: 'Self-Healing QA', ja: '自己修復QA' },
            desc: {
                ko: '화면 디자인이 바뀌어도 AI가 버튼을 스스로 찾아 끊김 없이 테스트합니다.',
                en: 'Vision-LLM re-identifies UI elements visually to self-heal broken test scripts.',
                ja: 'UIが変更されてもVision-LLMが要素を再特定し、テスト障害を自己修復します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncEta 자동 테스트]</div>
                    <div>&nbsp;↳ 화면 내 결제 버튼 위치 인식 중... <span style="color: #38bdf8;">[확인 완료: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ 화면 구조 변경 감지: 바뀐 버튼 위치로 테스트 경로 자동 수정... <span style="color: #22c55e;">[성공]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[테스트 결과]</div>
                    <div>&nbsp;↳ 결제 시나리오 및 정상 응답 확인 완료... <span style="color: #22c55e;">[통과 (0.84초)]</span></div>
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
            tag: { ko: '백엔드 개발', en: 'MSA Engineer', ja: 'MSA自動構築' },
            desc: {
                ko: '설계 문서에 맞춰 서버 코드와 데이터베이스 구조를 자동으로 생성합니다.',
                en: 'Automates Spring Boot microservices code generation and Saga distributed transactions.',
                ja: 'ドメインモデルに基づくSpring Bootマイクロサービス生成とSaga補償トランザクションを自動化します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncBoot 코드 생성]</div>
                    <div>&nbsp;↳ 결제 서비스 데이터베이스 구조 및 연관 관계 분석... <span style="color: #22c55e;">[완료]</span></div>
                    <div>&nbsp;↳ Spring Boot 서버 API 및 데이터 처리 코드 자동 생성 중...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot 검증]</div>
                    <div>&nbsp;↳ 오류 자동 복구 로직 및 단위 테스트 검증 완료... <span style="color: #22c55e;">[빌드 성공 (1.2초)]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncBoot Engine]</div>
                    <div>&nbsp;↳ Analyzing domain schema &amp; DDD entity relationships... <span style="color: #22c55e;">[Done]</span></div>
                    <div>&nbsp;↳ Generating Spring Boot 3.5.16 / Java 25 microservices scaffolding...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot Verifier]</div>
                    <div>&nbsp;↳ Saga compensation transaction &amp; zero-mock tests generated... <span style="color: #22c55e;">[BUILD SUCCESS (1.2s)]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncBoot Engine]</div>
                    <div>&nbsp;↳ Analyzing domain schema &amp; DDD entity relationships... <span style="color: #22c55e;">[Done]</span></div>
                    <div>&nbsp;↳ Generating Spring Boot 3.5.16 / Java 25 microservices scaffolding...</div>
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
            tag: { ko: '웹 제작', en: 'Publisher Agent', ja: '配信エージェント' },
            desc: {
                ko: '요구사항에 맞는 웹페이지와 다국어 콘텐츠를 자동으로 만들고 배포합니다.',
                en: 'Generates and deploys multi-lingual responsive web pages via Nuxt 3 SSR & 3-Agent Swarm.',
                ja: 'Nuxt 3 SSRと3-Agent Swarmにより多言語レスポンシブWebとコンテンツをリアルタイム生成・配信します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncCMS 웹 제작]</div>
                    <div>&nbsp;↳ 신규 캠페인 페이지 레이아웃 및 검색 최적화(SEO) 문구 생성</div>
                    <div>&nbsp;↳ 한국어·영어·일본어 3개 국어 자동 번역 및 동기화... <span style="color: #22c55e;">[완료]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS 배포]</div>
                    <div>&nbsp;↳ 서비스 중단 없이 전체 글로벌 사이트 동시 반영... <span style="color: #22c55e;">[배포 완료 (15개 사이트)]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncCMS 3-Agent Swarm]</div>
                    <div>&nbsp;↳ Copywriter &amp; SEO Agents synthesized Nuxt 3 SSR Page Fragments</div>
                    <div>&nbsp;↳ Translating &amp; synchronizing resource tokens across 3 locales... <span style="color: #22c55e;">[Done]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS Publisher Edge]</div>
                    <div>&nbsp;↳ Atomic cache purge &amp; Zero-Downtime multi-site deployment... <span style="color: #22c55e;">[LIVE (15+ Sites)]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncCMS 3-Agent Swarm]</div>
                    <div>&nbsp;↳ Copywriter &amp; SEO Agents synthesized Nuxt 3 SSR Page Fragments</div>
                    <div>&nbsp;↳ Translating &amp; synchronizing resource tokens across 3 locales... <span style="color: #22c55e;">[Done]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS Publisher Edge]</div>
                    <div>&nbsp;↳ Atomic cache purge &amp; Zero-Downtime multi-site deployment... <span style="color: #22c55e;">[LIVE (15+ Sites)]</span></div>
                `
            }
        },
        shop: {
            cmd: {
                ko: 'empasy shop optimize --catalog "electronics" --strategy "dynamic-margin"',
                en: 'empasy shop optimize --catalog "electronics" --strategy "dynamic-margin"',
                ja: 'empasy shop optimize --catalog "electronics" --strategy "dynamic-margin"'
            },
            copyCmd: {
                ko: 'empasy shop optimize --catalog "electronics" --strategy "dynamic-margin"',
                en: 'empasy shop optimize --catalog "electronics" --strategy "dynamic-margin"',
                ja: 'empasy shop optimize --catalog "electronics" --strategy "dynamic-margin"'
            },
            tag: { ko: '쇼핑몰 운영', en: 'Commerce Agent', ja: '自律型コマース' },
            desc: {
                ko: '시장 가격과 고객 검색 의도를 분석해 상품 추천과 판매가를 자동으로 최적화합니다.',
                en: 'Autonomously executes catalog enrichment, pgvector semantic search, and dynamic pricing on MSA.',
                ja: '分散MSA基盤でカタログ生成、pgvectorセマンティック検索、動的価格設定を自律遂行します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncShop 상품 관리]</div>
                    <div>&nbsp;↳ 12,400개 상품 맞춤형 검색 데이터 업데이트... <span style="color: #22c55e;">[완료]</span></div>
                    <div>&nbsp;↳ 경쟁사 가격 변동 감지: 최적 판매가 및 마진 자동 조정... <span style="color: #38bdf8;">[예상 매출 +4.2%]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncShop 프로모션]</div>
                    <div>&nbsp;↳ 고객별 맞춤 추천 상품 및 할인 쿠폰 자동 적용 <span style="color: #22c55e;">[적용됨]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncShop Merchandiser]</div>
                    <div>&nbsp;↳ Indexing 12,400 SKUs into PostgreSQL 17 pgvector hybrid search... <span style="color: #22c55e;">[Indexed]</span></div>
                    <div>&nbsp;↳ Competitor price shift detected via SyncCrawl: Adjusting dynamic margin... <span style="color: #38bdf8;">[+4.2% Rev]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncShop OMS/PMS]</div>
                    <div>&nbsp;↳ Distributed order saga &amp; personalized promotion dispatched <span style="color: #22c55e;">[ACTIVE]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncShop Merchandiser]</div>
                    <div>&nbsp;↳ Indexing 12,400 SKUs into PostgreSQL 17 pgvector hybrid search... <span style="color: #22c55e;">[Indexed]</span></div>
                    <div>&nbsp;↳ Competitor price shift detected via SyncCrawl: Adjusting dynamic margin... <span style="color: #38bdf8;">[+4.2% Rev]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncShop OMS/PMS]</div>
                    <div>&nbsp;↳ Distributed order saga &amp; personalized promotion dispatched <span style="color: #22c55e;">[ACTIVE]</span></div>
                `
            }
        },
        ops: {
            cmd: {
                ko: 'empasy ops audit-profit --year 2026 --check-subcontract-overdue',
                en: 'empasy ops audit-profit --year 2026 --check-subcontract-overdue',
                ja: 'empasy ops audit-profit --year 2026 --check-subcontract-overdue'
            },
            copyCmd: {
                ko: 'empasy ops audit-profit --year 2026 --check-subcontract-overdue',
                en: 'empasy ops audit-profit --year 2026 --check-subcontract-overdue',
                ja: 'empasy ops audit-profit --year 2026 --check-subcontract-overdue'
            },
            tag: { ko: '프로젝트·손익 관리', en: 'SI PMO & Profit', ja: 'SI事業・損益管制' },
            desc: {
                ko: '프로젝트별 실시간 수익률과 인력 투입 현황, 보증보험·하도급 지급 기일을 관리합니다.',
                en: 'Governs Dual-Rate P&L, KOSA M/M utilization matrix, 4 surety bonds, and 60-day subcontract compliance.',
                ja: 'デュアル単価損益、KOSA稼働率マトリックス、4大保証保険および下請法60日期日を統合管制します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncOps 손익 분석]</div>
                    <div>&nbsp;↳ 진행 중인 24개 프로젝트 계약금 대비 실투입 원가 계산... <span style="color: #22c55e;">[평균 이익률: 22.4%]</span></div>
                    <div>&nbsp;↳ 월별 인력 가동률 및 4대 보증보험 만기일 점검... <span style="color: #38bdf8;">[이상 없음]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncOps 일정 점검]</div>
                    <div>&nbsp;↳ 하도급 대금 60일 지급 기일 및 연구노트 기록 확인 <span style="color: #22c55e;">[지연 0건]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncOps Profit &amp; PMO Engine]</div>
                    <div>&nbsp;↳ Dual-Rate P&amp;L Pivot (Contract vs Actual Cost): 24 Active Projects... <span style="color: #22c55e;">[Avg Margin: 22.4%]</span></div>
                    <div>&nbsp;↳ KOSA Grade M/M Matrix &amp; 4-Surety Bond expiry scan... <span style="color: #38bdf8;">[All Bonds Valid]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncOps Compliance Guard]</div>
                    <div>&nbsp;↳ Subcontract Act 60-day payment check &amp; R&amp;D Note SHA-256 verified <span style="color: #22c55e;">[0 OVERDUE]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncOps Profit &amp; PMO Engine]</div>
                    <div>&nbsp;↳ Dual-Rate P&amp;L Pivot (Contract vs Actual Cost): 24 Active Projects... <span style="color: #22c55e;">[Avg Margin: 22.4%]</span></div>
                    <div>&nbsp;↳ KOSA Grade M/M Matrix &amp; 4-Surety Bond expiry scan... <span style="color: #38bdf8;">[All Bonds Valid]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncOps Compliance Guard]</div>
                    <div>&nbsp;↳ Subcontract Act 60-day payment check &amp; R&amp;D Note SHA-256 verified <span style="color: #22c55e;">[0 OVERDUE]</span></div>
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
            tag: { ko: '데이터 수집', en: 'Intelligence Scout', ja: 'データ収集' },
            desc: {
                ko: '웹사이트 구조가 바뀌어도 필요한 데이터를 중단 없이 수집하고 깔끔하게 정리합니다.',
                en: 'Dynamically adapts to DOM changes and bypasses bot defenses to extract RAG knowledge.',
                ja: 'DOM構造の変化に動的適応し、アクセス遮断を回避して高品質RAGデータを収集します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncCrawl 데이터 수집]</div>
                    <div>&nbsp;↳ 접속 차단 우회 및 대상 웹사이트 연결... <span style="color: #22c55e;">[성공]</span></div>
                    <div>&nbsp;↳ 사이트 화면 변경 감지: 바뀐 위치에서 데이터 항목 자동 추출... <span style="color: #38bdf8;">[완료]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCrawl 데이터 정리]</div>
                    <div>&nbsp;↳ 정제된 데이터 저장 및 사내 지식 DB 반영 완료... <span style="color: #22c55e;">[1,420건 반영]</span></div>
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
        },
        apim: {
            cmd: {
                ko: 'empasy apim inspect --gateway "mcp-edge" --zero-trust "strict"',
                en: 'empasy apim inspect --gateway "mcp-edge" --zero-trust "strict"',
                ja: 'empasy apim inspect --gateway "mcp-edge" --zero-trust "strict"'
            },
            copyCmd: {
                ko: 'empasy apim inspect --gateway "mcp-edge" --zero-trust "strict"',
                en: 'empasy apim inspect --gateway "mcp-edge" --zero-trust "strict"',
                ja: 'empasy apim inspect --gateway "mcp-edge" --zero-trust "strict"'
            },
            tag: { ko: 'API 보안·트래픽 관제', en: 'API Security Gateway', ja: 'APIセキュリティ統制' },
            desc: {
                ko: '사내외 API와 AI 에이전트 통신의 불법 접근을 차단하고 개인정보 유출을 실시간 방어합니다.',
                en: 'Blocks unauthorized API/MCP traffic, prevents PII leaks, and enforces real-time rate limits.',
                ja: '社内外APIおよびAI通信の不正アクセスを遮断し、個人情報漏洩をリアルタイム防御します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncAPIM 보안 게이트웨이]</div>
                    <div>&nbsp;↳ 전사 API 및 AI 에이전트 통신 실시간 검사... <span style="color: #22c55e;">[지연 0.8ms]</span></div>
                    <div>&nbsp;↳ 비인가 외부 호출 차단 및 민감 개인정보 자동 마스킹... <span style="color: #38bdf8;">[방어 완료]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[트래픽 제어 및 감사]</div>
                    <div>&nbsp;↳ 과부하 방지(Rate Limit) 정상 작동 및 무결성 감사 로그 기록 <span style="color: #22c55e;">[100% 안전]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncAPIM Security Gateway]</div>
                    <div>&nbsp;↳ Real-time Zero-Trust inspection across API &amp; MCP channels... <span style="color: #22c55e;">[0.8ms Overhead]</span></div>
                    <div>&nbsp;↳ Unauthorized token blocked &amp; sensitive payload masked... <span style="color: #38bdf8;">[Protected]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[Traffic Control &amp; Audit]</div>
                    <div>&nbsp;↳ Rate-limiting active &amp; immutable audit trail recorded <span style="color: #22c55e;">[100% SECURE]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncAPIM Security Gateway]</div>
                    <div>&nbsp;↳ Real-time Zero-Trust inspection across API &amp; MCP channels... <span style="color: #22c55e;">[0.8ms Overhead]</span></div>
                    <div>&nbsp;↳ Unauthorized token blocked &amp; sensitive payload masked... <span style="color: #38bdf8;">[Protected]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[Traffic Control &amp; Audit]</div>
                    <div>&nbsp;↳ Rate-limiting active &amp; immutable audit trail recorded <span style="color: #22c55e;">[100% SECURE]</span></div>
                `
            }
        }
    };

    const agentVisualMeta = {
        verse: {
            slug: 'sync-verse',
            demoUrl: 'https://verse-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-verse/screen_01.png',
            caption: {
                ko: 'SyncVerse 실제 관제 화면 — 10대 AI 에이전트 상태·승인·보안 통합 대시보드',
                en: 'SyncVerse Live Console — Multi-Agent Orchestration & HITL Governance Dashboard',
                ja: 'SyncVerse 実画面 — マルチエージェント統合管制・承認ダッシュボード'
            }
        },
        insight: {
            slug: 'sync-insight',
            demoUrl: 'https://insight-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-insight/screen_01.png',
            caption: {
                ko: 'SyncInsight 실제 분석 화면 — 다중 AI 토론 기반 경영 전략·수익성 시뮬레이션',
                en: 'SyncInsight Live Console — Multi-Agent Strategic Debate & ROI Simulation',
                ja: 'SyncInsight 実画面 — マルチAI討論に基づく経営戦略・収益性シミュレーション'
            }
        },
        llm: {
            slug: 'sync-llm',
            demoUrl: 'https://llm-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-llm/screen_01.png',
            caption: {
                ko: 'SyncLLM 실제 대시보드 — AI 모델 라우팅, 토큰 비용 절감 및 개인정보 가림 관제',
                en: 'SyncLLM Live Console — Multi-LLM Routing, Token FinOps & PII Guardrail',
                ja: 'SyncLLM 実画面 — マルチLLMルーティング・トークンコスト削減・PII保護'
            }
        },
        apim: {
            slug: 'sync-apim',
            demoUrl: 'https://apim-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-apim/screen_01.png',
            caption: {
                ko: 'SyncAPIM 실제 관제 화면 — 실시간 API·AI 통신 보안 위협 차단 및 트래픽 제어',
                en: 'SyncAPIM Live Console — Zero-Trust API/MCP Security & Traffic Control',
                ja: 'SyncAPIM 実画面 — API・AI通信のセキュリティ脅威遮断およびトラフィック制御'
            }
        },
        boot: {
            slug: 'sync-boot',
            demoUrl: 'https://boot-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-boot/screen_01.png',
            caption: {
                ko: 'SyncBoot 실제 관리 화면 — 자연어 설계 기반 백엔드 서버·API·권한 자동 생성',
                en: 'SyncBoot Live Console — Autonomous Spring Boot MSA & RBAC Code Generation',
                ja: 'SyncBoot 実画面 — バックエンドサーバー・API・権限管理の自動構築'
            }
        },
        cms: {
            slug: 'sync-cms',
            demoUrl: 'https://cms-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-cms/screen_01.png',
            caption: {
                ko: 'SyncCMS 실제 운영 화면 — 웹사이트 페이지 자동 제작 및 15개국 다국어 동시 배포',
                en: 'SyncCMS Live Console — Autonomous Web Publishing & 15+ Language Localization',
                ja: 'SyncCMS 実画面 — Webページ自動生成および15カ国語同時翻訳・配信'
            }
        },
        shop: {
            slug: 'sync-shop',
            demoUrl: 'https://shop-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-shop/screen_01.png',
            caption: {
                ko: 'SyncShop 실제 커머스 화면 — 맞춤형 상품 추천, 다이내믹 가격 조정 및 주문 관리',
                en: 'SyncShop Live Console — AI Merchandising, Dynamic Pricing & Order Operations',
                ja: 'SyncShop 実画面 — AI商品推薦・ダイナミックプライシング・注文統合管理'
            }
        },
        ops: {
            slug: 'sync-ops',
            demoUrl: 'https://ops-admin.empasy.io',
            screenUrl: '/images/screenshots/sync-ops/screen_01.png',
            caption: {
                ko: 'SyncOps 실제 손익 화면 — 프로젝트별 실시간 수익률·인력 투입·보증보험 통합 관리',
                en: 'SyncOps Live Console — Real-Time Project P&L, Resource M/M & Surety Bond Guard',
                ja: 'SyncOps 実画面 — プロジェクト別リアルタイム損益・要員稼働・保証保険管理'
            }
        },
        eta: {
            slug: 'sync-eta',
            demoUrl: 'https://sync.empasy.io/eta/',
            screenUrl: '/images/screenshots/sync-eta/screen_01.png',
            caption: {
                ko: 'SyncETA 실제 스튜디오 화면 — 화면이 바뀌어도 스스로 복구하는 AI 시각 인식 테스트',
                en: 'SyncETA Live Studio — Vision-LLM Self-Healing UI Test Automation',
                ja: 'SyncETA 実画面 — UI変更を自動認識・自己修復するAIテスト自動化スタジオ'
            }
        },
        crawl: {
            slug: 'sync-crawl',
            demoUrl: 'https://sync.empasy.io/crawl/',
            screenUrl: '/images/screenshots/sync-crawl/screen_01.png',
            caption: {
                ko: 'SyncCrawl 실제 파이프라인 화면 — 사이트 변경 자동 대응 웹 수집 및 정제 대시보드',
                en: 'SyncCrawl Live Console — Self-Adapting Web Extraction & RAG Knowledge Pipeline',
                ja: 'SyncCrawl 実画面 — サイト構造変化に自動対応するWeb収集・データ精製'
            }
        }
    };

    if (terminalTabs.length > 0 && terminalInput && terminalOutput) {
        let typingTimer = null;
        const langPrefix = langKey === 'en' ? '/en' : (langKey === 'ja' ? '/ja' : '/ko');

        // Ensure Visual Screen Preview Banner exists inside .interactive-terminal
        let screenPreviewBox = document.querySelector('.terminal-screen-preview');
        if (!screenPreviewBox && terminalRoleBanner && terminalRoleBanner.parentElement) {
            screenPreviewBox = document.createElement('div');
            screenPreviewBox.className = 'terminal-screen-preview';
            screenPreviewBox.style.cssText = 'padding: 1rem 1.25rem; background: rgba(15, 23, 42, 0.92); border-bottom: 1px solid #334155; display: flex; flex-direction: column; gap: 0.75rem;';
            const initMeta = agentVisualMeta.verse;
            const liveBtnLabel = langKey === 'en' ? 'Launch Live Demo' : (langKey === 'ja' ? 'ライブデモを開く' : '실제 구동 데모 열기');
            const detailBtnLabel = langKey === 'en' ? 'Solution Details' : (langKey === 'ja' ? '製品詳細を見る' : '솔루션 상세 보기');
            const badgeLabel = langKey === 'en' ? 'LIVE UI SCREENSHOT' : (langKey === 'ja' ? '実際の稼働画面' : '실제 제품 구동 화면');
            screenPreviewBox.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.55rem; min-width: 0;">
                        <span style="font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 999px; background: rgba(56, 189, 248, 0.16); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); white-space: nowrap;"><i class="fas fa-desktop" style="margin-right: 4px;"></i>${badgeLabel}</span>
                        <span class="terminal-screen-caption" style="font-size: 0.86rem; color: #e2e8f0; font-weight: 600;">${initMeta.caption[langKey] || initMeta.caption.ko}</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <a class="terminal-screen-demo-link" href="${initMeta.demoUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.78rem; font-weight: 700; padding: 0.35rem 0.75rem; border-radius: 6px; background: rgba(56, 189, 248, 0.18); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); text-decoration: none;"><i class="fas fa-external-link-alt" style="margin-right: 4px;"></i>${liveBtnLabel}</a>
                        <a class="terminal-screen-detail-link" href="${langPrefix}/solutions/${initMeta.slug}.html" style="font-size: 0.78rem; font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 6px; background: rgba(255, 255, 255, 0.06); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.14); text-decoration: none;">${detailBtnLabel} &rarr;</a>
                    </div>
                </div>
                <a class="terminal-screen-img-link" href="${initMeta.demoUrl}" target="_blank" rel="noopener noreferrer" style="display: block; border-radius: 8px; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.25); background: #020617; max-height: 290px; position: relative;">
                    <img class="terminal-screen-img" src="${initMeta.screenUrl}" alt="${initMeta.caption[langKey] || initMeta.caption.ko}" loading="eager" style="width: 100%; height: 290px; object-fit: cover; object-position: top center; display: block; transition: opacity 0.2s ease;" />
                </a>
            `;
            terminalRoleBanner.insertAdjacentElement('afterend', screenPreviewBox);
        }

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

                const vMeta = agentVisualMeta[agentKey] || agentVisualMeta.verse;
                if (screenPreviewBox && vMeta) {
                    const capEl = screenPreviewBox.querySelector('.terminal-screen-caption');
                    const demoLinkEl = screenPreviewBox.querySelector('.terminal-screen-demo-link');
                    const detailLinkEl = screenPreviewBox.querySelector('.terminal-screen-detail-link');
                    const imgLinkEl = screenPreviewBox.querySelector('.terminal-screen-img-link');
                    const imgEl = screenPreviewBox.querySelector('.terminal-screen-img');
                    const capText = (vMeta.caption && (vMeta.caption[langKey] || vMeta.caption.ko)) || '';
                    if (capEl) capEl.innerText = capText;
                    if (demoLinkEl) demoLinkEl.href = vMeta.demoUrl;
                    if (detailLinkEl) detailLinkEl.href = `${langPrefix}/solutions/${vMeta.slug}.html`;
                    if (imgLinkEl) imgLinkEl.href = vMeta.demoUrl;
                    if (imgEl) {
                        imgEl.style.opacity = '0.4';
                        imgEl.src = vMeta.screenUrl;
                        imgEl.alt = capText;
                        setTimeout(() => { imgEl.style.opacity = '1'; }, 80);
                    }
                }
            });
        });
    }

    // 10. Solution Detail Page Visual Screenshot Showcase Injection
    const solMatch = (window.location.pathname || '').match(/\/solutions\/(sync-(?:verse|insight|llm|apim|boot|cms|shop|ops|eta|crawl))\.html/i);
    if (solMatch && !document.querySelector('.solution-visual-showcase')) {
        const slug = solMatch[1].toLowerCase();
        const shortKey = slug.replace('sync-', '');
        const vMeta = agentVisualMeta[shortKey];
        const heroSection = document.querySelector('main .page-header, main section.hero');
        if (vMeta && heroSection) {
            const showcaseSec = document.createElement('section');
            showcaseSec.className = 'section solution-visual-showcase fade-in-up visible';
            showcaseSec.style.cssText = 'padding-top: 0.5rem; padding-bottom: 2.5rem;';
            const titleText = langKey === 'en' ? 'Live Product Screen Preview' : (langKey === 'ja' ? '実際の製品稼働画面プレビュー' : '실제 구동 대시보드 화면 미리보기');
            const subText = langKey === 'en'
                ? 'Explore the real enterprise web console screens before launching the interactive cloud demo.'
                : (langKey === 'ja'
                    ? 'クラウドデモを起動する前に、実際の管理コンソール画面と主要機能をご確認いただけます。'
                    : '로그인 없이 실제 관리자 콘솔 화면과 핵심 기능 가이드를 먼저 확인하고, 클릭 한 번으로 라이브 데모를 체험해 보세요.');
            const tab1Label = langKey === 'en' ? '1. Main Operations Dashboard' : (langKey === 'ja' ? '1. メイン管制ダッシュボード' : '1. 메인 운영 대시보드 화면');
            const tab2Label = langKey === 'en' ? '2. Feature Guide (Annotated)' : (langKey === 'ja' ? '2. 主要機能ガイド (注釈付き)' : '2. 핵심 기능 포인트 안내 (가이드)');
            const tab3Label = langKey === 'en' ? '3. Detailed Workflow View' : (langKey === 'ja' ? '3. 詳細ワークフロー画面' : '3. 상세 워크플로우·분석 화면');
            const demoBtnLabel = langKey === 'en' ? 'Open Live Cloud Demo' : (langKey === 'ja' ? 'ライブデモを直接操作する' : '이 화면 라이브 데모로 직접 조작하기');
            const portalBtnLabel = langKey === 'en' ? 'Demo Account Guide' : (langKey === 'ja' ? 'デモアカウント案内' : '체험 계정 1초 복사 안내');

            const img1 = `/images/screenshots/${slug}/screen_01.png`;
            const img2 = `/images/screenshots/${slug}/screen_01_annotated.png`;
            const img3 = `/images/screenshots/${slug}/screen_02.png`;
            const capText = (vMeta.caption && (vMeta.caption[langKey] || vMeta.caption.ko)) || '';

            showcaseSec.innerHTML = `
                <div class="glass-card" style="padding: 2rem; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.25); background: rgba(15, 23, 42, 0.78);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
                        <div>
                            <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); margin-bottom: 0.5rem;">REAL UI SCREENSHOT</span>
                            <h2 style="font-size: 1.55rem; color: #f8fafc; margin: 0.25rem 0;">${titleText}</h2>
                            <p style="color: #94a3b8; font-size: 0.95rem; margin: 0;">${subText}</p>
                        </div>
                        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                            <a href="${vMeta.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-weight: 700;"><i class="fas fa-external-link-alt" style="margin-right: 5px;"></i>${demoBtnLabel}</a>
                            <a href="https://sync.empasy.io/products/${slug}#demo" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${portalBtnLabel}</a>
                        </div>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                        <button type="button" class="sol-screen-tab active" data-img="${img1}" style="padding: 0.55rem 1rem; border-radius: 8px; border: 1px solid #38bdf8; background: rgba(56, 189, 248, 0.18); color: #f8fafc; font-weight: 700; font-size: 0.88rem; cursor: pointer;">${tab1Label}</button>
                        <button type="button" class="sol-screen-tab" data-img="${img2}" style="padding: 0.55rem 1rem; border-radius: 8px; border: 1px solid rgba(148, 163, 184, 0.28); background: rgba(15, 23, 42, 0.7); color: #cbd5e1; font-weight: 600; font-size: 0.88rem; cursor: pointer;">${tab2Label}</button>
                        <button type="button" class="sol-screen-tab" data-img="${img3}" style="padding: 0.55rem 1rem; border-radius: 8px; border: 1px solid rgba(148, 163, 184, 0.28); background: rgba(15, 23, 42, 0.7); color: #cbd5e1; font-weight: 600; font-size: 0.88rem; cursor: pointer;">${tab3Label}</button>
                    </div>
                    <div style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.25); background: #020617;">
                        <img class="sol-screen-main-img" src="${img1}" alt="${capText}" style="width: 100%; height: auto; max-height: 540px; object-fit: cover; object-position: top center; display: block; transition: opacity 0.2s ease;" />
                    </div>
                    <div style="margin-top: 0.75rem; font-size: 0.88rem; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <span><i class="fas fa-info-circle" style="color: #38bdf8; margin-right: 5px;"></i>${capText}</span>
                        <span style="color: #38bdf8; font-weight: 600;">Zero-Mock Live Environment (1920×1080)</span>
                    </div>
                </div>
            `;
            heroSection.insertAdjacentElement('afterend', showcaseSec);

            const solTabs = showcaseSec.querySelectorAll('.sol-screen-tab');
            const solMainImg = showcaseSec.querySelector('.sol-screen-main-img');
            solTabs.forEach(btn => {
                btn.addEventListener('click', () => {
                    solTabs.forEach(b => {
                        b.classList.remove('active');
                        b.style.borderColor = 'rgba(148, 163, 184, 0.28)';
                        b.style.background = 'rgba(15, 23, 42, 0.7)';
                        b.style.color = '#cbd5e1';
                    });
                    btn.classList.add('active');
                    btn.style.borderColor = '#38bdf8';
                    btn.style.background = 'rgba(56, 189, 248, 0.18)';
                    btn.style.color = '#f8fafc';
                    if (solMainImg) {
                        solMainImg.style.opacity = '0.4';
                        solMainImg.src = btn.getAttribute('data-img');
                        setTimeout(() => { solMainImg.style.opacity = '1'; }, 80);
                    }
                });
            });
        }
    }

    // 11. Solution Grid Card Thumbnail Preview Injection
    document.querySelectorAll('.solution-card').forEach(card => {
        if (card.querySelector('.solution-card-screen-thumb')) return;
        const linkEl = card.querySelector('a[href*="sync-"]');
        const headerEl = card.querySelector('.solution-card-header');
        if (!linkEl || !headerEl) return;
        const m = (linkEl.getAttribute('href') || '').match(/(sync-(?:verse|insight|llm|apim|boot|cms|shop|ops|eta|crawl))/i);
        if (!m) return;
        const slug = m[1].toLowerCase();
        const shortKey = slug.replace('sync-', '');
        const vMeta = agentVisualMeta[shortKey];
        if (!vMeta) return;
        const thumbWrap = document.createElement('a');
        thumbWrap.className = 'solution-card-screen-thumb';
        thumbWrap.href = linkEl.getAttribute('href');
        thumbWrap.style.cssText = 'display: block; margin-top: 0.9rem; margin-bottom: 0.4rem; border-radius: 10px; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.2); background: #020617; position: relative;';
        const badgeText = langKey === 'en' ? 'Live Console UI' : (langKey === 'ja' ? '実稼働画面' : '실제 대시보드 화면');
        thumbWrap.innerHTML = `
            <img src="${vMeta.screenUrl}" alt="${slug} UI" loading="lazy" style="width: 100%; height: 148px; object-fit: cover; object-position: top center; display: block; opacity: 0.92; transition: transform 0.25s ease, opacity 0.25s ease;" />
            <span style="position: absolute; top: 8px; right: 8px; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: rgba(15, 23, 42, 0.85); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); backdrop-filter: blur(4px);">${badgeText}</span>
        `;
        headerEl.insertAdjacentElement('afterend', thumbWrap);
    });

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}
