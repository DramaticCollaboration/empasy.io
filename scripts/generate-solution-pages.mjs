import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const empasyRoot = resolve(__dirname, '..');
const repoRoot = resolve(empasyRoot, '..', '..');

const uiLabels = JSON.parse(readFileSync(resolve(__dirname, 'solution-ui-labels.json'), 'utf-8'));

const LOCALES = ['ko', 'en', 'ja'];
const PRODUCTS = [
  { id: 'sync-verse', pdfFile: 'SyncVerse_Proposal.pdf' },
  { id: 'sync-eta', pdfFile: 'SyncETA_Proposal.pdf' },
  { id: 'sync-boot', pdfFile: 'SyncBoot_Proposal.pdf' },
  { id: 'sync-cms', pdfFile: 'SyncCMS_Proposal.pdf' },
  { id: 'sync-insight', pdfFile: 'SyncInsight_Proposal.pdf' },
  { id: 'sync-llm', pdfFile: 'SyncLLM_Proposal.pdf' },
  { id: 'sync-crawl', pdfFile: 'SyncCrawl_Proposal.pdf' },
  { id: 'sync-apim', pdfFile: 'SyncAPIM_Proposal.pdf' },
  { id: 'sync-watch', pdfFile: 'SyncWatch_Proposal.pdf' },
  { id: 'sync-shop', pdfFile: 'SyncShop_Proposal.pdf' },
  { id: 'sync-ops', pdfFile: 'SyncOps_Proposal.pdf' },
];

const CATALOG_FILES = {
  ko: 'portal-catalog.json',
  en: 'portal-catalog.en.json',
  ja: 'portal-catalog.ja.json',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeJsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/<\//g, '<\\/');
}

function loadCatalogByLocale(lang) {
  const filePath = resolve(repoRoot, 'sites', 'sync-portal', 'public', 'data', CATALOG_FILES[lang]);
  const raw = JSON.parse(readFileSync(filePath, 'utf-8'));
  const map = new Map();
  for (const prod of raw.products || []) {
    map.set(prod.id, prod);
  }
  return map;
}

function loadHomepageProductData(productId, lang) {
  const tsPath = resolve(repoRoot, productId, 'homepage', 'src', 'data', `productData.${lang}.ts`);
  if (!existsSync(tsPath)) {
    throw new Error(`Missing product data source: ${tsPath}`);
  }
  const source = readFileSync(tsPath, 'utf-8');
  const exportIdx = source.indexOf('export const');
  const startIdx = source.indexOf('{', exportIdx >= 0 ? exportIdx : 0);
  const endIdx = source.lastIndexOf('}');
  if (startIdx < 0 || endIdx <= startIdx) {
    throw new Error(`Could not locate object literal in ${tsPath}`);
  }
  const jsonText = source.slice(startIdx, endIdx + 1);
  return JSON.parse(jsonText);
}

function resolveSlideAsset(productId, rawImagePath) {
  const filename = basename(String(rawImagePath || '').split('?')[0]);
  if (!filename) {
    throw new Error(`Empty slide imagePath for ${productId}`);
  }
  const diskPath = resolve(empasyRoot, 'public', 'images', 'screenshots', productId, filename);
  if (!existsSync(diskPath)) {
    throw new Error(`Missing screenshot asset on empasy.io: ${diskPath}`);
  }
  return `/images/screenshots/${productId}/${filename}`;
}

function normalizeUrlForEmpasy(rawUrl, lang) {
  const url = String(rawUrl || '').trim();
  if (!url) return '';
  if (url.startsWith('https://empasy.io/')) {
    return url.replace('https://empasy.io', '');
  }
  if (url === 'https://sync.empasy.io' || url === 'https://sync.empasy.io/') {
    return lang === 'ko' ? 'https://demo.empasy.io/' : `https://demo.empasy.io/${lang}/`;
  }
  return url;
}

function buildWhatYouCanDo(lang, ui, product) {
  if (lang === 'en') {
    return `${ui.whatYouCanDoPrefix}${product.name}`;
  }
  if (lang === 'ko') {
    const particle = product.particles?.instrumental || '로';
    return `${product.name}${particle} ${ui.whatYouCanDoSuffix}`;
  }
  return `${product.name}${ui.whatYouCanDoSuffix}`;
}

