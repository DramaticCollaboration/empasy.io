// Determine language from URL path
function getLangFromURL() {
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/ja/')) return 'ja';
    return 'ko';
}

const currentLang = getLangFromURL();

// Calculate target URL preserving current subpath and query/hash
function getTargetUrl(targetLang) {
    const path = window.location.pathname;
    const hash = window.location.hash || '';
    const search = window.location.search || '';

    const langMatch = path.match(/\/(ko|en|ja)\/(.*)/);
    if (langMatch) {
        const basePath = path.substring(0, langMatch.index);
        const subPath = langMatch[2] || 'pages/index.html';
        if (targetLang === 'ko' && (subPath === 'pages/index.html' || subPath === 'pages/' || subPath === '')) {
            return `${basePath || '/'}${search}${hash}`;
        }
        return `${basePath}/${targetLang}/${subPath}${search}${hash}`;
    }

    if (targetLang === 'ko') {
        return `/${search}${hash}`;
    }
    return `/${targetLang}/pages/index.html${search}${hash}`;
}

function syncEmpasyLocaleCookies(lang) {
    const siteLocale = lang === 'en' ? 'en-US' : (lang === 'ja' ? 'ja-JP' : 'ko-KR');
    const adminLocale = lang === 'ko' ? 'ko-KR' : 'en-US';
    const host = window.location.hostname || '';
    const domainPart = (host === 'empasy.io' || host.endsWith('.empasy.io')) ? '; domain=.empasy.io' : '';
    const securePart = window.location.protocol === 'https:' ? '; Secure' : '';
    const attrs = '; path=/; max-age=31536000; SameSite=Lax' + domainPart + securePart;
    try {
        document.cookie = 'empasy_site_locale=' + encodeURIComponent(siteLocale) + attrs;
        document.cookie = 'empasy_locale=' + encodeURIComponent(adminLocale) + attrs;
    } catch {
        // Ignore cookie write errors
    }
}

// Dynamic Language Switcher to preserve current page path
function updateLangSwitcherLinks() {
    syncEmpasyLocaleCookies(currentLang);
    const langLinks = document.querySelectorAll('.lang-dropdown-content a, .lang-switch a');
    if (!langLinks || langLinks.length === 0) return;

    langLinks.forEach((link) => {
        if (link.dataset.langBound === 'true') return;
        link.dataset.langBound = 'true';
        let targetLang = link.getAttribute('data-lang');
        if (!targetLang) {
            const href = link.getAttribute('href') || '';
            if (href.includes('/ko/')) targetLang = 'ko';
            else if (href.includes('/en/')) targetLang = 'en';
            else if (href.includes('/ja/')) targetLang = 'ja';
            else if (link.textContent.includes('KO')) targetLang = 'ko';
            else if (link.textContent.includes('EN')) targetLang = 'en';
            else if (link.textContent.includes('JA')) targetLang = 'ja';
            else targetLang = 'ko';
        }

        const targetUrl = getTargetUrl(targetLang);
        link.setAttribute('href', targetUrl);

        link.addEventListener('click', (e) => {
            try {
                localStorage.setItem('preferred_lang', targetLang);
            } catch {
                // Ignore storage errors
            }
            syncEmpasyLocaleCookies(targetLang);
            window.location.href = targetUrl;
            e.preventDefault();
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateLangSwitcherLinks();
    });
} else {
    updateLangSwitcherLinks();
}
