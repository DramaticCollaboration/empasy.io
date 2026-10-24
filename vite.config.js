import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Find all HTML files, excluding node_modules, components, and build output
const htmlFiles = globSync('**/*.html', {
    ignore: ['node_modules/**', 'dist/**', 'components/**', 'docs/**', '.gemini/**']
});

const input = {};
htmlFiles.forEach((file) => {
    // Replace backslashes for Windows, remove .html extension, and create a unique name
    const name = file.replace(/\\/g, '/').replace(/\.html$/, '').replace(/\//g, '_');
    input[name] = resolve(__dirname, file);
});

const analyticsHeadSnippet = `
    <!-- Google Analytics (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-6BNPM5TX7C"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-6BNPM5TX7C');
    </script>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KPMTVVXN');</script>
    <!-- End Google Tag Manager -->`;

export default defineConfig({
    server: {
        port: 5174
    },
    build: {
        rollupOptions: {
            input
        }
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'components'),
        }),
        {
            name: 'empasy-analytics-inject',
            transformIndexHtml(html, ctx) {
                let updated = html;
                if (!updated.includes('G-6BNPM5TX7C') || !updated.includes('GTM-KPMTVVXN')) {
                    updated = updated.replace('<head>', `<head>${analyticsHeadSnippet}`);
                }
                if (ctx && ctx.filename && !updated.includes('rel="canonical"')) {
                    const relPath = ctx.filename.replace(/\\/g, '/').split('/empasy.io/')[1] || '';
                    if (relPath && !relPath.startsWith('naver') && relPath !== '404.html') {
                        let canonicalHref = `https://empasy.io/${relPath}`;
                        let extraTags = '';
                        if (relPath === 'index.html' || relPath === 'ko/pages/index.html') {
                            canonicalHref = 'https://empasy.io/';
                        } else if (relPath.endsWith('/pages/download_eta.html')) {
                            const lang = relPath.split('/')[0];
                            canonicalHref = `https://empasy.io/${lang}/download_eta.html`;
                            extraTags = '\n    <meta name="robots" content="noindex, follow">';
                        }
                        updated = updated.replace('</head>', `    <link rel="canonical" href="${canonicalHref}">${extraTags}\n</head>`);
                    }
                }
                return updated;
            }
        }
    ],
});
