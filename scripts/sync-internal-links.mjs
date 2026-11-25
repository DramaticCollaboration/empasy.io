import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const empasyRoot = resolve(__dirname, '..');

const PRODUCT_SUBDOMAINS = [
  'verse',
  'eta',
  'boot',
  'cms',
  'insight',
  'llm',
  'crawl',
  'apim',
  'watch',
  'shop',
  'ops',
];

const SUB_PATTERN = PRODUCT_SUBDOMAINS.join('|');
const SUB_URL_RE = new RegExp(
  `https://(${SUB_PATTERN})\\.empasy\\.io(?:/(en|ja))?/?`,
  'g',
);

function detectFileLang(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  if (norm.startsWith('en/') || norm.endsWith('_en.html')) return 'en';
  if (norm.startsWith('ja/') || norm.endsWith('_ja.html')) return 'ja';
  return 'ko';
}

function collectFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.git') continue;
    const full = resolve(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      collectFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

let updatedCount = 0;

for (const filePath of collectFiles(empasyRoot)) {
  const rel = relative(empasyRoot, filePath).replace(/\\/g, '/');
  if (rel.startsWith('scripts/') || rel.includes('/solutions/')) continue;

  const isHtml = rel.endsWith('.html');
  const isLlms = rel === 'llms.txt' || rel === 'public/llms.txt';
  const isSitemap = rel === 'public/sitemap.xml';
  if (!isHtml && !isLlms && !isSitemap) continue;

  const original = readFileSync(filePath, 'utf-8');
  let next = original;
  const fileLang = detectFileLang(rel);

  if (isSitemap) {
    next = next.replace(
      /(<loc>https:\/\/empasy\.io\/(?:ko|en|ja)\/solutions\/sync-[a-z]+\.html<\/loc>\r?\n\s*<lastmod>)[^<]+(<\/lastmod>)/g,
      '$12026-11-25T00:00:00+09:00$2',
    );
  } else if (isLlms) {
    next = next.replace(SUB_URL_RE, (_m, sub, urlLang) => {
      const lang = urlLang || 'ko';
      return `https://empasy.io/${lang}/solutions/sync-${sub}.html`;
    });
    next = next.replace(/https:\/\/sync\.empasy\.io/g, 'https://demo.empasy.io');
    next = next.replace(/\(sync\.empasy\.io\)/g, '(demo.empasy.io)');
  } else if (isHtml) {
    // 1. Replace finder JSON demoUrl pointing to old product subdomains with demo.empasy.io product page
    next = next.replace(
      new RegExp(`"demoUrl":\\s*"https://(${SUB_PATTERN})\\.empasy\\.io(?:/(en|ja))?/?"`, 'g'),
      (_m, sub, urlLang) => {
        const lang = urlLang || fileLang;
        const prefix = lang === 'ko' ? '' : `/${lang}`;
        return `"demoUrl": "https://demo.empasy.io${prefix}/products/sync-${sub}"`;
      },
    );

    // 2. Replace 404.html synceta fallback redirect
    if (rel === '404.html') {
      next = next.replace(
        "window.location.replace('https://eta.empasy.io/');",
        "window.location.replace('/ko/solutions/sync-eta.html');",
      );
    }

    // 3. Replace all product homepage URLs with internal /{lang}/solutions/sync-{sub}.html
    next = next.replace(SUB_URL_RE, (_m, sub, urlLang) => {
      const lang = urlLang || fileLang;
      return `/${lang}/solutions/sync-${sub}.html`;
    });

    // 4. Remove target="_blank" rel="noopener noreferrer" from now-internal /solutions/ anchors
    next = next.replace(
      /(href="\/(?:ko|en|ja)\/solutions\/sync-[a-z]+\.html")\s+target="_blank"\s+rel="noopener noreferrer"/g,
      '$1',
    );

    // 5. Update external arrow to internal arrow on internal solution action buttons
    next = next.replace(
      /(href="\/(?:ko|en|ja)\/solutions\/sync-[a-z]+\.html"[^>]*>)([^<]*?)&#8599;(<\/a>)/g,
      (_m, openTag, label, closeTag) => {
        if (openTag.includes('emp-arch-launch')) {
          return `${openTag}&#8594;${closeTag}`;
        }
        return `${openTag}${label}&#8594;${closeTag}`;
      },
    );

    // 6. Update sync.empasy.io -> demo.empasy.io
    next = next.replace(/https:\/\/sync\.empasy\.io/g, 'https://demo.empasy.io');
    next = next.replace(/\(sync\.empasy\.io\)/g, '(demo.empasy.io)');
  }

  if (next !== original) {
    writeFileSync(filePath, next, 'utf-8');
    updatedCount += 1;
  }
}

// Keep index.html and ko/pages/index.html byte-identical
const rootIndexPath = resolve(empasyRoot, 'index.html');
const koIndexPath = resolve(empasyRoot, 'ko', 'pages', 'index.html');
const rootIndex = readFileSync(rootIndexPath, 'utf-8');
const koIndex = readFileSync(koIndexPath, 'utf-8');
if (rootIndex !== koIndex) {
  writeFileSync(koIndexPath, rootIndex, 'utf-8');
}

console.log(`[sync-internal-links] Updated ${updatedCount} files in sites/empasy.io`);
