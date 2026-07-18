const fs = require('fs');
const path = require('path');
const glob = require('glob');

const domain = 'https://empasy.io';

// 1. Read existing sitemap.xml and change domain
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
sitemap = sitemap.replace(/https:\/\/empasy\.com/g, domain);

// The sitemap ends with </urlset>. We will remove it, add the new urls, and append it back.
sitemap = sitemap.replace('</urlset>', '');

// 2. Scan docs/ for markdown files
const docsPath = path.join(__dirname, 'docs');
const mdFiles = glob.sync('**/*.md', { cwd: docsPath, ignore: ['node_modules/**', '.vitepress/**', 'README.md'] });

const today = new Date().toISOString();

for (const file of mdFiles) {
  // Apply rewrite rule
  let urlPath = file;
  if (urlPath.startsWith('ko/')) {
    urlPath = urlPath.substring(3);
  } else if (urlPath === 'ko') {
    urlPath = '';
  }

  // Change .md to clean URL
  if (urlPath.endsWith('index.md')) {
    urlPath = urlPath.replace('index.md', '');
  } else if (urlPath.endsWith('.md')) {
    urlPath = urlPath.replace('.md', '.html'); // Assuming cleanUrls: true actually outputs clean URLs, but wait: VitePress generates clean URLs like /agile/ without .html!
    urlPath = urlPath.replace('.html', '/');
  }

  // Format URL path
  urlPath = urlPath.replace(/\\/g, '/');
  if (urlPath && !urlPath.endsWith('/')) {
    urlPath += '/';
  }

  const loc = `${domain}/docs/${urlPath}`;

  sitemap += `  <url>\n`;
  sitemap += `    <loc>${loc}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `    <priority>0.8</priority>\n`;
  sitemap += `  </url>\n`;
}

sitemap += '</urlset>\n';

fs.writeFileSync('sitemap.xml', sitemap);
console.log('Sitemap successfully updated with https://empasy.io domain and VitePress docs URLs.');
