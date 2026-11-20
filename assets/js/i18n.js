const translations = {
    ko: {
        "nav.about": "핵심 가치",
        "nav.company": "회사 소개",
        "nav.solutions": "솔루션",
        "nav.clients": "고객 사례",
        "nav.vision": "비전",
        "nav.team": "팀 소개",
        "nav.contact": "문의하기",
        "hero.badge": "Empasy AI",
        "hero.title": "개발부터 테스트·운영까지,<br>스스로 일하는 <span style='color: var(--primary-color);'>AI 업무 자동화</span>",
        "hero.subtitle": "하나의 검증된 공통 기반 위에 필요한 기능만 골라 도입할 수 있습니다.<br>중요한 변경은 담당자 확인을 거쳐 안전하게 반영합니다.",
        "hero.btn": "솔루션 살펴보기",
        
        "cms.badge": "웹사이트 자동 제작",
        "cms.title": "SyncCMS",
        "cms.typewriter": "봄 시즌 맞이 기획전 페이지 하나 만들어줘",
        "cms.vs.legacy.title": "기존 웹사이트 관리",
        "cms.vs.legacy.1": "담당자가 일일이 복잡한 입력창을 채워야 함",
        "cms.vs.legacy.2": "화면 구성을 바꿀 때마다 개발자 작업이 필요함",
        "cms.vs.legacy.3": "국가별·언어별 페이지를 수동으로 번역해 따로 등록",
        "cms.vs.agent.title": "SyncCMS 도입 후",
        "cms.vs.agent.1": "원하는 내용을 말하면 화면 디자인과 문구를 동시에 생성",
        "cms.vs.agent.2": "화면을 보며 '이 버튼 색상을 바꿔줘'라고 말하면 즉시 수정",
        "cms.vs.agent.3": "본문 수정 시 15개 이상 다국어 페이지에 자동 번역·반영",
        
        "eta.badge": "AI 테스트 자동화",
        "eta.title": "SyncEta",
        "eta.typewriter": "화면 변경을 스스로 인식해 테스트를 계속 진행합니다...",
        "eta.vs.legacy.title": "기존 테스트 자동화",
        "eta.vs.legacy.1": "화면 디자인이나 버튼 위치가 바뀌면 테스트가 즉시 중단됨",
        "eta.vs.legacy.2": "작은 화면 차이에도 불필요한 오류 알림이 자주 발생함",
        "eta.vs.legacy.3": "테스트 코드를 고치는 데 개발자 시간이 계속 소모됨",
        "eta.vs.agent.title": "SyncEta 도입 후",
        "eta.vs.agent.1": "AI가 화면을 직접 보고 바뀐 버튼을 스스로 찾아 테스트 계속 진행",
        "eta.vs.agent.2": "실제 사용자 눈높이에서 화면이 정상인지 정확하게 판단",
        "eta.vs.agent.3": "오류 발견 시 원인을 분석하고 수정 방법까지 함께 제안",

        "boot.badge": "기업 표준 백오피스 · 로우코드 코어",
        "boot.title": "SyncBoot",
        "boot.typewriter": "조직·직책별 권한, 전자결재, 경영 리포트와 로우코드 서버 API를 즉시 구축합니다",
        "boot.vs.legacy.title": "기존 백오피스·서버 개발",
        "boot.vs.legacy.1": "개발자가 권한 관리·전자결재·데이터 처리 코드와 DB 테이블을 반복 작성",
        "boot.vs.legacy.2": "결제·주문 오류 발생 시 이전 상태로 되돌리는 작업이 복잡함",
        "boot.vs.legacy.3": "장애 원인을 찾기 위해 여러 로그를 수동으로 대조해야 함",
        "boot.vs.agent.title": "SyncBoot 도입 후",
        "boot.vs.agent.1": "조직도·직책별 메뉴·버튼 권한 관리와 한국형 다단계 전자결재·경영 리포트 즉시 제공",
        "boot.vs.agent.2": "로우코드 화면·API 자동 생성 및 오류 발생 시 이전 상태 자동 복구로 데이터 안전 보장",
        "boot.vs.agent.3": "실시간 시스템 작업·감사 기록 추적 및 장애 원인 자동 진단",

        "crawl.badge": "웹 데이터 수집",
        "crawl.title": "SyncCrawl",
        "crawl.typewriter": "사이트 구조가 바뀌어도 중단 없이 필요한 데이터를 수집합니다",
        "crawl.vs.legacy.title": "기존 수집 프로그램",
        "crawl.vs.legacy.1": "대상 사이트의 화면 구조가 바뀌면 즉시 수집이 멈춤",
        "crawl.vs.legacy.2": "요청 속도 제어 및 규정 미준수로 수집이 자주 끊김",
        "crawl.vs.legacy.3": "복잡한 웹페이지 코드가 그대로 섞여 있어 바로 활용하기 어려움",
        "crawl.vs.agent.title": "SyncCrawl 도입 후",
        "crawl.vs.agent.1": "사이트 디자인이 바뀌어도 AI가 내용을 읽고 알아서 수집 규칙 수정",
        "crawl.vs.agent.2": "수집 허용 규정(robots.txt) 및 도메인별 속도 제한 준수로 중단 없이 안전하게 수집",
        "crawl.vs.agent.3": "불필요한 광고를 걸러내고 개인정보 가림 처리 및 사내 검색용 문서로 즉시 변환",

        "llm.badge": "AI 비용 절감 · 개인정보 보호",
        "llm.title": "SyncLLM",
        "llm.typewriter": "민감한 개인정보를 가리고 다중 AI 모델 연결과 중복 질문 재사용으로 비용을 절감합니다",
        "llm.vs.legacy.title": "기존 개별 AI 모델 연동",
        "llm.vs.legacy.1": "부서별 API 키가 흩어져 있어 AI 사용 요금과 예산 통제가 불가능함",
        "llm.vs.legacy.2": "임직원이 입력한 개인정보·기밀 데이터가 외부 AI로 그대로 유출될 위험",
        "llm.vs.legacy.3": "특정 AI 서비스 장애 시 연결된 사내 업무 시스템 전체가 중단됨",
        "llm.vs.agent.title": "SyncLLM 도입 후",
        "llm.vs.agent.1": "중복 질문 답변 재사용과 부서별 예산 한도 관리로 AI 요금을 최대 60% 절감",
        "llm.vs.agent.2": "외부 전송 전 민감 개인정보 자동 가림 처리 및 암호화 키 금고로 안전하게 보호",
        "llm.vs.agent.3": "OpenAI·Claude·Gemini·사내 AI 모델 간 무중단 자동 우회 연결 지원",

        "apim.badge": "API 보안 및 트래픽 관제 게이트웨이",
        "apim.title": "SyncAPIM",
        "apim.typewriter": "문맥 기반 공격 분석과 무중단 가상 패치로 해킹 공격과 미등록 숨은 API를 차단합니다",
        "apim.vs.legacy.title": "기존 방화벽 · API 게이트웨이",
        "apim.vs.legacy.1": "복잡한 규칙이 늘어날수록 속도가 느려지고 교묘하게 변형된 해킹 공격에 취약함",
        "apim.vs.legacy.2": "신규 보안 취약점 발표 후 프로그램 수정·재배포까지 수일~수주간 무방비 노출",
        "apim.vs.legacy.3": "문서에 없는 미등록 숨은 API를 통한 개인정보 유출을 찾아낼 수 없음",
        "apim.vs.agent.title": "SyncAPIM 도입 후",
        "apim.vs.agent.1": "문맥 기반 해킹 구문 분석으로 0.03밀리초 내에 속도 저하 없이 공격 정밀 차단",
        "apim.vs.agent.2": "SyncWatch 방어 규칙 연동으로 서버 재시작 없이 즉시 신규 취약점 방어(가상 패치)",
        "apim.vs.agent.3": "실시간 통신 분석으로 숨은 API를 자동 발견하고 8대 민감 개인정보를 즉시 가림 처리",

        "watch.badge": "전사 보안 위협 관측 · 방어 규칙 자동 배포",
        "watch.title": "SyncWatch",
        "watch.typewriter": "8대 글로벌 보안 기관의 취약점 정보를 수집해 코드 점검 규칙과 API 차단 규칙을 자동 배포합니다",
        "watch.vs.legacy.title": "기존 수동 보안 권고 모니터링",
        "watch.vs.legacy.1": "보안 담당자가 국내외 보안 공지를 일일이 검색하고 사내 시스템 영향도를 수동 대조",
        "watch.vs.legacy.2": "급하게 만든 차단 규칙의 오류로 인해 정상적인 고객 요청까지 막히는 장애 발생",
        "watch.vs.legacy.3": "개발팀의 코드 수정과 보안팀의 방화벽 설정이 따로 진행되어 방어 공백 발생",
        "watch.vs.agent.title": "SyncWatch 도입 후",
        "watch.vs.agent.1": "미국 CISA·NVD, 한국 KISA 등 8대 채널 위협 24시간 자동 수집 및 사내 영향도 즉시 진단",
        "watch.vs.agent.2": "정상 업무 요청을 방해하지 않도록 사전 안전 검증(오차단 0% 확인)을 통과한 규칙만 생성",
        "watch.vs.agent.3": "SyncVerse(개발 코드 점검)와 SyncAPIM(실시간 API 차단)으로 방어 규칙 동시 배포",

        "shop.badge": "자율형 쇼핑몰 운영 에이전트",
        "shop.title": "SyncShop",
        "shop.typewriter": "상품 카탈로그 검색부터 목표 마진을 지키는 가격 조정과 주문·타임세일까지 자동화합니다",
        "shop.vs.legacy.title": "기존 쇼핑몰 운영 시스템",
        "shop.vs.legacy.1": "담당자가 수천 개 상품의 가격·재고·할인 행사를 엑셀로 수동 관리",
        "shop.vs.legacy.2": "단순 단어 일치 검색만 지원해 고객이 원하는 연관 상품 추천이 어려움",
        "shop.vs.legacy.3": "타임세일 등 주문 폭주 시 서버 과부하로 결제·재고 오류가 발생",
        "shop.vs.agent.title": "SyncShop 도입 후",
        "shop.vs.agent.1": "경쟁사 가격과 재고를 실시간 반영하면서 최소 마진을 보장하는 자동 가격 조정",
        "shop.vs.agent.2": "고객의 검색 의도를 이해하는 AI 의미 기반 검색으로 구매 전환율과 추천 정확도 향상",
        "shop.vs.agent.3": "기능별로 분리된 안정적인 서버 구조(MSA)로 주문·결제·배송·프로모션 무중단 처리",

        "ops.badge": "프로젝트 손익 · 인력 · 하도급 법규 관리",
        "ops.title": "SyncOps",
        "ops.typewriter": "프로젝트별 실시간 수익률과 인력 투입 일정, 하도급 대금 지급기한·보증보험 만기를 한눈에 관리합니다",
        "ops.vs.legacy.title": "기존 엑셀 기반 프로젝트 관리",
        "ops.vs.legacy.1": "계약 금액 대비 실제 투입 원가 차이를 월말 결산이 끝난 뒤에야 뒤늦게 파악",
        "ops.vs.legacy.2": "기술등급별 인력 투입 일정과 대기 인력 현황이 부서별로 따로 관리됨",
        "ops.vs.legacy.3": "하도급 대금 60일 지급기한이나 4대 보증증권 만기일을 놓쳐 법적·재무적 위험 발생",
        "ops.vs.agent.title": "SyncOps 도입 후",
        "ops.vs.agent.1": "청구 금액 대 실제 투입 원가를 자동 비교해 프로젝트별·분기별 실시간 영업이익 산출",
        "ops.vs.agent.2": "기술등급별 인력 투입 일정표와 가동률·미수금 위험 경보를 실시간으로 제공",
        "ops.vs.agent.3": "하도급법 60일 지급 마감일(D-Day)·지연이자 자동 계산 및 보증증권 만기 사전 알림",

        "footer.title": "우리 회사에 맞는 AI 자동화, 지금 상담해 보세요",
        "footer.copyright": "© 2026 Empasy IT Corp. All rights reserved."
    },
    en: {
        "nav.about": "Philosophy",
        "nav.company": "Company",
        "nav.solutions": "Sync Series",
        "nav.clients": "Clients",
        "nav.vision": "Vision 2026",
        "nav.team": "Our Story",
        "nav.contact": "Contact",
        "hero.badge": "Boon to Business by Agility",
        "hero.title": "Empasy,<br>Perfecting Business Agility<br><span class='text-gradient'>Next-Gen Autonomous AI Ecosystem</span>",
        "hero.subtitle": "Deeply empathizing with customer pain points, we provide an <strong>AI Ops</strong> ecosystem that minimizes human intervention from planning to operation. Empasy accelerates your business.",
        "hero.btn": "Explore Solutions",

        "cms.badge": "Conversational Publisher Agent",
        "cms.title": "SyncCMS",
        "cms.typewriter": "Create a new promotion page for the spring season",
        "cms.vs.legacy.title": "Legacy CMS",
        "cms.vs.legacy.1": "Admins must manually fill out complex forms",
        "cms.vs.legacy.2": "Layout modifications require developer resources",
        "cms.vs.legacy.3": "Manual translation and page creation for each country/language",
        "cms.vs.agent.title": "SyncCMS Agent",
        "cms.vs.agent.1": "Simultaneous layout and content generation via natural language commands",
        "cms.vs.agent.2": "Instant UI changes simply by saying 'Change this button color'",
        "cms.vs.agent.3": "Automatic contextual translation into 15+ languages upon content update",

        "eta.badge": "Self-Healing QA Agent",
        "eta.title": "SyncEta",
        "eta.typewriter": "Initializing self-healing visual regression tests...",
        "eta.vs.legacy.title": "Legacy Script-based QA",
        "eta.vs.legacy.1": "Tests fail due to broken locators when UI designs change",
        "eta.vs.legacy.2": "Frequent false positives caused by pixel-level comparisons",
        "eta.vs.legacy.3": "Massive ongoing developer resources needed for script maintenance",
        "eta.vs.agent.title": "SyncEta Agent",
        "eta.vs.agent.1": "Autonomous visual locator discovery and self-healing using Vision LLM",
        "eta.vs.agent.2": "Contextual UI breakage detection based on 'user perception'",
        "eta.vs.agent.3": "Proposes root-cause analysis and fix codes to the control tower upon error detection",

        "boot.badge": "Enterprise Back-Office & Low-Code Core",
        "boot.title": "SyncBoot Platform",
        "boot.typewriter": "Delivers org/role permissions, multi-stage e-approval, executive reports, and low-code APIs",
        "boot.vs.legacy.title": "Legacy Back-Office & Backend Dev",
        "boot.vs.legacy.1": "Developers repeatedly build permissions, approval workflows, CRUD APIs, and database tables from scratch",
        "boot.vs.legacy.2": "Complex manual rollback recovery when multi-service transactions fail",
        "boot.vs.legacy.3": "Manual correlation across scattered logs for audit compliance and root-cause analysis",
        "boot.vs.agent.title": "SyncBoot Platform",
        "boot.vs.agent.1": "Built-in org/role menu & button permissions, multi-stage E-Approval wizard, and 71 standard screens",
        "boot.vs.agent.2": "Low-code CRUD/API generation and automatic transaction recovery for data consistency",
        "boot.vs.agent.3": "Real-time system audit trail logging and automated root-cause diagnostics",

        "crawl.badge": "Web Data Collection Agent",
        "crawl.title": "SyncCrawl",
        "crawl.typewriter": "Continuously collects and cleans web data even when target site layouts change",
        "crawl.vs.legacy.title": "Legacy Rule-based Scraper",
        "crawl.vs.legacy.1": "Immediately stops collecting when target website layouts or class names change",
        "crawl.vs.legacy.2": "Frequent collection failures due to missing rate-limit and policy compliance",
        "crawl.vs.legacy.3": "Difficult to use for enterprise search immediately due to raw HTML and ad clutter",
        "crawl.vs.agent.title": "SyncCrawl Agent",
        "crawl.vs.agent.1": "AI understands page context to auto-heal collection rules when site layouts change",
        "crawl.vs.agent.2": "Enforces robots.txt compliance and per-domain speed limits for stable 24/7 extraction",
        "crawl.vs.agent.3": "Strips ads, masks sensitive personal data, and outputs clean Markdown/JSON documents",

        "llm.badge": "AI Cost Control & Privacy Gateway",
        "llm.title": "SyncLLM",
        "llm.typewriter": "Masks sensitive personal data and cuts AI costs via smart routing and answer caching",
        "llm.vs.legacy.title": "Legacy Direct AI Model Calls",
        "llm.vs.legacy.1": "Scattered API keys across teams make AI cost tracking and budget control impossible",
        "llm.vs.legacy.2": "Risk of leaking sensitive personal data or corporate secrets to external AI providers",
        "llm.vs.legacy.3": "Single-vendor AI outage brings down all connected internal business services",
        "llm.vs.agent.title": "SyncLLM Gateway",
        "llm.vs.agent.1": "Reduces AI spend by up to 60% via repeated-answer caching and department budget limits",
        "llm.vs.agent.2": "Automatic personal data masking before external calls and encrypted API key vault storage",
        "llm.vs.agent.3": "Graceful automatic failover across OpenAI, Claude, Gemini, and private models",

        "apim.badge": "Strict Access Control API & AI Security Gateway",
        "apim.title": "SyncAPIM",
        "apim.typewriter": "Blocks cyberattacks and discovers hidden APIs with context-aware inspection and virtual patching",
        "apim.vs.legacy.title": "Legacy Firewalls & API Gateways",
        "apim.vs.legacy.1": "Complex rule chains slow down responses and fail against disguised injection attacks",
        "apim.vs.legacy.2": "Days or weeks of vulnerability exposure while waiting for code patches and server restarts",
        "apim.vs.legacy.3": "Blind to undocumented hidden APIs leaking sensitive customer information",
        "apim.vs.agent.title": "SyncAPIM Gateway",
        "apim.vs.agent.1": "0.03ms ultra-fast attack detection via context-aware grammar fingerprinting",
        "apim.vs.agent.2": "Graceful virtual patching against new threats without restarting servers",
        "apim.vs.agent.3": "Automatic hidden API discovery from live traffic and real-time 8-type personal data masking",

        "watch.badge": "Global Vulnerability Monitoring & Auto-Defense",
        "watch.title": "SyncWatch",
        "watch.typewriter": "Monitors 8 global security feeds 24/7 and automatically deploys code check and API defense rules",
        "watch.vs.legacy.title": "Legacy Manual Security Monitoring",
        "watch.vs.legacy.1": "Analysts manually check CISA/NVD alerts and cross-reference internal software inventories",
        "watch.vs.legacy.2": "Rushed emergency firewall rules cause false alarms that block legitimate customer traffic",
        "watch.vs.legacy.3": "Disconnected workflows between developer code patching and operations firewall updates",
        "watch.vs.agent.title": "SyncWatch Automated Security",
        "watch.vs.agent.1": "24/7 automated collection across 8 global security agencies and instant company impact checks",
        "watch.vs.agent.2": "Pre-tests every defense rule in an isolated sandbox (0% false blocks verified) before deployment",
        "watch.vs.agent.3": "Simultaneously deploys code inspection rules to SyncVerse and live API defense policies to SyncAPIM",

        "shop.badge": "Autonomous E-Commerce Agent",
        "shop.title": "SyncShop",
        "shop.typewriter": "Automates product catalogs, margin-safe dynamic pricing, order tracking, and flash sales",
        "shop.vs.legacy.title": "Legacy E-Commerce Systems",
        "shop.vs.legacy.1": "Merchandisers manually update prices, inventory, and promotions across thousands of products",
        "shop.vs.legacy.2": "Rigid keyword search fails to understand customer intent or recommend relevant items",
        "shop.vs.legacy.3": "Flash-sale traffic surges overload monolithic servers and cause inventory errors",
        "shop.vs.agent.title": "SyncShop Autonomous Commerce",
        "shop.vs.agent.1": "Margin-safe dynamic pricing that responds to competitor prices and stock levels in real time",
        "shop.vs.agent.2": "AI intent-based hybrid search boosts product discovery and checkout conversion rates",
        "shop.vs.agent.3": "Resilient microservices architecture processes orders, payments, shipping, and deals without downtime",

        "ops.badge": "Project Profitability & Compliance Control",
        "ops.title": "SyncOps",
        "ops.typewriter": "Tracks real-time project profitability, staffing schedules, subcontract deadlines, and surety bonds",
        "ops.vs.legacy.title": "Legacy Spreadsheet Project Management",
        "ops.vs.legacy.1": "Gaps between contract revenue and actual labor cost are discovered weeks later after monthly close",
        "ops.vs.legacy.2": "Disconnected tracking of engineer schedules and available staff across departments",
        "ops.vs.legacy.3": "Legal and financial risk from missed 60-day subcontract payment deadlines or surety bond expiry",
        "ops.vs.agent.title": "SyncOps Project & Profit Control",
        "ops.vs.agent.1": "Real-time profit & loss tables comparing contract billing vs. actual cost by project and quarter",
        "ops.vs.agent.2": "Live engineer assignment schedules, utilization dashboards, and unpaid receivable alerts",
        "ops.vs.agent.3": "Automated 60-day subcontract payment countdown (D-Day) and 4 major surety bond expiry alerts",

        "footer.title": "Accelerate your business with Empasy",
        "footer.copyright": "© 2026 Empasy. All rights reserved."
    },
    ja: {
        "nav.about": "哲学",
        "nav.company": "会社について",
        "nav.solutions": "Sync Series",
        "nav.clients": "導入事例",
        "nav.vision": "ビジョン 2026",
        "nav.team": "私たちのストーリー",
        "nav.contact": "お問い合わせ",
        "hero.badge": "Boon to Business by Agility",
        "hero.title": "Empasy,<br>ビジネスの俊敏性の完成<br><span class='text-gradient'>次世代AI自律運用エコシステム</span>",
        "hero.subtitle": "顧客の課題に深く共感し、企画から運用まで人間の介入を最小限に抑える<strong>AI Ops</strong>エコシステム。Empasyがお客様のビジネスを加速させます。",
        "hero.btn": "ソリューションを見る",

        "cms.badge": "対話型Web自動制作・配信エージェント",
        "cms.title": "SyncCMS",
        "cms.typewriter": "春のシーズン向けのプロモーションページを作成して",
        "cms.vs.legacy.title": "従来のCMS",
        "cms.vs.legacy.1": "管理者が複雑なフォームを手動で入力する必要がある",
        "cms.vs.legacy.2": "レイアウトの修正に開発リソースが発生",
        "cms.vs.legacy.3": "国別・言語別のページを手動で翻訳および作成",
        "cms.vs.agent.title": "SyncCMS エージェント",
        "cms.vs.agent.1": "自然言語のコマンドだけでレイアウトとコンテンツを同時に生成",
        "cms.vs.agent.2": "画面を見ながら「このボタンの色を変えて」と指示するだけで即時修正",
        "cms.vs.agent.3": "本文の修正時、15カ国語のリソースを自動的に文脈翻訳",

        "eta.badge": "自己修復型AIテスト自動化エージェント",
        "eta.title": "SyncEta",
        "eta.typewriter": "画面構造の変更を自動認識し、自己修復ビジュアル回帰テストを実行しています...",
        "eta.vs.legacy.title": "従来のスクリプトベースQA",
        "eta.vs.legacy.1": "UIデザインの変更により識別子エラーが発生しテストが失敗",
        "eta.vs.legacy.2": "ピクセル単位の比較による頻繁な誤検知（False Positive）",
        "eta.vs.legacy.3": "スクリプトの保守に膨大な開発リソースを継続的に投入",
        "eta.vs.agent.title": "SyncEta エージェント",
        "eta.vs.agent.1": "Vision LLMを活用した視覚的識別子の自動探索と自己修復",
        "eta.vs.agent.2": "「ユーザー認知」に基づく文脈的な画面崩壊の判定",
        "eta.vs.agent.3": "エラー検出時、原因分析と解決コードをコントロールタワーに逆提案",

        "boot.badge": "企業標準バックオフィス・ローコード基盤",
        "boot.title": "SyncBoot Platform",
        "boot.typewriter": "組織・役職別権限管理、多段階電子決裁、経営レポートとローコードAPIを即時構築します",
        "boot.vs.legacy.title": "従来のバックオフィス・サーバー開発",
        "boot.vs.legacy.1": "開発者が権限管理・電子決裁・データ処理APIとDBテーブルを毎回ゼロから作成",
        "boot.vs.legacy.2": "複数サービス間の処理でエラーが発生した際、元の状態へ戻す復旧実装が複雑",
        "boot.vs.legacy.3": "監査証跡や障害原因の追跡に複数のログを手動で照合する必要がある",
        "boot.vs.agent.title": "SyncBoot プラットフォーム",
        "boot.vs.agent.1": "組織図・役職別メニュー・ボタン権限管理と多段階電子決裁・71種標準業務画面を即時提供",
        "boot.vs.agent.2": "ローコード画面・API自動生成およびエラー発生時の自動ロールバック復旧でデータ安全を保証",
        "boot.vs.agent.3": "リアルタイム作業・監査ログ追跡および障害原因の自動診断",

        "crawl.badge": "自動対応型Webデータ収集エージェント",
        "crawl.title": "SyncCrawl",
        "crawl.typewriter": "サイト構造が変化しても中断なくデータを収集し、広告や個人情報を除去して整理します",
        "crawl.vs.legacy.title": "従来のルールベース収集ツール",
        "crawl.vs.legacy.1": "対象サイトの画面構造やタグが変わると即座に収集が停止",
        "crawl.vs.legacy.2": "リクエスト速度制御や規約遵守の不備により収集が頻繁に中断",
        "crawl.vs.legacy.3": "不要な広告やHTMLタグが混在しており、社内検索やAIで即座に活用しにくい",
        "crawl.vs.agent.title": "SyncCrawl エージェント",
        "crawl.vs.agent.1": "サイトデザイン変更時もAIがページ文脈を読み取り収集位置を自動補正",
        "crawl.vs.agent.2": "robots.txt規約遵守およびドメイン別速度制限により24時間365日安定収集",
        "crawl.vs.agent.3": "広告除去・個人情報マスキングを経て綺麗な検索用ドキュメントへ即時変換",

        "llm.badge": "AIコスト削減・個人情報保護ゲートウェイ",
        "llm.title": "SyncLLM",
        "llm.typewriter": "機密・個人情報を自動マスキングし、AIモデル自動振り分けと回答キャッシュで費用を削減します",
        "llm.vs.legacy.title": "従来の個別AIモデル連携",
        "llm.vs.legacy.1": "部門ごとにAPIキーが分散し、AI利用料金や予算消化率の統制が不可能",
        "llm.vs.legacy.2": "社員が入力した個人情報や機密データが外部AIへそのまま流出するリスク",
        "llm.vs.legacy.3": "特定AIサービスの障害時、連携する社内業務システム全体が停止",
        "llm.vs.agent.title": "SyncLLM ゲートウェイ",
        "llm.vs.agent.1": "重複質問の回答再利用（キャッシュ）と部門別予算上限によりAI費用を最大60%削減",
        "llm.vs.agent.2": "外部送信前の個人情報自動マスキングおよび暗号化キー保管庫で安全に保護",
        "llm.vs.agent.3": "OpenAI・Claude・Gemini・社内AIモデル間の無停止自動切替ルーティング",

        "apim.badge": "AI・APIセキュリティおよびトラフィック統制",
        "apim.title": "SyncAPIM",
        "apim.typewriter": "文脈ベースの攻撃分析と無停止仮想パッチでサイバー攻撃と未登録の隠れたAPIを遮断します",
        "apim.vs.legacy.title": "従来のファイアウォール・APIゲートウェイ",
        "apim.vs.legacy.1": "複雑なルールが増えるほど応答が遅くなり、巧妙に偽装された攻撃を防げない",
        "apim.vs.legacy.2": "新規脆弱性の公表後、プログラム修正・再デプロイまで数日〜数週間の無防備な露出",
        "apim.vs.legacy.3": "仕様書にない未登録API（シャドーAPI）を通じた個人情報流出を検知できない",
        "apim.vs.agent.title": "SyncAPIM ゲートウェイ",
        "apim.vs.agent.1": "文脈ベースの構文指紋分析により0.03ミリ秒の超低遅延で攻撃を精密遮断",
        "apim.vs.agent.2": "SyncWatch防御ルール連携によりサーバー再起動なしで即座に新規脆弱性を防御（仮想パッチ）",
        "apim.vs.agent.3": "通信トラフィックから未登録APIを自動検出し、8大機密・個人情報をリアルタイムでマスキング",

        "watch.badge": "全社セキュリティ脅威観測・防御ルール自動配信",
        "watch.title": "SyncWatch",
        "watch.typewriter": "8大セキュリティ機関の脆弱性情報を24時間収集し、コード点検ルールとAPI遮断ルールを同時配信します",
        "watch.vs.legacy.title": "従来の手動セキュリティ勧告モニタリング",
        "watch.vs.legacy.1": "担当者が国内外のセキュリティ勧告を手動検索し、自社システムへの影響度を個別に照合",
        "watch.vs.legacy.2": "緊急作成した遮断ルールの誤検知により正常な顧客アクセスまで遮断してしまう障害",
        "watch.vs.legacy.3": "開発チームのコード修正とセキュリティチームのWAF設定が分断され防御の空白が発生",
        "watch.vs.agent.title": "SyncWatch 自動セキュリティ管制",
        "watch.vs.agent.1": "CISA・NVD・OSV・KISAなど8大機関の脅威情報を24時間自動収集し自社影響度を即座に照合",
        "watch.vs.agent.2": "正常通信を妨げないよう事前安全検証（誤遮断0%確認）を通過した防御ルールのみを自動生成",
        "watch.vs.agent.3": "SyncVerse（開発コード点検）とSyncAPIM（リアルタイムAPI遮断）へ防御ルールを同時配信",

        "shop.badge": "ECサイト自律運営エージェント",
        "shop.title": "SyncShop",
        "shop.typewriter": "商品カタログ検索から利益率を守る自動価格調整、注文・タイムセールまで自律運営します",
        "shop.vs.legacy.title": "従来のEC運営システム",
        "shop.vs.legacy.1": "担当者が数千商品の価格・在庫・割引キャンペーンを手作業で管理",
        "shop.vs.legacy.2": "単純なキーワード一致検索のみでは顧客の意図に合った関連商品推薦が困難",
        "shop.vs.legacy.3": "タイムセール等の注文集中時に単一サーバーが過負荷となり決済・在庫エラーが発生",
        "shop.vs.agent.title": "SyncShop 自律コマース",
        "shop.vs.agent.1": "競合価格や在庫状況をリアルタイム反映しつつ最低利益率を守る自動価格調整",
        "shop.vs.agent.2": "顧客の検索意図を理解するAI意味検索により購買転換率と商品推薦精度を向上",
        "shop.vs.agent.3": "機能別に分離された分散マイクロサービス(MSA)構造で注文・決済・配送・特売を無停止処理",

        "ops.badge": "プロジェクト損益・要員・下請法規管理",
        "ops.title": "SyncOps",
        "ops.typewriter": "プロジェクト別の実質利益率と要員投入日程、下請支払期限・保証証券満期を一目で管理します",
        "ops.vs.legacy.title": "従来のエクセルベース案件管理",
        "ops.vs.legacy.1": "契約金額と実投入原価の乖離を月末決算が完了した後にようやく把握",
        "ops.vs.legacy.2": "技術等級別の要員投入日程と待機要員状況が部門ごとに分断して管理される",
        "ops.vs.legacy.3": "下請代金60日支払期限や4大保証証券の満期漏れによる法的・財務リスクの発生",
        "ops.vs.agent.title": "SyncOps 事業損益・要員管理",
        "ops.vs.agent.1": "契約請求額と実投入原価を自動対比し、案件別・四半期別(1Q〜4Q)の営業利益をリアルタイム算出",
        "ops.vs.agent.2": "技術等級別の要員投入日程表および稼働率・未収金リスク警報をリアルタイム提供",
        "ops.vs.agent.3": "下請法60日支払期限(D-Day)・遅延利息の自動計算および保証証券満期の事前アラート",

        "footer.title": "Empasyと共にビジネスを加速させましょう",
        "footer.copyright": "© 2026 Empasy. All rights reserved."
    }
};