function buildFrequentlyPaired(lang, ui, product) {
  if (lang === 'en') {
    return `${ui.frequentlyPairedPrefix}${product.name}`;
  }
  if (lang === 'ko') {
    const particle = product.particles?.conjunctive || '와';
    return `${product.name}${particle} ${ui.frequentlyPairedSuffix}`;
  }
  return `${product.name}${ui.frequentlyPairedSuffix}`;
}

function mergeDemoAccounts(product, catalogProduct) {
  const catalogAccounts = Array.isArray(catalogProduct?.demoAccounts) ? catalogProduct.demoAccounts : [];
  if (catalogAccounts.length > 0) {
    return catalogAccounts.map((acc) => ({
      roleTitle: acc.roleTitle,
      accountId: acc.accountId,
      accessCode: acc.demoAccessCode || acc.accessCode || '',
      scopeSummary: acc.scopeSummary,
    }));
  }
  return product.demoAccounts || [];
}

function mergeEntryLinks(product, catalogProduct, lang) {
  const hasDownloadLink = (product.entryLinks || []).some((l) => l.kind === 'download' || String(l.url || '').includes('download_eta.html'));
  if (hasDownloadLink) {
    return (product.entryLinks || []).map((link) => {
      const normalized = normalizeUrlForEmpasy(link.url, lang);
      return {
        ...link,
        url: normalized,
        external: normalized.startsWith('http'),
      };
    });
  }
  const catalogLinks = Array.isArray(catalogProduct?.entryLinks) ? catalogProduct.entryLinks : [];
  if (catalogLinks.length > (product.entryLinks || []).length) {
    return catalogLinks.map((link) => ({
      id: link.id,
      label: link.label,
      description: link.description,
      url: link.cloudUrl,
      isPrimary: Boolean(link.isPrimary),
      buttonText: link.buttonLabel,
      external: true,
    }));
  }
  return (product.entryLinks || []).map((link) => {
    const normalized = normalizeUrlForEmpasy(link.url, lang);
    return {
      ...link,
      url: normalized,
      external: normalized.startsWith('http'),
    };
  });
}

function renderAccountBox(acc, ui, isPrimary) {
  const idLabel = acc.roleTitle ? `${acc.roleTitle} ${ui.idLabel}` : ui.idLabel;
  const pwLabel = acc.roleTitle ? `${acc.roleTitle} ${ui.pwLabel}` : ui.pwLabel;
  const badgeHtml = isPrimary
    ? `<span class="sol-account-note">${escapeHtml(ui.defaultAccountBadge)}</span>`
    : '';
  return `
                        <div class="sol-account-box${isPrimary ? ' is-primary' : ''}">
                            <div class="sol-account-header">
                                <span class="sol-account-role">${escapeHtml(acc.roleTitle)}</span>
                                ${badgeHtml}
                            </div>
                            <p class="sol-account-scope">${escapeHtml(acc.scopeSummary)}</p>
                            <div class="sol-copy-row">
                                <button type="button" class="sol-copy-btn"
                                    data-copy-value="${escapeHtml(acc.accountId)}"
                                    data-copy-label="${escapeHtml(idLabel)}"
                                    data-copy-text="${escapeHtml(ui.copy)}"
                                    data-copied-text="${escapeHtml(ui.copied)}"
                                    data-toast-template="${escapeHtml(ui.toastTemplate)}">
                                    <span class="sol-copy-label">${escapeHtml(ui.idLabel)}</span>
                                    <code class="sol-copy-value">${escapeHtml(acc.accountId)}</code>
                                    <span class="sol-copy-action" data-copy-action>${escapeHtml(ui.copy)}</span>
                                </button>
                                <button type="button" class="sol-copy-btn"
                                    data-copy-value="${escapeHtml(acc.accessCode)}"
                                    data-copy-label="${escapeHtml(pwLabel)}"
                                    data-copy-text="${escapeHtml(ui.copy)}"
                                    data-copied-text="${escapeHtml(ui.copied)}"
                                    data-toast-template="${escapeHtml(ui.toastTemplate)}">
                                    <span class="sol-copy-label">${escapeHtml(ui.pwLabel)}</span>
                                    <code class="sol-copy-value">${escapeHtml(acc.accessCode)}</code>
                                    <span class="sol-copy-action" data-copy-action>${escapeHtml(ui.copy)}</span>
                                </button>
                            </div>
                        </div>`;
}

