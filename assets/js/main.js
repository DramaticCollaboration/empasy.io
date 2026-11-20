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

        navContainer.querySelectorAll('a:not(.dropbtn)').forEach(link => {
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
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (window.innerWidth <= 1023) {
                    e.preventDefault();
                    const dropdown = btn.parentElement;
                    navContainer.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('open');
                    });
                    dropdown.classList.toggle('open');
                }
            });
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
            tag: { ko: '통합 관제', en: 'Control Tower', ja: '統合管制' },
            desc: {
                ko: '11가지 전문 AI의 작업 순서를 조율하고 담당자 승인과 보안·예산을 한곳에서 관리합니다.',
                en: 'Coordinates all 11 specialized AI agents, managing step-by-step approvals, security, and budgets in one place.',
                ja: '11種の専門AIの作業順序を調整し、段階別承認とセキュリティ・予算を一元管理します。'
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
                    <div>&nbsp;↳ A2A MessageHub initialized [Agents: SyncBoot, SyncETA, SyncLLM]</div>
                    <div>&nbsp;↳ Dispatching distributed transaction... <span style="color: #22c55e;">[DISPATCHED]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncVerse Guardrail]</div>
                    <div>&nbsp;↳ PII Masked &amp; Redis Semantic Cache HIT (Latency: 12ms) <span style="color: #22c55e;">[SAFE]</span></div>
                    <div>&nbsp;↳ All agent SLAs verified &amp; Audit Trace ID: #trc-9842a <span style="color: #22c55e;">[100% HEALTHY]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncVerse 統合管制]</div>
                    <div>&nbsp;↳ 注文・決済ワークフロー自動化を開始 [連携AI: SyncBoot, SyncETA, SyncLLM]</div>
                    <div>&nbsp;↳ 段階別タスクの自動配分および実行中... <span style="color: #22c55e;">[配信完了]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[セキュリティおよびFinOps保護]</div>
                    <div>&nbsp;↳ 個人情報(PII)自動マスキングおよびセマンティックキャッシュ適用 (応答: 12ms) <span style="color: #22c55e;">[安全]</span></div>
                    <div>&nbsp;↳ 全エージェントSLA検証完了 (監査トレースID: #trc-9842a) <span style="color: #22c55e;">[100% 正常]</span></div>
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
            tag: { ko: '데이터 분석', en: 'Data & Strategy', ja: 'データ分析・戦略' },
            desc: {
                ko: '일상 언어로 질문하면 사내 데이터와 시장 동향을 함께 분석해 최적의 비즈니스 전략을 제안합니다.',
                en: 'Ask questions in plain language to analyze internal data and market trends for optimal business decisions.',
                ja: '日常の言葉で質問するだけで社内データと市場動向を統合分析し、最適な経営戦略を提案します。'
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
                    <div style="color: #38bdf8;">[SyncInsight 分析エンジン]</div>
                    <div>&nbsp;↳ SyncCrawl市場価格動向およびSyncShop売上テレメトリを統合中... <span style="color: #22c55e;">[同期完了]</span></div>
                    <div>&nbsp;↳ 3エージェント討論(成長性・収益率・リスク)シミュレーション完了... <span style="color: #38bdf8;">[予想利益率 +6.8% 改善]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncInsight 実行計画配信]</div>
                    <div>&nbsp;↳ 経営ブリーフィング生成およびSyncShop/SyncCMS向けHITL承認キュー登録 <span style="color: #22c55e;">[準備完了]</span></div>
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
            tag: { ko: 'AI 비용·보안 관리', en: 'AI Cost & Privacy', ja: 'AI費用・情報保護' },
            desc: {
                ko: '민감한 개인정보를 자동으로 가리고, 중복 질문을 재사용해 AI 사용 요금을 40~60% 아껴줍니다.',
                en: 'Automatically masks sensitive personal data and reuses repeated answers to cut AI token costs by 40-60%.',
                ja: '機密・個人情報を自動マスキングし、重複質問の回答再利用でAI利用コストを40〜60%削減します。'
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
                    <div style="color: #38bdf8;">[SyncLLM セキュリティゲートウェイ]</div>
                    <div>&nbsp;↳ PIIガードレール: 外部送信前に機密情報2件(個人番号・連絡先)を自動マスキング <span style="color: #22c55e;">[保護済]</span></div>
                    <div>&nbsp;↳ pgvector セマンティックキャッシュ照会... <span style="color: #38bdf8;">[CACHE HIT: 4,200トークン節約]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncLLM FinOps コスト統制]</div>
                    <div>&nbsp;↳ 部門予算消化率: 41.2% | 今月のコスト削減率: -54.8% <span style="color: #22c55e;">[良好]</span></div>
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
            tag: { ko: '자동 화면 테스트', en: 'Self-Healing UI Testing', ja: '画面自動テスト' },
            desc: {
                ko: '화면 디자인이나 버튼 위치가 바뀌어도 AI가 스스로 찾아 끊김 없이 웹·앱 품질을 테스트합니다.',
                en: 'Visually recognizes buttons even after UI redesigns to run uninterrupted web and app quality tests.',
                ja: '画面デザインやボタン位置が変わってもAIが自ら見つけ出し、中断なくWeb・アプリ品質をテストします。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncETA 자동 테스트]</div>
                    <div>&nbsp;↳ 화면 내 결제 버튼 위치 인식 중... <span style="color: #38bdf8;">[확인 완료: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ 화면 구조 변경 감지: 바뀐 버튼 위치로 테스트 경로 자동 수정... <span style="color: #22c55e;">[성공]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[테스트 결과]</div>
                    <div>&nbsp;↳ 결제 시나리오 및 정상 응답 확인 완료... <span style="color: #22c55e;">[통과 (0.84초)]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncETA Engine]</div>
                    <div>&nbsp;↳ Vision-LLM identifying UI elements... <span style="color: #38bdf8;">[Identified: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ DOM mutation detected: Applying Self-Healing selector... <span style="color: #22c55e;">[Success]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncETA Inspector]</div>
                    <div>&nbsp;↳ E2E checkout scenario &amp; transaction response verified... <span style="color: #22c55e;">[PASS (0.84s)]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncETA Engine]</div>
                    <div>&nbsp;↳ Vision-LLMが画面要素を識別中... <span style="color: #38bdf8;">[識別完了: #btn-pay-submit]</span></div>
                    <div>&nbsp;↳ DOM変更を検知: セレクター自己修復(Self-Healing)を適用... <span style="color: #22c55e;">[成功]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncETA Inspector]</div>
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
            tag: { ko: '백오피스 코어·로우코드', en: 'Back-Office & Low-Code', ja: 'バックオフィス・ローコード' },
            desc: {
                ko: '조직도·직책별 권한, 전자결재, 71종 표준 업무 화면을 기본 제공하고 신규 기능을 빠르게 생성합니다.',
                en: 'Provides built-in org permissions, e-approval, and 71 standard screens while generating new features via low-code.',
                ja: '組織図・役職別権限、電子決裁、71種の標準業務画面を基本搭載し、新機能をローコードで迅速に生成します。'
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
                    <div>&nbsp;↳ Generating Spring Boot 4.0 / Java 25 server API and RBAC scaffolding...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot Verifier]</div>
                    <div>&nbsp;↳ Saga compensation transaction &amp; unit tests generated... <span style="color: #22c55e;">[BUILD SUCCESS]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncBoot バックエンド生成]</div>
                    <div>&nbsp;↳ 決済サービスのDBスキーマおよびエンティティ関連を分析中... <span style="color: #22c55e;">[完了]</span></div>
                    <div>&nbsp;↳ Spring Boot 4.0 / Java 25 サーバーAPIおよびRBACコード自動生成中...</div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncBoot 品質検証]</div>
                    <div>&nbsp;↳ Saga補償トランザクションおよび単体テスト検証完了... <span style="color: #22c55e;">[ビルド成功 (1.2秒)]</span></div>
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
            tag: { ko: '웹 제작·다국어 배포', en: 'Web & Global Publishing', ja: 'Web制作・多言語配信' },
            desc: {
                ko: 'AI 초안 작성부터 광고법·개인정보 안전 검수, 다국어 자동 번역 및 글로벌 사이트 배포를 한 번에 처리합니다.',
                en: 'Automates AI content drafting, compliance inspection, multilingual translation, and multi-site publishing.',
                ja: 'AI下書き作成から広告法・個人情報検閲、多言語自動翻訳およびグローバルサイト配信まで一括処理します。'
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
                    <div style="color: #38bdf8;">[SyncCMS Web自動制作]</div>
                    <div>&nbsp;↳ 新規キャンペーンページのレイアウトおよびSEO最適化コピーを生成</div>
                    <div>&nbsp;↳ 韓国語・英語・日本語など多言語リソースの自動翻訳・同期... <span style="color: #22c55e;">[完了]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCMS マルチサイト配信]</div>
                    <div>&nbsp;↳ 無停止キャッシュ更新およびグローバルサイト同時反映... <span style="color: #22c55e;">[配信完了 (15+ サイト)]</span></div>
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
            tag: { ko: '쇼핑몰 자율 운영', en: 'Autonomous Commerce', ja: 'EC自律運営' },
            desc: {
                ko: '상품 등록·재고 관리부터 목표 수익률을 지키는 가격 조정, 주문·배송 및 타임세일까지 자동화합니다.',
                en: 'Automates product catalogs, margin-safe dynamic pricing, order fulfillment, and flash sale promotions.',
                ja: '商品登録・在庫管理から利益率を守る価格調整、注文・配送追跡およびタイムセールまで自動化します。'
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
                    <div>&nbsp;↳ Indexing 12,400 SKUs into PostgreSQL 18.6 pgvector hybrid search... <span style="color: #22c55e;">[Indexed]</span></div>
                    <div>&nbsp;↳ Competitor price shift detected via SyncCrawl: Adjusting dynamic margin... <span style="color: #38bdf8;">[+4.2% Rev]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncShop OMS/PMS]</div>
                    <div>&nbsp;↳ Distributed order saga &amp; personalized promotion dispatched <span style="color: #22c55e;">[ACTIVE]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncShop 商品・検索最適化]</div>
                    <div>&nbsp;↳ 12,400商品のPostgreSQL 18.6 pgvectorハイブリッド検索インデックス更新... <span style="color: #22c55e;">[完了]</span></div>
                    <div>&nbsp;↳ 競合価格変動を検知: 最適販売価格およびマージンを自動調整... <span style="color: #38bdf8;">[予想売上 +4.2%]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncShop プロモーション配信]</div>
                    <div>&nbsp;↳ 顧客別パーソナライズ推薦およびタイムセール割引を自動適用 <span style="color: #22c55e;">[適用済]</span></div>
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
            tag: { ko: '프로젝트·손익 관리', en: 'Project & Profit Control', ja: '事業損益・要員管理' },
            desc: {
                ko: '프로젝트별 실제 수익률과 인력 투입 일정, 보증보험 만기일·하도급 대금 지급기한을 한눈에 관리합니다.',
                en: 'Tracks real-time project profitability, engineer schedules, surety bond expiries, and subcontract payment deadlines.',
                ja: 'プロジェクト別の実質利益率と要員投入日程、保証証券満期・下請代金支払期限を一目で管理します。'
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
                    <div style="color: #38bdf8;">[SyncOps 損益・PMO分析]</div>
                    <div>&nbsp;↳ 進行中24プロジェクトの契約額対実投入原価ピボット算出... <span style="color: #22c55e;">[平均利益率: 22.4%]</span></div>
                    <div>&nbsp;↳ 月別要員稼働率(M/M)および4大保証保険満期日を点検... <span style="color: #38bdf8;">[異常なし]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncOps 法規コンプライアンス点検]</div>
                    <div>&nbsp;↳ 下請代金60日支払期日および研究ノートSHA-256証跡確認 <span style="color: #22c55e;">[遅延 0件]</span></div>
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
            tag: { ko: '외부 데이터 수집·정제', en: 'Web Data Collection', ja: '外部データ収集・精製' },
            desc: {
                ko: '외부 사이트 구조가 바뀌어도 중단 없이 데이터를 수집하고, 광고와 개인정보를 제거해 깔끔하게 정리합니다.',
                en: 'Continuously collects web data even when site layouts change, stripping ads and personal data into clean documents.',
                ja: '外部サイトの構造が変わっても中断なくデータを収集し、広告や個人情報を除去して綺麗に整理します。'
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
                    <div>&nbsp;↳ Establishing compliant rate-limited session to target domain... <span style="color: #22c55e;">[Success]</span></div>
                    <div>&nbsp;↳ Target DOM layout changed: Auto-inferring semantic selectors... <span style="color: #38bdf8;">[Resolved]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCrawl Pipeline]</div>
                    <div>&nbsp;↳ Structured JSON extracted &amp; Vectorized into RAG Knowledge Base... <span style="color: #22c55e;">[1,420 Items Synced]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncCrawl データ収集]</div>
                    <div>&nbsp;↳ 対象ドメインへの安全なレート制御接続およびポリシー検証... <span style="color: #22c55e;">[成功]</span></div>
                    <div>&nbsp;↳ サイト画面構造の変更を検知: セマンティックセレクターを自動補正... <span style="color: #38bdf8;">[完了]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[SyncCrawl データ精製・RAG反映]</div>
                    <div>&nbsp;↳ 構造化JSON抽出・個人情報マスキングおよび社内知識DB反映完了... <span style="color: #22c55e;">[1,420件 反映]</span></div>
                `
            }
        },
        apim: {
            cmd: {
                ko: 'empasy apim inspect --tokenizer "SqlXssLexicalTokenizer" --defense-pack "sync-watch"',
                en: 'empasy apim inspect --tokenizer "SqlXssLexicalTokenizer" --defense-pack "sync-watch"',
                ja: 'empasy apim inspect --tokenizer "SqlXssLexicalTokenizer" --defense-pack "sync-watch"'
            },
            copyCmd: {
                ko: 'empasy apim inspect --tokenizer "SqlXssLexicalTokenizer" --defense-pack "sync-watch"',
                en: 'empasy apim inspect --tokenizer "SqlXssLexicalTokenizer" --defense-pack "sync-watch"',
                ja: 'empasy apim inspect --tokenizer "SqlXssLexicalTokenizer" --defense-pack "sync-watch"'
            },
            tag: { ko: 'API 보안 게이트웨이', en: 'API Security Gateway', ja: 'APIセキュリティ統制' },
            desc: {
                ko: '관리되지 않는 숨은 API를 찾아내고, 해킹 공격과 개인정보 유출을 실시간으로 차단합니다.',
                en: 'Discovers unmanaged hidden APIs and blocks cyberattacks and personal data leaks in real time.',
                ja: '未管理の隠れたAPIを検出し、サイバー攻撃と個人情報流出をリアルタイムに遮断します。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncAPIM 구문 토큰 지문 분석 · 핀셋 방어]</div>
                    <div>&nbsp;↳ SqlXssLexicalTokenizer 구문 토큰 지문 분석 및 다중 인코딩 우회 탐지... <span style="color: #22c55e;">[지연 0.03ms]</span></div>
                    <div>&nbsp;↳ SyncWatch ApimDefensePack 수신 → SandboxedDefenseEvaluator 핀셋 가상 패치 및 커널 eBPF 차단... <span style="color: #38bdf8;">[방어 완료]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[섀도우 API 진단 및 민감정보 마스킹]</div>
                    <div>&nbsp;↳ 미등록 섀도우 API 차단 및 8대 개인·금융 민감정보 실시간 마스킹 <span style="color: #22c55e;">[100% 안전]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncAPIM Lexical Fingerprint &amp; Pinpoint Defense]</div>
                    <div>&nbsp;↳ SqlXssLexicalTokenizer grammar fingerprint inspection across API traffic... <span style="color: #22c55e;">[0.03ms Latency]</span></div>
                    <div>&nbsp;↳ SyncWatch ApimDefensePack hot-swapped via SandboxedDefenseEvaluator + Kernel eBPF block... <span style="color: #38bdf8;">[Protected]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[Shadow API &amp; PII Masking]</div>
                    <div>&nbsp;↳ Shadow API blocked &amp; 8 sensitive PII patterns masked in real time <span style="color: #22c55e;">[100% SECURE]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncAPIM 構文指紋分析・ピンセット仮想パッチ]</div>
                    <div>&nbsp;↳ SqlXssLexicalTokenizer 構文トークン指紋検査および多重エンコード回避検知... <span style="color: #22c55e;">[0.03ms 遅延]</span></div>
                    <div>&nbsp;↳ SyncWatch ApimDefensePack 受信 → SandboxedDefenseEvaluator 仮想パッチ + カーネルeBPF遮断... <span style="color: #38bdf8;">[防御完了]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[シャドーAPI診断・PIIマスキング]</div>
                    <div>&nbsp;↳ 未登録シャドーAPI遮断および8大機密情報のリアルタイムマスキング完了 <span style="color: #22c55e;">[100% 安全]</span></div>
                `
            }
        },
        watch: {
            cmd: {
                ko: 'empasy watch compile --feeds "nvd,cisa-kev,osv,ghsa,kisa" --broadcast "verse,apim"',
                en: 'empasy watch compile --feeds "nvd,cisa-kev,osv,ghsa,kisa" --broadcast "verse,apim"',
                ja: 'empasy watch compile --feeds "nvd,cisa-kev,osv,ghsa,kisa" --broadcast "verse,apim"'
            },
            copyCmd: {
                ko: 'empasy watch compile --feeds "nvd,cisa-kev,osv,ghsa,kisa" --broadcast "verse,apim"',
                en: 'empasy watch compile --feeds "nvd,cisa-kev,osv,ghsa,kisa" --broadcast "verse,apim"',
                ja: 'empasy watch compile --feeds "nvd,cisa-kev,osv,ghsa,kisa" --broadcast "verse,apim"'
            },
            tag: { ko: '보안 위협 관측·방어', en: 'Threat Watch & Defense', ja: '脅威観測・自動防御' },
            desc: {
                ko: '전 세계 신규 보안 취약점을 24시간 수집해 우리 회사 영향도를 진단하고 방어 규칙을 자동 배포합니다.',
                en: 'Monitors global security vulnerabilities 24/7, checks company impact, and automatically deploys defense rules.',
                ja: '世界の最新セキュリティ脆弱性を24時間収集し、自社影響度の診断と防御ルールの自動配信を行います。'
            },
            output: {
                ko: `
                    <div style="color: #38bdf8;">[SyncWatch 글로벌 위협 수집 허브]</div>
                    <div>&nbsp;↳ NVD CVE · CISA KEV · OSV.dev · GitHub GHSA · KISA 보안 권고 동기화 (5단계 SSRF 가드)... <span style="color: #22c55e;">[정규화 완료]</span></div>
                    <div>&nbsp;↳ WatchRuleCompilerService 듀얼 컴파일: VerseAuditPack(SCA/SAST/DAST) + ApimDefensePack(구문 지문·SpEL)... <span style="color: #38bdf8;">[TP 100% / FP 0%]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[3각 자율 DevSecOps 실시간 배포]</div>
                    <div>&nbsp;↳ SyncVerse 코드 보안 감사 및 SyncAPIM 런타임 핀셋 가상 패치 동시 브로드캐스트 완료 <span style="color: #22c55e;">[전파됨]</span></div>
                `,
                en: `
                    <div style="color: #38bdf8;">[SyncWatch Threat Intelligence Hub]</div>
                    <div>&nbsp;↳ Ingested NVD CVE, CISA KEV, OSV.dev, GitHub GHSA, KISA feeds via 5-Stage SSRF Guard... <span style="color: #22c55e;">[Normalized]</span></div>
                    <div>&nbsp;↳ Dual Rule Compilation: VerseAuditPack (SCA/SAST/DAST) + ApimDefensePack (Lexical/SpEL) sandbox verified... <span style="color: #38bdf8;">[TP 100% / FP 0%]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[Triad DevSecOps Broadcast]</div>
                    <div>&nbsp;↳ Dispatched to SyncVerse (Shift-Left PR Patch) &amp; SyncAPIM (Shift-Right Virtual Patch) <span style="color: #22c55e;">[DISPATCHED]</span></div>
                `,
                ja: `
                    <div style="color: #38bdf8;">[SyncWatch 脅威インテリジェンスハブ]</div>
                    <div>&nbsp;↳ NVD CVE・CISA KEV・OSV.dev・GitHub GHSA・KISA 脅威フィード収集 (5段階SSRFガード)... <span style="color: #22c55e;">[正規化完了]</span></div>
                    <div>&nbsp;↳ デュアルルールコンパイル: VerseAuditPack + ApimDefensePack サンドボックス検証通過... <span style="color: #38bdf8;">[TP 100% / FP 0%]</span></div>
                    <div style="margin-top: 0.8rem; color: #a78bfa;">[3角自律DevSecOpsリアルタイム配信]</div>
                    <div>&nbsp;↳ SyncVerse(コード監査・自動パッチPR)およびSyncAPIM(ランタイム仮想パッチ)へ同時配信完了 <span style="color: #22c55e;">[配信済]</span></div>
                `
            }
        }
    };

    const agentVisualMeta = {
        verse: {
            slug: 'sync-verse',
            screenUrl: '/images/screenshots/sync-verse/screen_01.png',
            caption: {
                ko: 'SyncVerse 통합 관제 화면 — 11대 AI 가동 상태·단계별 승인·보안 통합 대시보드',
                en: 'SyncVerse Live Console — 11-Agent Status, Step-by-Step Approval & Security Dashboard',
                ja: 'SyncVerse 実画面 — 11種AIの稼働状態・段階別承認・セキュリティ統合ダッシュボード'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 통합 관제 대시보드', en: '1. Control Dashboard', ja: '1. 統合管制ダッシュボード' },
                    caption: {
                        ko: '전사 AI 가동 상태 · 실시간 작업 흐름 · 승인 대기 현황을 한눈에 확인',
                        en: 'Monitor all AI agents, live activity streams, and pending approvals at a glance',
                        ja: '全社AIの稼働状態・リアルタイム作業フロー・承認待ち状況を一目で確認'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. AI 작업 진행 목록', en: '2. AI Task Progress', ja: '2. AI作業進行一覧' },
                    caption: {
                        ko: '요구사항 분석부터 코드 작성 · 자동 품질 검증까지의 진행 현황',
                        en: 'Track progress from requirement analysis to automated coding and quality checks',
                        ja: '要件分析からコード作成・自動品質検証までの進行状況'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 웹 품질 · 검색 진단', en: '3. Web Quality Audit', ja: '3. Web品質・検索診断' },
                    caption: {
                        ko: '전사 웹사이트의 검색 노출 · AI 답변 최적화 · 성능 점수 현황판',
                        en: 'Company-wide website search visibility, AI answer readiness, and performance scores',
                        ja: '全社Webサイトの検索露出・AI回答最適化・性能スコア状況板'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 직책별 승인 · 원클릭 복구', en: '4. Role Approval & Instant Rollback', ja: '4. 役職別承認・ワンクリック復旧' },
                    caption: {
                        ko: '4단계 담당자 결재 대기함과 문제 발생 시 이전 상태 즉시 복구',
                        en: '4-stage manager approval queue and one-click recovery to a safe snapshot',
                        ja: '4段階の担当者決裁待機箱および問題発生時の即時ロールバック制御'
                    }
                }
            ]
        },
        insight: {
            slug: 'sync-insight',
            screenUrl: '/images/screenshots/sync-insight/screen_01.png',
            caption: {
                ko: 'SyncInsight 데이터 분석 화면 — 일상 언어 데이터 조회 및 경영 전략 시뮬레이션',
                en: 'SyncInsight Live Console — Plain-Language Data Inquiry & Strategy Simulation',
                ja: 'SyncInsight 実画面 — 自然言語でのデータ照会および経営戦略シミュレーション'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 일상 언어 데이터 질문', en: '1. Plain-Language Data Search', ja: '1. 自然言語データ質問' },
                    caption: {
                        ko: '한국어로 질문하면 안전한 읽기 전용 데이터 조회와 표·차트로 즉시 변환',
                        en: 'Ask in plain language to instantly get safe read-only data tables and charts',
                        ja: '日常語で質問すると安全な読み取り専用データ照会と表・チャートへ即時変換'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 심층 원인 분석 보고서', en: '2. Deep Root-Cause Report', ja: '2. 深層原因分析レポート' },
                    caption: {
                        ko: '전사 매출·거래 내역과 시스템 지연 원인을 교차 분석한 요약 리포트',
                        en: 'Cross-analyzed executive summary of transaction trends and system bottlenecks',
                        ja: '全社取引履歴とシステム遅延原因を交差分析した要約レポート'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 분석 대상 DB 안전 연결', en: '3. Safe Database Connections', ja: '3. 分析対象DB安全接続' },
                    caption: {
                        ko: '사내 데이터베이스 다중 연결 및 원본 데이터 훼손 방지 읽기 전용 보호',
                        en: 'Connect multiple internal databases with strict read-only data protection',
                        ja: '社内データベース多重接続および原本保護のための読み取り専用ガード'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 화면-서버-DB 영향도 추적', en: '4. End-to-End Impact Tracking', ja: '4. 画面・サーバー・DB影響度追跡' },
                    caption: {
                        ko: '화면부터 서버 API · 데이터베이스까지 변경 시 영향을 받는 범위를 한눈에 파악',
                        en: 'Trace how a change affects screens, APIs, services, and database tables',
                        ja: '画面からAPI・DBテーブルまで変更時の影響範囲を一目で把握'
                    }
                }
            ]
        },
        llm: {
            slug: 'sync-llm',
            screenUrl: '/images/screenshots/sync-llm/screen_01.png',
            caption: {
                ko: 'SyncLLM 비용·보안 화면 — AI 모델 자동 배분, 요금 절감 및 개인정보 보호 대시보드',
                en: 'SyncLLM Live Console — Smart Model Routing, Cost Savings & Privacy Protection',
                ja: 'SyncLLM 実画面 — AIモデル自動振り分け・利用料金削減・個人情報保護ダッシュボード'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. AI 비용 · 사용량 현황판', en: '1. Cost & Usage Dashboard', ja: '1. AI費用・使用量状況板' },
                    caption: {
                        ko: '월간 AI 호출 건수 · 부서별 예산 사용률 및 장애 시 우회 처리 내역',
                        en: 'Monthly AI call volume, department budget usage, and automatic failover logs',
                        ja: '月間AI呼出件数・部門別予算使用率および障害時の自動切替履歴'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 다중 AI 모델 통합 연결', en: '2. Multi-AI Model Connections', ja: '2. マルチAIモデル統合接続' },
                    caption: {
                        ko: 'OpenAI · Claude · Gemini · 사내 구축형 AI 연결 및 암호화 키 안전 보관',
                        en: 'Connect OpenAI, Claude, Gemini, and private models with encrypted key storage',
                        ja: 'OpenAI・Claude・Gemini・社内AIの連携および暗号化キー安全保管'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 모델별 요금 · 자동 배분', en: '3. Model Pricing & Smart Routing', ja: '3. モデル別料金・自動振り分け' },
                    caption: {
                        ko: '질문 난이도에 맞춰 가성비 높은 AI 모델로 자동 연결하는 요금 최적화',
                        en: 'Automatically route queries to the most cost-effective AI model by complexity',
                        ja: '質問の難易度に合わせて最適なAIモデルへ自動接続するコスト最適化'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 부서별 사용 기록 · 절감 내역', en: '4. Department Usage & Savings Log', ja: '4. 部門別利用記録・削減内訳' },
                    caption: {
                        ko: '부서·사용자별 AI 질문 내역과 중복 답변 재사용으로 절약한 비용 확인',
                        en: 'Audit AI queries by team and track costs saved through answer caching',
                        ja: '部門・ユーザー別の利用履歴と回答キャッシュで節約したコストを確認'
                    }
                }
            ]
        },
        apim: {
            slug: 'sync-apim',
            screenUrl: '/images/screenshots/sync-apim/screen_01.png',
            caption: {
                ko: 'SyncAPIM 보안 관제 화면 — 숨은 API 자동 탐지, 해킹 공격 실시간 차단 및 개인정보 보호',
                en: 'SyncAPIM Live Console — Hidden API Discovery, Real-Time Attack Blocking & Data Masking',
                ja: 'SyncAPIM 実画面 — 隠れたAPIの自動検出・サイバー攻撃のリアルタイム遮断・個人情報保護'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. API 보안 통합 현황판', en: '1. API Security Dashboard', ja: '1. APIセキュリティ統合状況板' },
                    caption: {
                        ko: '전체 API 소통량 · 보안 점검 점수 · 실시간 공격 차단 추이를 한눈에 확인',
                        en: 'Real-time API traffic volume, security health scores, and blocked attack trends',
                        ja: '全API通信量・セキュリティ点検スコア・リアルタイム攻撃遮断推移を一目で確認'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 전체 API 목록 · 숨은 API 탐지', en: '2. API Inventory & Hidden APIs', ja: '2. 全API一覧・未登録API検出' },
                    caption: {
                        ko: '실제 통신을 분석해 문서에 없는 미등록 API를 찾아내고 위험도를 진단',
                        en: 'Automatically discover undocumented APIs from live traffic and score their risk',
                        ja: '通信トラフィックから仕様書外の未登録APIを自動検出し危険度を診断'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 해킹 공격 실시간 차단', en: '3. Real-Time Attack Blocking', ja: '3. サイバー攻撃リアルタイム遮断' },
                    caption: {
                        ko: '변형된 해킹 시도와 AI 악용 공격을 0.03밀리초 내에 차단하고 개인정보를 가림 처리',
                        en: 'Block disguised injection attacks in 0.03ms and automatically mask sensitive data',
                        ja: '巧妙化した攻撃やAI悪用を0.03ミリ秒で遮断し個人情報を自動マスキング'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 업무별 맞춤형 보호 규칙', en: '4. Custom Protection Policies', ja: '4. 業務別カスタム保護ルール' },
                    caption: {
                        ko: '인증 위변조 방지 · 결제 보호 · AI 프롬프트 방화벽 · 미등록 API 격리 설정',
                        en: 'Configure token integrity, payment protection, AI firewall, and API quarantine rules',
                        ja: '認証改ざん防止・決済保護・AIプロンプト防御・未登録API隔離設定'
                    }
                }
            ]
        },
        watch: {
            slug: 'sync-watch',
            screenUrl: '/images/screenshots/sync-watch/screen_01.png',
            caption: {
                ko: 'SyncWatch 위협 관제 화면 — 글로벌 보안 취약점 수집, 사내 영향도 진단 및 방어 규칙 자동 배포',
                en: 'SyncWatch Live Console — Global Vulnerability Monitoring, Impact Analysis & Auto-Defense',
                ja: 'SyncWatch 実画面 — グローバル脆弱性収集・社内影響度診断および防御ルール自動配信'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 보안 위협 관측 대시보드', en: '1. Threat Monitoring Dashboard', ja: '1. セキュリティ脅威観測ダッシュボード' },
                    caption: {
                        ko: '8대 국내외 보안 기관의 최신 취약점 수집 현황과 방어 규칙 배포 상태',
                        en: 'Live feed status across 8 global security agencies and automated defense deployment',
                        ja: '8大国内外セキュリティ機関の最新脆弱性収集状況と防御ルール配信ステータス'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 국내외 위협 수집 채널', en: '2. Official Security Feed Channels', ja: '2. 国内外セキュリティ収集チャネル' },
                    caption: {
                        ko: '미국 CISA · NVD · 한국 KISA 등 공식 보안 정보원 연결 상태와 수집 주기 관리',
                        en: 'Manage connection health and collection schedules for CISA, NVD, OSV, and KISA feeds',
                        ja: 'CISA・NVD・OSV・KISAなど公式セキュリティ情報源の接続状態と収集周期管理'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 보안 취약점 · 사내 영향도', en: '3. Vulnerability & Impact Check', ja: '3. 脆弱性警報・社内影響度照合' },
                    caption: {
                        ko: '새로 발표된 보안 경보가 우리 회사 시스템에 영향을 주는지 즉시 대조',
                        en: 'Instantly match newly disclosed security alerts against your company software assets',
                        ja: '新たに公開されたセキュリティ警報が自社システムに影響するか即座に照合'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 방어 규칙 자동 생성 · 배포', en: '4. Auto-Generated Defense Rules', ja: '4. 防御ルール自動生成・一括配信' },
                    caption: {
                        ko: '서버 재시작 없이 개발 코드 점검 규칙과 API 차단 규칙을 전사에 동시 적용',
                        en: 'Deploy code inspection rules and live API blocking policies without server restarts',
                        ja: 'サーバー再起動なしでコード点検ルールとAPI遮断ルールを全社へ同時適用'
                    }
                }
            ]
        },
        boot: {
            slug: 'sync-boot',
            screenUrl: '/images/screenshots/sync-boot/screen_01.png',
            caption: {
                ko: 'SyncBoot 실제 관리 화면 — 기업 표준 백오피스, 직책별 권한 관리 및 전자결재 플랫폼',
                en: 'SyncBoot Live Console — Enterprise Back-Office Core, Role Permissions & E-Approval Platform',
                ja: 'SyncBoot 実画面 — 企業標準バックオフィス・役職別権限管理・電子決裁プラットフォーム'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 백오피스 경영 리포트', en: '1. Executive Management Report', ja: '1. バックオフィス経営レポート' },
                    caption: {
                        ko: '부서별 예산 집행 현황 · 자동화 비용 절감액 · 결재 처리 속도 통합 리포트',
                        en: 'Department budget execution, automation cost savings, and approval turnaround metrics',
                        ja: '部門別予算執行状況・自動化コスト削減額・決裁処理速度の統合レポート'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 조직 · 직책별 권한 관리', en: '2. Org & Role Permission Control', ja: '2. 組織・役職別権限管理' },
                    caption: {
                        ko: '부서 조직도와 연동된 임직원 계정 및 직책별 메뉴·버튼 접근 권한 설정',
                        en: 'Manage employee accounts linked to org charts with granular menu and button permissions',
                        ja: '組織図と連動した社員アカウントおよび役職別メニュー・ボタン権限設定'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 다단계 전자결재 문서함', en: '3. Multi-Stage Electronic Approval', ja: '3. 多段階電子決裁ドキュメント箱' },
                    caption: {
                        ko: '기안부터 검토 · 합의 · 최종 승인까지 한국 기업형 전자결재 진행 및 품의 관리',
                        en: 'Track enterprise requisitions from drafting and review to consensus and final sign-off',
                        ja: '起案から検討・合議・最終承認まで企業標準の電子決裁進行および稟議管理'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 실시간 시스템 감사 기록', en: '4. Real-Time System Audit Log', ja: '4. リアルタイムシステム監査記録' },
                    caption: {
                        ko: '권한 변경 · 결재 승인 · 정기 자동 작업 등 모든 시스템 활동 기록을 투명하게 추적',
                        en: 'Transparently track permission updates, approval sign-offs, and scheduled background jobs',
                        ja: '権限変更・決裁承認・定期自動バッチなど全システム活動履歴を透明に追跡'
                    }
                }
            ]
        },
        cms: {
            slug: 'sync-cms',
            screenUrl: '/images/screenshots/sync-cms/screen_01.png',
            caption: {
                ko: 'SyncCMS 실제 운영 화면 — 멀티사이트 콘텐츠 관리, 안전 검수 및 다국어 자동 번역',
                en: 'SyncCMS Live Console — Multi-Site Content Management, Safety Audit & AI Translation',
                ja: 'SyncCMS 実画面 — マルチサイトコンテンツ管理・安全検閲および多言語自動翻訳'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 멀티사이트 운영 현황판', en: '1. Multi-Site Operations Dashboard', ja: '1. マルチサイト運営状況板' },
                    caption: {
                        ko: '전체 회원 · 게시글 · 방문자 추이와 다국어 사이트별 콘텐츠 현황을 한눈에 확인',
                        en: 'Monitor member growth, content volume, visitor trends, and multi-region portals',
                        ja: '全会員・記事数・訪問者推移および多言語サイト別コンテンツ状況を一目で確認'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 게시글 · AI 초안 관리', en: '2. Content & AI Draft Management', ja: '2. 記事・AI下書き管理' },
                    caption: {
                        ko: '카테고리별 콘텐츠 분류, AI 초안 자동 작성 및 단계별 발행 승인 관리',
                        en: 'Organize category trees, generate AI article drafts, and manage staged publishing approvals',
                        ja: 'カテゴリ別コンテンツ分類、AI下書き自動作成および段階別公開承認管理'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 발행 전 콘텐츠 안전 검수', en: '3. Pre-Publish Safety Inspection', ja: '3. 公開前コンテンツ安全検閲' },
                    caption: {
                        ko: '본문 · 첨부파일 · 댓글 내 개인정보 노출과 표시광고법 위반 문구를 사전 점검',
                        en: 'Automatically scan articles and attachments for privacy leaks and regulatory banned terms',
                        ja: '本文・添付ファイル・コメント内の個人情報露出や広告規制違反表現を事前点検'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 다국어 AI 자동 번역', en: '4. Brand-Aligned AI Translation', ja: '4. 多言語AI自動翻訳' },
                    caption: {
                        ko: '브랜드 고유 용어를 유지하며 영·일·중·독·스페인어로 번역하고 원문과 나란히 비교',
                        en: 'Translate into EN, JA, ZH, DE, and ES with brand glossary consistency and side-by-side preview',
                        ja: 'ブランド固有用語を維持した英・日・中・独・西語翻訳と原文・訳文の並列比較'
                    }
                }
            ]
        },
        shop: {
            slug: 'sync-shop',
            screenUrl: '/images/screenshots/sync-shop/screen_01.png',
            caption: {
                ko: 'SyncShop 실제 커머스 화면 — 상품·재고 관리, 마진 보호 가격 최적화 및 통합 주문 대시보드',
                en: 'SyncShop Live Console — Catalog & Inventory, Margin-Safe Pricing & Unified Order Management',
                ja: 'SyncShop 実画面 — 商品・在庫管理、利益率保護プライシングおよび統合注文ダッシュボード'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 쇼핑몰 매출 · 운영 현황판', en: '1. Store Revenue & Ops Dashboard', ja: '1. ショップ売上・運営状況板' },
                    caption: {
                        ko: '배송 · 반품 · 고객 문의 실시간 지표와 일별 매출·카테고리별 판매 비중 분석',
                        en: 'Real-time shipping, return, and inquiry metrics alongside daily sales and category share',
                        ja: '配送・返品・顧客問合せ指標および日別売上・カテゴリ別販売比率の分析'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 상품 카탈로그 · 재고 관리', en: '2. Product Catalog & Inventory', ja: '2. 商品カタログ・在庫管理' },
                    caption: {
                        ko: '수만 개 상품 정보와 옵션별 실시간 재고, 최소 마진을 보장하는 판매가 관리',
                        en: 'Manage multi-store catalogs, live SKU inventory, and minimum-margin protected prices',
                        ja: 'マルチストア商品カタログ・リアルタイム在庫および最低利益率を守る販売価格管理'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 통합 주문 · 배송 추적', en: '3. Unified Order & Delivery Tracking', ja: '3. 統合注文・配送追跡' },
                    caption: {
                        ko: '결제 완료부터 출고 지시 · 배송 완료까지 전 과정의 주문 상태를 한곳에서 관리',
                        en: 'Track every order from payment confirmation to warehouse dispatch and delivery',
                        ja: '決済完了から出庫指示・配送完了まで全過程の注文ステータスを一元管理'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 타임세일 · 프로모션 관리', en: '4. Flash Sales & Promotions', ja: '4. タイムセール・販促管理' },
                    caption: {
                        ko: '시즌별 특가 행사 일정 설정과 AI 추천 할인 상품 구성을 클릭 한 번으로 적용',
                        en: 'Schedule seasonal flash deals and launch AI-recommended discount campaigns in one click',
                        ja: 'シーズン別特売イベントの日程設定とAI推薦割引キャンペーンをワンクリック適用'
                    }
                }
            ]
        },
        ops: {
            slug: 'sync-ops',
            screenUrl: '/images/screenshots/sync-ops/screen_01.png',
            caption: {
                ko: 'SyncOps 실제 경영 화면 — 프로젝트별 실시간 손익, 인력 투입 일정 및 하도급·보증 기한 관리',
                en: 'SyncOps Live Console — Real-Time Project Profitability, Staffing Schedule & Legal Compliance',
                ja: 'SyncOps 実画面 — プロジェクト別リアルタイム損益・要員投入日程および下請・保証期限管理'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 전사 프로젝트 경영 현황판', en: '1. Executive Project Dashboard', ja: '1. 全社プロジェクト経営状況板' },
                    caption: {
                        ko: '전사 인력 가동률 · 영업이익 · 대기 인력 · 미수금 총액 및 위험 프로젝트 경보',
                        en: 'Company-wide utilization, operating profit, available staff, unpaid receivables, and risk alerts',
                        ja: '全社稼働率・営業利益・待機要員・未収金総額およびリスクプロジェクト警報'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 인원 · 프로젝트 · 분기별 손익표', en: '2. Multi-View Profit & Loss Table', ja: '2. 要員・案件・四半期別損益表' },
                    caption: {
                        ko: '계약 금액 대비 실제 투입 원가를 계산해 프로젝트별·분기별(1Q~4Q) 순이익을 비교',
                        en: 'Compare contract revenue against actual labor costs by person, project, and quarter',
                        ja: '契約金額に対する実投入原価を算出し、案件別・四半期別(1Q〜4Q)の純利益を比較'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 하도급 지급기한 · 보증보험 점검', en: '3. Subcontract & Surety Deadline Guard', ja: '3. 下請支払期限・保証証券点検' },
                    caption: {
                        ko: '하도급 대금 60일 지급 마감일(D-Day) 알림과 4대 보증증권 만기일 사전 점검',
                        en: 'Monitor 60-day subcontract payment deadlines (D-Day) and 4 major surety bond expiration dates',
                        ja: '下請代金60日支払期限(D-Day)アラートおよび4大保証証券の満期日事前点検'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 엔지니어 투입 일정 · 단가 관리', en: '4. Staffing Schedule & Margin Matrix', ja: '4. 技術者投入日程・単価管理' },
                    caption: {
                        ko: '기술등급별 인력 투입 기간과 청구 단가 대비 실제 원가·순익을 한눈에 관리',
                        en: 'Manage engineer assignment timelines, billing rates vs. actual costs, and net contribution',
                        ja: '技術等級別の要員投入期間および請求単価対実原価・純利益を一目で管理'
                    }
                }
            ]
        },
        eta: {
            slug: 'sync-eta',
            screenUrl: '/images/screenshots/sync-eta/screen_01.png',
            caption: {
                ko: 'SyncETA 실제 테스트 화면 — 화면 개편에도 멈추지 않는 자동 복구 테스트 및 배포 전후 비교',
                en: 'SyncETA Live Studio — Uninterrupted Self-Healing UI Testing & Pre/Post-Deploy Visual Comparison',
                ja: 'SyncETA 実画面 — UI改修でも止まらない自動復旧テストおよびリリース前後の画面比較'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 자동 품질 검증 현황판', en: '1. Automated Quality Dashboard', ja: '1. 自動品質検証ダッシュボード' },
                    caption: {
                        ko: '전체 테스트 시나리오 통과율 · 4단계 품질 점검 현황 및 AI 비용 절감 지표',
                        en: 'Overall scenario pass rate, 4-stage quality pipeline health, and token cost savings',
                        ja: '全テストシナリオ通過率・4段階品質点検状況およびAIコスト削減指標'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 바뀐 버튼 자동 찾기 (자동 복구)', en: '2. Automatic Button Recovery', ja: '2. 変更ボタンの自動検出・復旧' },
                    caption: {
                        ko: '화면 개편으로 위치나 이름이 바뀐 버튼을 AI가 스스로 찾아 복구한 내역과 정확도',
                        en: 'See how AI locates and heals moved or renamed UI buttons after screen updates',
                        ja: '画面改修で位置や名前が変わったボタンをAIが自動特定・復旧した履歴と精度'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 배포 전후 화면 깨짐 비교', en: '3. Pre/Post-Update Screen Comparison', ja: '3. リリース前後の画面崩れ比較' },
                    caption: {
                        ko: 'PC · 모바일 화면에서 업데이트 전후 레이아웃이 어긋난 곳을 빨간색으로 자동 표시',
                        en: 'Automatically highlight visual layout shifts across desktop and mobile screens before release',
                        ja: 'PC・モバイル画面で更新前後のレイアウトずれ箇所を自動で視覚ハイライト'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 서비스별 테스트 실행 기록', en: '4. Service Test Execution History', ja: '4. サービス別テスト実行履歴' },
                    caption: {
                        ko: '주요 업무 시나리오별 성공률과 오류 발생 시점의 화면 캡처 증적 조회',
                        en: 'Review pass rates by business flow with step-by-step screenshot evidence',
                        ja: '主要業務シナリオ別の成功率とエラー発生時点の画面キャプチャ証跡照会'
                    }
                }
            ]
        },
        crawl: {
            slug: 'sync-crawl',
            screenUrl: '/images/screenshots/sync-crawl/screen_01.png',
            caption: {
                ko: 'SyncCrawl 실제 수집 화면 — 사이트 개편 자동 대응 데이터 수집 및 개인정보 가림 정제',
                en: 'SyncCrawl Live Console — Layout-Adaptive Web Collection & Privacy-Safe Document Cleaning',
                ja: 'SyncCrawl 実画面 — サイト改修に自動対応するデータ収集および個人情報マスキング精製'
            },
            screens: [
                {
                    idx: 1,
                    tab: { ko: '1. 데이터 수집 현황 대시보드', en: '1. Data Collection Dashboard', ja: '1. データ収集状況ダッシュボード' },
                    caption: {
                        ko: '수집 대상 사이트 연결 상태 · 일일 수집 건수 · 성공률 및 자동 복구 현황',
                        en: 'Target site health, daily collection volume, success rates, and auto-recovery status',
                        ja: '収集対象サイトの接続状態・日次収集件数・成功率および自動復旧状況'
                    }
                },
                {
                    idx: 2,
                    tab: { ko: '2. 수집 대상 사이트 · 주기 설정', en: '2. Target Websites & Schedules', ja: '2. 収集対象サイト・周期設定' },
                    caption: {
                        ko: '수집할 웹사이트 주소 등록과 로그인 방식, 정기 수집 시간표(매일/매시간) 관리',
                        en: 'Register target URLs, configure login profiles, and set hourly or daily collection schedules',
                        ja: '収集するWebサイトURL登録、ログイン方式および定期収集スケジュール管理'
                    }
                },
                {
                    idx: 3,
                    tab: { ko: '3. 본문 정제 · 개인정보 가림', en: '3. Clean Text & Privacy Masking', ja: '3. 本文抽出・個人情報マスキング' },
                    caption: {
                        ko: '불필요한 광고 메뉴를 걷어내고 본문만 깔끔하게 추출하며 개인정보를 안전하게 가림 처리',
                        en: 'Strip ads and navigation clutter into clean documents while masking personal information',
                        ja: '不要な広告やメニューを除去して本文のみを抽出し、個人情報を安全にマスキング'
                    }
                },
                {
                    idx: 4,
                    tab: { ko: '4. 안전한 수집 속도 · 규정 준수', en: '4. Safe Speed & Policy Compliance', ja: '4. 安全な収集速度・規約遵守' },
                    caption: {
                        ko: '대상 사이트의 수집 허용 규칙(robots.txt)을 지키고 과부하를 막는 접속 속도 제어',
                        en: 'Enforce robots.txt rules and polite request intervals to prevent server overload or blocks',
                        ja: '対象サイトの収集規約(robots.txt)を遵守し負荷を防ぐリクエスト速度制御'
                    }
                }
            ]
        }
    };

    if (terminalTabs.length > 0) {
        // Hide noisy CLI copy button and raw console output box so visual screen preview is the centerpiece
        if (terminalCopyBtn) {
            terminalCopyBtn.style.display = 'none';
        }
        if (terminalInput && terminalInput.parentElement && terminalInput.parentElement.parentElement) {
            terminalInput.parentElement.parentElement.style.display = 'none';
        }

        const detailBtnLabel = langKey === 'en'
            ? 'View Solution Details &rarr;'
            : (langKey === 'ja' ? '詳細を見る &rarr;' : '이 솔루션 자세히 보기 &rarr;');

        // Ensure Visual Screen Preview Banner exists inside .interactive-terminal
        let screenPreviewBox = document.querySelector('.terminal-screen-preview');
        if (!screenPreviewBox && terminalRoleBanner && terminalRoleBanner.parentElement) {
            screenPreviewBox = document.createElement('div');
            screenPreviewBox.className = 'terminal-screen-preview';
            screenPreviewBox.style.cssText = 'padding: 1.25rem 1.5rem 1.5rem; background: rgba(15, 23, 42, 0.95); display: flex; flex-direction: column; gap: 0.9rem;';
            const initMeta = agentVisualMeta.verse;
            const badgeLabel = langKey === 'en' ? 'LIVE PRODUCT SCREEN' : (langKey === 'ja' ? '実際の稼働画面' : '실제 제품 구동 화면');
            screenPreviewBox.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.6rem; min-width: 0; flex-wrap: wrap;">
                        <span style="font-size: 0.74rem; font-weight: 700; padding: 0.22rem 0.65rem; border-radius: 999px; background: rgba(56, 189, 248, 0.16); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); white-space: nowrap;"><i class="fas fa-desktop" style="margin-right: 5px;"></i>${badgeLabel}</span>
                        <span class="terminal-screen-caption" style="font-size: 0.92rem; color: #f8fafc; font-weight: 600;">${initMeta.caption[langKey] || initMeta.caption.ko}</span>
                    </div>
                    <a class="terminal-detail-link" href="/${langKey}/solutions/${initMeta.slug}.html" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 0.95rem; border-radius: 8px; background: rgba(56, 189, 248, 0.18); border: 1px solid rgba(56, 189, 248, 0.45); color: #38bdf8; font-size: 0.85rem; font-weight: 700; text-decoration: none; white-space: nowrap; transition: all 0.2s ease;">
                        ${detailBtnLabel}
                    </a>
                </div>
                <div class="terminal-screen-img-wrap" style="display: block; border-radius: 10px; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.28); background: #020617; max-height: 480px; position: relative; box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);">
                    <img class="terminal-screen-img" src="${initMeta.screenUrl}" alt="${initMeta.caption[langKey] || initMeta.caption.ko}" loading="eager" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block; transition: opacity 0.2s ease;" />
                </div>
            `;
            terminalRoleBanner.insertAdjacentElement('afterend', screenPreviewBox);
        }

        // Initialize ARIA accessibility attributes
        const tabList = terminalTabs[0].parentElement;
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
            tabList.setAttribute('aria-label', 'Solution Live Screen Preview Switcher');
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

                if (typeof tab.scrollIntoView === 'function') {
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }

                const agentKey = tab.getAttribute('data-agent');
                const data = agentTerminalData[agentKey] || agentTerminalData.verse;

                if (terminalRoleBanner) {
                    const tagEl = terminalRoleBanner.querySelector('.terminal-role-tag');
                    const textEl = terminalRoleBanner.querySelector('.terminal-role-text');
                    if (tagEl && data.tag) tagEl.innerText = data.tag[langKey] || data.tag.ko;
                    if (textEl && data.desc) textEl.innerText = data.desc[langKey] || data.desc.ko;
                }

                const vMeta = agentVisualMeta[agentKey] || agentVisualMeta.verse;
                if (screenPreviewBox && vMeta) {
                    const capEl = screenPreviewBox.querySelector('.terminal-screen-caption');
                    const imgEl = screenPreviewBox.querySelector('.terminal-screen-img');
                    const linkEl = screenPreviewBox.querySelector('.terminal-detail-link');
                    const capText = (vMeta.caption && (vMeta.caption[langKey] || vMeta.caption.ko)) || '';
                    if (capEl) capEl.innerText = capText;
                    if (linkEl) linkEl.href = `/${langKey}/solutions/${vMeta.slug}.html`;
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
    const solMatch = (window.location.pathname || '').match(/\/solutions\/(sync-(?:verse|insight|llm|apim|watch|boot|cms|shop|ops|eta|crawl))\.html/i);
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
                ? 'Explore the 4 real enterprise web console screens and toggle the annotated feature guide.'
                : (langKey === 'ja'
                    ? '4つの実際の管理コンソール画面と主要機能ガイドオーバーレイをご確認いただけます。'
                    : '로그인 없이 4가지 실제 관리자 콘솔 핵심 화면과 기능 포인트 가이드를 확인해 보세요.');
            const guideOnLabel = langKey === 'en' ? 'Guide Overlay: ON' : (langKey === 'ja' ? 'ガイド表示: ON' : '가이드 오버레이: ON');
            const guideOffLabel = langKey === 'en' ? 'Guide Overlay: OFF' : (langKey === 'ja' ? 'ガイド表示: OFF' : '가이드 오버레이: OFF');
            const envMetaLabel = langKey === 'en'
                ? 'Live Enterprise Console Capture (1920×1080 HD)'
                : (langKey === 'ja' ? '実稼働コンソール画面キャプチャ (1920×1080 HD)' : '실제 운영 화면 캡처 (1920×1080 HD)');

            const screensList = Array.isArray(vMeta.screens) && vMeta.screens.length > 0
                ? vMeta.screens
                : [
                    { idx: 1, tab: { ko: '1. 메인 화면', en: '1. Main View', ja: '1. メイン画面' }, caption: vMeta.caption },
                    { idx: 2, tab: { ko: '2. 상세 화면', en: '2. Detail View', ja: '2. 詳細画面' }, caption: vMeta.caption },
                    { idx: 3, tab: { ko: '3. 분석 화면', en: '3. Analysis View', ja: '3. 分析画面' }, caption: vMeta.caption },
                    { idx: 4, tab: { ko: '4. 설정 화면', en: '4. Policy View', ja: '4. 設定画面' }, caption: vMeta.caption }
                ];

            const firstScreen = screensList[0];
            const firstImg = `/images/screenshots/${slug}/screen_01.png`;
            const firstCap = (firstScreen.caption && (firstScreen.caption[langKey] || firstScreen.caption.ko))
                || (vMeta.caption && (vMeta.caption[langKey] || vMeta.caption.ko))
                || '';

            const tabsHtml = screensList.map((sc, idx) => {
                const padIdx = String(sc.idx || (idx + 1)).padStart(2, '0');
                const rawUrl = `/images/screenshots/${slug}/screen_${padIdx}.png`;
                const annUrl = `/images/screenshots/${slug}/screen_${padIdx}_annotated.png`;
                const tabLabel = (sc.tab && (sc.tab[langKey] || sc.tab.ko)) || `Screen ${idx + 1}`;
                const scCaption = (sc.caption && (sc.caption[langKey] || sc.caption.ko)) || firstCap;
                const isActive = idx === 0;
                const btnStyle = isActive
                    ? 'padding: 0.55rem 1rem; border-radius: 8px; border: 1px solid #38bdf8; background: rgba(56, 189, 248, 0.18); color: #f8fafc; font-weight: 700; font-size: 0.88rem; cursor: pointer;'
                    : 'padding: 0.55rem 1rem; border-radius: 8px; border: 1px solid rgba(148, 163, 184, 0.28); background: rgba(15, 23, 42, 0.7); color: #cbd5e1; font-weight: 600; font-size: 0.88rem; cursor: pointer;';
                return `<button type="button" class="sol-screen-tab${isActive ? ' active' : ''}" data-img="${rawUrl}" data-annotated="${annUrl}" data-caption="${scCaption.replace(/"/g, '&quot;')}" style="${btnStyle}">${tabLabel}</button>`;
            }).join('');

            showcaseSec.innerHTML = `
                <div class="glass-card" style="padding: 2rem; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.25); background: rgba(15, 23, 42, 0.78);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
                        <div>
                            <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); margin-bottom: 0.5rem;">REAL UI SCREENSHOT</span>
                            <h2 style="font-size: 1.55rem; color: #f8fafc; margin: 0.25rem 0;">${titleText}</h2>
                            <p style="color: #94a3b8; font-size: 0.95rem; margin: 0;">${subText}</p>
                        </div>
                        <button type="button" class="sol-guide-toggle" aria-pressed="false" style="padding: 0.5rem 0.95rem; border-radius: 999px; border: 1px solid rgba(167, 139, 250, 0.45); background: rgba(15, 23, 42, 0.85); color: #c4b5fd; font-weight: 700; font-size: 0.82rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.4rem;">
                            <i class="fas fa-magic"></i><span class="sol-guide-toggle-text">${guideOffLabel}</span>
                        </button>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
                        ${tabsHtml}
                    </div>
                    <div style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(148, 163, 184, 0.25); background: #020617;">
                        <img class="sol-screen-main-img" src="${firstImg}" alt="${firstCap}" style="width: 100%; height: auto; object-fit: contain; display: block; transition: opacity 0.2s ease;" />
                    </div>
                    <div style="margin-top: 0.75rem; font-size: 0.88rem; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <span><i class="fas fa-info-circle" style="color: #38bdf8; margin-right: 5px;"></i><span class="sol-screen-caption">${firstCap}</span></span>
                        <span style="color: #38bdf8; font-weight: 600;">${envMetaLabel}</span>
                    </div>
                </div>
            `;
            heroSection.insertAdjacentElement('afterend', showcaseSec);

            const solTabs = showcaseSec.querySelectorAll('.sol-screen-tab');
            const solMainImg = showcaseSec.querySelector('.sol-screen-main-img');
            const solCapEl = showcaseSec.querySelector('.sol-screen-caption');
            const guideToggleBtn = showcaseSec.querySelector('.sol-guide-toggle');
            const guideToggleText = showcaseSec.querySelector('.sol-guide-toggle-text');
            let showAnnotated = false;

            const syncShowcaseScreen = (activeBtn) => {
                if (!activeBtn || !solMainImg) return;
                const nextSrc = showAnnotated
                    ? (activeBtn.getAttribute('data-annotated') || activeBtn.getAttribute('data-img'))
                    : activeBtn.getAttribute('data-img');
                const nextCap = activeBtn.getAttribute('data-caption') || firstCap;
                solMainImg.style.opacity = '0.4';
                solMainImg.src = nextSrc;
                solMainImg.alt = nextCap;
                if (solCapEl) solCapEl.textContent = nextCap;
                setTimeout(() => { solMainImg.style.opacity = '1'; }, 80);
            };

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
                    syncShowcaseScreen(btn);
                });
            });

            if (guideToggleBtn) {
                guideToggleBtn.addEventListener('click', () => {
                    showAnnotated = !showAnnotated;
                    guideToggleBtn.setAttribute('aria-pressed', showAnnotated ? 'true' : 'false');
                    guideToggleBtn.style.background = showAnnotated ? 'rgba(139, 92, 246, 0.28)' : 'rgba(15, 23, 42, 0.85)';
                    guideToggleBtn.style.borderColor = showAnnotated ? '#a78bfa' : 'rgba(167, 139, 250, 0.45)';
                    guideToggleBtn.style.color = showAnnotated ? '#f8fafc' : '#c4b5fd';
                    if (guideToggleText) {
                        guideToggleText.textContent = showAnnotated ? guideOnLabel : guideOffLabel;
                    }
                    const currentActive = showcaseSec.querySelector('.sol-screen-tab.active') || solTabs[0];
                    syncShowcaseScreen(currentActive);
                });
            }
        }
    }

    // 11. Solution Grid Card Thumbnail Preview Injection
    document.querySelectorAll('.solution-card').forEach(card => {
        if (card.querySelector('.solution-card-screen-thumb')) return;
        const linkEl = card.querySelector('a[href*="sync-"]');
        const headerEl = card.querySelector('.solution-card-header');
        if (!linkEl || !headerEl) return;
        const m = (linkEl.getAttribute('href') || '').match(/(sync-(?:verse|insight|llm|apim|watch|boot|cms|shop|ops|eta|crawl))/i);
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
