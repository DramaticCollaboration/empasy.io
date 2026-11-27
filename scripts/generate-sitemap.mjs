import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const SITE_ORIGIN = 'https://empasy.io';

function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildGitLastModMap() {
  const lastModMap = new Map();
  try {
    const out = execFileSync(
      'git',
      ['log', '--format=COMMIT:%cI', '--name-only'],
      {
        cwd: rootDir,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      },
    );
    let currentDate = null;
    for (const rawLine of out.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line) continue;
      if (line.startsWith('COMMIT:')) {
        currentDate = line.slice('COMMIT:'.length).trim();
      } else if (currentDate && !lastModMap.has(line)) {
        lastModMap.set(line, currentDate);
      }
    }
  } catch {
    // fallback to mtime
  }
  return lastModMap;
}

const gitLastModMap = buildGitLastModMap();

function getGitLastMod(relFile) {
  const fromGit = gitLastModMap.get(relFile);
  if (fromGit) return fromGit;
  return fs.statSync(path.join(rootDir, relFile)).mtime.toISOString();
}

function toPublicUrl(relFile) {
  if (relFile === 'index.html') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}/${relFile}`;
}

function getLogicalKey(relFile) {
  if (relFile === 'index.html') return { lang: 'ko', key: 'pages/index.html' };
  const match = relFile.match(/^(ko|en|ja)\/(.+)$/);
  if (!match) return null;
  return { lang: match[1], key: match[2] };
}

function getPriority(relFile) {
  if (relFile === 'index.html') return '1.0';
  if (relFile === 'en/pages/index.html' || relFile === 'ja/pages/index.html') return '0.9';
  if (relFile.endsWith('/download_eta.html')) return '0.9';
  if (relFile.endsWith('/solutions/sync-verse.html')) return '0.9';
  if (relFile.includes('/solutions/')) return '0.8';
  if (relFile.includes('/pages/')) return '0.8';
  if (relFile.includes('/blog/')) return '0.7';
  return '0.7';
}

function main() {
  const htmlFiles = globSync('**/*.html', {
    cwd: rootDir,
    ignore: ['node_modules/**', 'dist/**', 'components/**', 'docs/**', '.gemini/**'],
  })
    .map((f) => f.replace(/\\/g, '/'))
    .sort();

  const excluded = [];
  const included = [];
  const groups = new Map();

  for (const relFile of htmlFiles) {
    if (
      relFile === '404.html' ||
      relFile.startsWith('naver') ||
      relFile === 'ko/pages/index.html'
    ) {
      excluded.push({ relFile, reason: 'system-or-duplicate-redirect' });
      continue;
    }

    const html = fs.readFileSync(path.join(rootDir, relFile), 'utf8');
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
      excluded.push({ relFile, reason: 'meta-noindex' });
      continue;
    }

    const info = getLogicalKey(relFile);
    if (!info) {
      excluded.push({ relFile, reason: 'unmapped-path' });
      continue;
    }

    const url = toPublicUrl(relFile);
    const lastmod = getGitLastMod(relFile);
    const priority = getPriority(relFile);
    const entry = { relFile, url, lastmod, priority, lang: info.lang, key: info.key };
    included.push(entry);

    if (!groups.has(info.key)) {
      groups.set(info.key, {});
    }
    groups.get(info.key)[info.lang] = url;
  }

  // Deterministic ordering: home pages first, then ko -> en -> ja grouped cleanly
  const langOrder = { ko: 0, en: 1, ja: 2 };
  included.sort((a, b) => {
    if (a.key === 'pages/index.html' && b.key !== 'pages/index.html') return -1;
    if (b.key === 'pages/index.html' && a.key !== 'pages/index.html') return 1;
    if (a.key !== b.key) return a.key.localeCompare(b.key);
    return langOrder[a.lang] - langOrder[b.lang];
  });

  const urlNodes = included.map((entry) => {
    const alternates = groups.get(entry.key) || {};
    const altLines = [];
    for (const lang of ['ko', 'en', 'ja']) {
      if (alternates[lang]) {
        altLines.push(`    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(alternates[lang])}" />`);
      }
    }
    if (alternates.ko) {
      altLines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alternates.ko)}" />`);
    }
    return [
      '  <url>',
      `    <loc>${escapeXml(entry.url)}</loc>`,
      ...altLines,
      `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
      `    <priority>${entry.priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlNodes.join('\n')}
</urlset>
`;

  // Write clean UTF-8 without BOM to root sitemap.xml (deployed by main.yml)
  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf8');

  // Ensure robots.txt has no UTF-8 BOM
  const robotsPath = path.join(rootDir, 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const rawRobots = fs.readFileSync(robotsPath, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    fs.writeFileSync(robotsPath, rawRobots, 'utf8');
  }

  console.log(
    `[empasy.io generate-sitemap] Wrote ${included.length} indexable URLs (excluded ${excluded.length}: ${excluded
      .map((e) => `${e.relFile}[${e.reason}]`)
      .join(', ')})`,
  );
}

main();