function buildPageHtml(productMeta, product, catalogProduct, lang) {
  const ui = uiLabels[lang];
  const canonicalUrl = `https://empasy.io/${lang}/solutions/${product.id}.html`;
  const koUrl = `https://empasy.io/ko/solutions/${product.id}.html`;
  const enUrl = `https://empasy.io/en/solutions/${product.id}.html`;
  const jaUrl = `https://empasy.io/ja/solutions/${product.id}.html`;

  const slides = (product.slides || []).map((slide) => {
    const imgSrc = resolveSlideAsset(product.id, slide.imagePath);
    const normalizedDemo = normalizeUrlForEmpasy(slide.demoUrl, lang);
    return {
      ...slide,
      imgSrc,
      demoUrl: normalizedDemo,
      demoExternal: normalizedDemo.startsWith('http'),
    };
  });

  if (slides.length === 0) {
    throw new Error(`No slides defined for ${product.id} (${lang})`);
  }

  const firstSlide = slides[0];
  const ogImageUrl = `https://empasy.io${firstSlide.imgSrc}`;
  const pageTitle = `${product.name} — ${product.headline} | ${ui.brandSuffix}`;
  const pageDesc = product.subheadline || product.summary;

  const pdfDiskPath = resolve(empasyRoot, 'public', 'downloads', 'proposals', productMeta.pdfFile);
  if (!existsSync(pdfDiskPath)) {
    throw new Error(`Missing proposal PDF: ${pdfDiskPath}`);
  }
  const proposalPdfHref = `/downloads/proposals/${productMeta.pdfFile}`;

  const primaryCtaHref = product.primaryCtaExternal
    ? normalizeUrlForEmpasy(product.primaryCtaHref, lang)
    : '#demo';
  const primaryCtaIsExternal = primaryCtaHref.startsWith('http');
  const primaryCtaLabel = product.primaryCtaExternal ? product.primaryCtaLabel : ui.freeDemo;

  const portalProductUrl = `${ui.portalBaseUrl}/products/${product.id}`;
  const demoAccounts = mergeDemoAccounts(product, catalogProduct);
  const entryLinks = mergeEntryLinks(product, catalogProduct, lang);

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: canonicalUrl,
    image: ogImageUrl,
    description: pageDesc,
    provider: {
      '@type': 'Organization',
      name: ui.orgName,
      url: 'https://empasy.io/',
    },
    inLanguage: ui.htmlLang,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.homeLabel, item: `https://empasy.io${ui.homeUrl}` },
      { '@type': 'ListItem', position: 2, name: ui.solutionsLabel, item: `https://empasy.io${ui.solutionsAnchorUrl}` },
      { '@type': 'ListItem', position: 3, name: product.name, item: canonicalUrl },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (product.faqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const tabsHtml = slides
    .map(
      (slide, idx) => `
                            <button type="button" role="tab" class="sol-showcase-tab${idx === 0 ? ' active' : ''}"
                                aria-selected="${idx === 0 ? 'true' : 'false'}"
                                data-sol-tab
                                data-slide-title="${escapeHtml(slide.title)}"
                                data-slide-route="${escapeHtml(slide.routeLabel)}"
                                data-slide-summary="${escapeHtml(slide.summary)}"
                                data-slide-img="${escapeHtml(slide.imgSrc)}"
                                data-slide-demo="${escapeHtml(slide.demoUrl)}"
                                data-slide-external="${slide.demoExternal ? 'true' : 'false'}">
                                ${escapeHtml(slide.tabLabel)}
                            </button>`,
    )
    .join('');

  const legacyItemsHtml = (product.vsLegacyPoints || [])
    .map(
      (pt) => `
                            <li>
                                <span class="sol-compare-mark is-minus" aria-hidden="true">&#8722;</span>
                                <span>${escapeHtml(pt)}</span>
                            </li>`,
    )
    .join('');

  const afterItemsHtml = (product.vsAfterPoints || [])
    .map(
      (pt) => `
                            <li>
                                <span class="sol-compare-mark is-plus" aria-hidden="true">&#10003;</span>
                                <span>${escapeHtml(pt)}</span>
                            </li>`,
    )
    .join('');

  const featuresHtml = (product.features || [])
    .map(
      (feat) => `
                    <article class="sol-feature-card">
                        <span class="sol-feature-no">${escapeHtml(feat.badgeNo)}</span>
                        <h3>${escapeHtml(feat.title)}</h3>
                        <p>${escapeHtml(feat.description)}</p>
                    </article>`,
    )
    .join('');

  const stepsHtml = (product.steps || [])
    .map(
      (step) => `
                        <div class="sol-step-card">
                            <span class="sol-step-label">STEP 0${escapeHtml(step.stepNo)}</span>
                            <h4>${escapeHtml(step.title)}</h4>
                            <p>${escapeHtml(step.description)}</p>
                        </div>`,
    )
    .join('');

  const entryLinksHtml = entryLinks
    .map((link) => {
      const targetAttrs = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      const arrow = link.external ? ' &#8599;' : '';
      return `
                        <div class="sol-entry-card${link.isPrimary ? ' is-primary' : ''}">
                            <div class="sol-entry-info">
                                <div class="sol-entry-title">${escapeHtml(link.label)}</div>
                                <p class="sol-entry-desc">${escapeHtml(link.description)}</p>
                            </div>
                            <a href="${escapeHtml(link.url)}"${targetAttrs} class="btn btn-sm ${link.isPrimary ? 'btn-primary' : 'btn-outline'}">${escapeHtml(link.buttonText)}${arrow}</a>
                        </div>`;
    })
    .join('');

  const primaryAcc = demoAccounts[0];
  const secondaryAccs = demoAccounts.slice(1);
  const primaryAccHtml = primaryAcc ? renderAccountBox(primaryAcc, ui, true) : '';
  const secondaryAccHtml =
    secondaryAccs.length > 0
      ? `
                        <details class="sol-more-accounts">
                            <summary>${escapeHtml(ui.moreAccountsPrefix)}${secondaryAccs.length}${escapeHtml(ui.moreAccountsSuffix)}</summary>
                            <div class="sol-more-accounts-list">
                                ${secondaryAccs.map((a) => renderAccountBox(a, ui, false)).join('')}
                            </div>
                        </details>`
      : '';

  const quickTryHtml =
    (product.quickTryPoints || []).length > 0
      ? `
                <div class="sol-try-box">
                    <h3 class="sol-try-title">${escapeHtml(ui.quickTryTitle)}</h3>
                    <div class="sol-try-grid">
                        ${product.quickTryPoints
                          .map(
                            (pt) => `
                        <div class="sol-try-card">
                            <div class="sol-try-meta">
                                <span class="sol-try-step">0${escapeHtml(pt.step)}</span>
                                <span class="sol-try-menu">${escapeHtml(pt.menuName)}</span>
                            </div>
                            <h4>${escapeHtml(pt.title)}</h4>
                            <p>${escapeHtml(pt.tip)}</p>
                        </div>`,
                          )
                          .join('')}
                    </div>
                </div>`
      : '';

  const adoptionHtml = (product.adoptionCards || [])
    .map(
      (card) => `
                    <div class="sol-adoption-card">
                        <h3>${escapeHtml(card.title)}</h3>
                        <p>${escapeHtml(card.description)}</p>
                    </div>`,
    )
    .join('');

  const faqsHtml = (product.faqs || [])
    .map(
      (faq, idx) => `
                    <div class="faq-item">
                        <details${idx === 0 ? ' open' : ''}>
                            <summary>${escapeHtml(faq.question)}</summary>
                            <div class="faq-answer">${escapeHtml(faq.answer)}</div>
                        </details>
                    </div>`,
    )
    .join('');

  const relatedHtml = (product.relatedProducts || [])
    .map(
      (rel) => `
                    <a href="/${lang}/solutions/${escapeHtml(rel.id)}.html" class="sol-related-card">
                        <span class="sol-related-cat">${escapeHtml(rel.category)}</span>
                        <h3>${escapeHtml(rel.name)}</h3>
                        <p>${escapeHtml(rel.description)}</p>
                        <span class="sol-related-more">${escapeHtml(ui.learnMore)} &#8594;</span>
                    </a>`,
    )
    .join('');

  const firstRouteIsAscii = /^[A-Za-z0-9._/:-]+$/.test(firstSlide.routeLabel || '');
  const firstDemoAttrs = firstSlide.demoExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const firstDemoArrow = firstSlide.demoExternal ? '<span aria-hidden="true">&#8599;</span>' : '<span aria-hidden="true">&#8594;</span>';
  const primaryCtaTarget = primaryCtaIsExternal ? ' target="_blank" rel="noopener noreferrer"' : '';

  return `<!DOCTYPE html>
<html lang="${ui.htmlLang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(pageDesc)}">
    <meta name="author" content="${escapeHtml(ui.orgName)}">
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="alternate" hreflang="ko" href="${koUrl}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="ja" href="${jaUrl}">
    <link rel="alternate" hreflang="x-default" href="${koUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escapeHtml(ui.siteName)}">
    <meta property="og:locale" content="${ui.ogLocale}">
    <meta property="og:title" content="${escapeHtml(pageTitle)}">
    <meta property="og:description" content="${escapeHtml(pageDesc)}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${ogImageUrl}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
    <meta name="twitter:description" content="${escapeHtml(pageDesc)}">
    <meta name="twitter:image" content="${ogImageUrl}">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
    <link rel="stylesheet" href="/assets/css/style.css">
    <script type="application/ld+json">
${escapeJsonLd(softwareJsonLd)}
    </script>
    <script type="application/ld+json">
${escapeJsonLd(breadcrumbJsonLd)}
    </script>
    <script type="application/ld+json">
${escapeJsonLd(faqJsonLd)}
    </script>
</head>
<body class="sol-page">
    {{> ${ui.headerPartial} }}

    <main id="main-content">
        <section class="sol-hero">
            <div class="container">
                <nav class="sol-breadcrumb" aria-label="Breadcrumb">
                    <a href="${ui.homeUrl}">${escapeHtml(ui.homeLabel)}</a>
                    <span aria-hidden="true">/</span>
                    <a href="${ui.solutionsAnchorUrl}">${escapeHtml(ui.solutionsLabel)}</a>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page" class="sol-product-name">${escapeHtml(product.name)}</span>
                </nav>

                <div class="sol-hero-copy">
                    <p class="sol-eyebrow">${escapeHtml(product.categoryLabel)}</p>
                    <h1 class="sol-title">${escapeHtml(product.headline)}</h1>
                    <p class="sol-subtitle">${escapeHtml(product.subheadline)}</p>

                    <div class="sol-actions">
                        <a href="${escapeHtml(primaryCtaHref)}"${primaryCtaTarget} class="btn btn-primary">${escapeHtml(primaryCtaLabel)}</a>
                        <a href="${ui.contactUrl}" class="btn btn-outline">${escapeHtml(ui.contactSales)}</a>
                        <a href="${proposalPdfHref}" target="_blank" rel="noopener noreferrer" class="sol-secondary-link">${escapeHtml(ui.proposalPdfLabel)} &#8599;</a>
                        <a href="${portalProductUrl}" target="_blank" rel="noopener noreferrer" class="sol-secondary-link">${escapeHtml(ui.demoPortalLink)} &#8599;</a>
                    </div>
                </div>

                <nav class="sol-anchor-nav" aria-label="${escapeHtml(product.name)}">
                    <a href="#screens">${escapeHtml(ui.navOverview)}</a>
                    <a href="#features">${escapeHtml(ui.navFeatures)}</a>
                    <a href="#demo">${escapeHtml(ui.navDemo)}</a>
                    <a href="#faq">${escapeHtml(ui.navFaq)}</a>
                </nav>

                <div id="screens" class="sol-showcase-wrap" data-sol-showcase data-sol-product="${escapeHtml(product.name)}">
                    <div class="sol-showcase-tabs" role="tablist" aria-label="${escapeHtml(ui.tabsAria)}">${tabsHtml}
                    </div>

                    <div class="sol-showcase-frame">
                        <div class="sol-showcase-bar">
                            <div class="sol-showcase-bar-left">
                                <span class="sol-showcase-title" data-sol-title>${escapeHtml(firstSlide.title)}</span>
                                <span class="sol-showcase-route${firstRouteIsAscii ? ' is-mono' : ''}" data-sol-route>${escapeHtml(firstSlide.routeLabel)}</span>
                            </div>
                            <div class="sol-showcase-bar-actions">
                                <button type="button" class="sol-zoom-btn" data-sol-zoom aria-label="${escapeHtml(ui.zoomAria)}">${escapeHtml(ui.zoom)}</button>
                                <a href="${escapeHtml(firstSlide.demoUrl)}"${firstDemoAttrs} class="sol-demo-link" data-sol-demo-link>
                                    <span class="sol-link-desktop">${escapeHtml(ui.openLiveDesktop)}</span>
                                    <span class="sol-link-mobile">${escapeHtml(ui.openLiveMobile)}</span>
                                    ${firstDemoArrow}
                                </a>
                            </div>
                        </div>

                        <div class="sol-showcase-viewport">
                            <button type="button" class="sol-img-btn" data-sol-img-btn aria-label="${escapeHtml(product.name)} ${escapeHtml(firstSlide.title)}">
                                <img src="${escapeHtml(firstSlide.imgSrc)}" alt="${escapeHtml(product.name)} - ${escapeHtml(firstSlide.title)}" class="sol-showcase-img" loading="eager" data-sol-img>
                            </button>
                        </div>
                    </div>

                    <p class="sol-showcase-caption" data-sol-caption>${escapeHtml(firstSlide.summary)}</p>
                </div>
            </div>
        </section>

        <section class="ed-section ed-section-tinted">
            <div class="container">
                <div class="ed-head">
                    <p class="ed-kicker">${escapeHtml(ui.beforeAfterKicker)}</p>
                    <h2 class="ed-title">${escapeHtml(ui.beforeAfterTitle)}</h2>
                    <p class="ed-desc">${escapeHtml(product.summary)}</p>
                </div>

                <div class="sol-compare-grid">
                    <div class="sol-compare-card is-before">
                        <h3>${escapeHtml(product.vsLegacyTitle)}</h3>
                        <ul>${legacyItemsHtml}
                        </ul>
                    </div>

                    <div class="sol-compare-card is-after">
                        <h3>${escapeHtml(product.vsAfterTitle)}</h3>
                        <ul>${afterItemsHtml}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" class="ed-section">
            <div class="container">
                <div class="ed-head">
                    <p class="ed-kicker">${escapeHtml(ui.featuresKicker)}</p>
                    <h2 class="ed-title">${escapeHtml(buildWhatYouCanDo(lang, ui, product))}</h2>
                </div>

                <div class="sol-features-grid">${featuresHtml}
                </div>

                <div class="sol-steps-block">
                    <h3 class="sol-sub-heading">${escapeHtml(ui.stepsHeading)}</h3>
                    <div class="sol-steps-grid">${stepsHtml}
                    </div>
                </div>
            </div>
        </section>

        <section id="demo" class="ed-section ed-section-tinted">
            <div class="container">
                <div class="ed-head">
                    <p class="ed-kicker">${escapeHtml(ui.demoKicker)}</p>
                    <h2 class="ed-title">${escapeHtml(ui.demoTitle)}</h2>
                    <p class="ed-desc">${escapeHtml(product.resetNotice)}</p>
                </div>

                <div class="sol-demo-grid">
                    <div class="sol-demo-panel">
                        <h3 class="sol-panel-title">${escapeHtml(ui.step1Title)}</h3>
                        <div class="sol-entry-stack">${entryLinksHtml}
                        </div>
                    </div>

                    <div class="sol-demo-panel">
                        <h3 class="sol-panel-title">${escapeHtml(ui.step2Title)}</h3>${primaryAccHtml}${secondaryAccHtml}
                    </div>
                </div>${quickTryHtml}
            </div>
        </section>

        <section id="faq" class="ed-section">
            <div class="container">
                <div class="ed-head">
                    <p class="ed-kicker">${escapeHtml(ui.adoptionKicker)}</p>
                    <h2 class="ed-title">${escapeHtml(ui.adoptionTitle)}</h2>
                    <p class="ed-desc">${escapeHtml(ui.adoptionDesc)}</p>
                </div>

                <div class="sol-adoption-grid">${adoptionHtml}
                </div>

                <div class="sol-faq-block">
                    <h3 class="sol-sub-heading">${escapeHtml(ui.faqHeading)}</h3>
                    <div class="sol-faq-list">${faqsHtml}
                    </div>
                </div>

                <div class="ed-doc-callout sol-tech-callout">
                    <p>${escapeHtml(ui.techDocBannerText)}</p>
                    <a href="${escapeHtml(product.docUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">${escapeHtml(ui.techDocBannerLink)} &#8599;</a>
                </div>
            </div>
        </section>

        <section class="ed-section ed-section-tinted sol-related-section">
            <div class="container">
                <div class="sol-related-head">
                    <div>
                        <p class="ed-kicker">${escapeHtml(ui.relatedKicker)}</p>
                        <h2 class="sol-related-title">${escapeHtml(buildFrequentlyPaired(lang, ui, product))}</h2>
                    </div>
                    <a href="${ui.solutionsAnchorUrl}" class="sol-all-link">${escapeHtml(ui.viewAllSolutions)} &#8594;</a>
                </div>

                <div class="sol-related-grid">${relatedHtml}
                </div>
            </div>
        </section>
    </main>

    {{> ${ui.footerPartial} }}

    <div id="sol-lightbox" class="sol-lightbox" role="dialog" aria-modal="true" aria-label="${escapeHtml(product.name)}">
        <div class="sol-lightbox-bar">
            <span id="sol-lightbox-title" class="sol-lightbox-title">${escapeHtml(firstSlide.title)}</span>
            <button type="button" id="sol-lightbox-close" class="sol-lightbox-close" aria-label="${escapeHtml(ui.closeZoomAria)}">${escapeHtml(ui.close)}</button>
        </div>
        <div class="sol-lightbox-stage">
            <img id="sol-lightbox-img" src="${escapeHtml(firstSlide.imgSrc)}" alt="${escapeHtml(product.name)}" class="sol-lightbox-img">
        </div>
        <p class="sol-lightbox-hint">${escapeHtml(ui.lightboxHint)}</p>
    </div>

    <div id="sol-copy-toast" class="sol-copy-toast" role="status" aria-live="polite" aria-atomic="true"></div>

    <script type="module" src="/assets/js/solution-page.js"></script>
</body>
</html>
`;
}

let generatedCount = 0;

for (const lang of LOCALES) {
  const catalogMap = loadCatalogByLocale(lang);
  const outDir = resolve(empasyRoot, lang, 'solutions');
  mkdirSync(outDir, { recursive: true });

  for (const productMeta of PRODUCTS) {
    const productData = loadHomepageProductData(productMeta.id, lang);
    const catalogProduct = catalogMap.get(productMeta.id);
    const html = buildPageHtml(productMeta, productData, catalogProduct, lang);
    const outPath = resolve(outDir, `${productMeta.id}.html`);
    writeFileSync(outPath, html, 'utf-8');
    generatedCount += 1;
  }
}

console.log(`[generate-solution-pages] Generated ${generatedCount} localized solution pages in sites/empasy.io/{ko,en,ja}/solutions/`);