translations.jp = translations.ja;

// Determine language from URL path
function getLangFromURL() {
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/ja/')) return 'ja';
    return 'ko';
}

let currentLang = getLangFromURL();

// Calculate target URL preserving current subpath and query/hash
function getTargetUrl(targetLang) {
    const path = window.location.pathname;
    const hash = window.location.hash || '';
    const search = window.location.search || '';

    // Check if path contains /ko/, /en/, or /ja/
    const langMatch = path.match(/\/(ko|en|ja)\/(.*)/);
    if (langMatch) {
        const basePath = path.substring(0, langMatch.index);
        let subPath = langMatch[2] || 'pages/index.html';
        if (targetLang === 'ko' && (subPath === 'pages/index.html' || subPath === 'pages/' || subPath === '')) {
            return `${basePath || '/'}${search}${hash}`;
        }
        return `${basePath}/${targetLang}/${subPath}${search}${hash}`;
    }

    // Default fallback if at root
    if (targetLang === 'ko') {
        return `/${search}${hash}`;
    }
    return `/${targetLang}/pages/index.html${search}${hash}`;
}

// Dynamic Language Switcher to preserve current page path
function updateLangSwitcherLinks() {
    const langLinks = document.querySelectorAll('.lang-dropdown-content a');
    if (!langLinks || langLinks.length === 0) return;

    langLinks.forEach(link => {
        let targetLang = link.getAttribute('data-lang');
        if (!targetLang) {
            const href = link.getAttribute('href') || '';
            if (href.includes('/ko/')) targetLang = 'ko';
            else if (href.includes('/en/')) targetLang = 'en';
            else if (href.includes('/ja/')) targetLang = 'ja';
            else if (link.textContent.includes('KO')) targetLang = 'ko';
            else if (link.textContent.includes('EN')) targetLang = 'en';
            else if (link.textContent.includes('JP') || link.textContent.includes('JA')) targetLang = 'ja';
            else targetLang = 'ko';
        }

        const targetUrl = getTargetUrl(targetLang);
        link.setAttribute('href', targetUrl);

        link.addEventListener('click', (e) => {
            try {
                localStorage.setItem('preferred_lang', targetLang);
            } catch (err) {
                // Ignore storage errors
            }
            window.location.href = targetUrl;
            e.preventDefault();
        });
    });
}

// Export updateContent for optional dynamic usage, but do not execute on page load
// since HTML pages are statically pre-rendered per language at build time.
export function updateContent(lang) {
    const selectedLang = lang || currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const langData = translations[selectedLang] || translations['ko'];
        if (langData && langData[key]) {
            el.innerHTML = langData[key];
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateLangSwitcherLinks();
    });
} else {
    updateLangSwitcherLinks();
}
