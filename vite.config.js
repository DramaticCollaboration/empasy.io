import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { globSync } from 'glob';

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
            transformIndexHtml(html) {
                if (html.includes('G-6BNPM5TX7C') && html.includes('GTM-KPMTVVXN')) {
                    return html;
                }
                return html.replace('<head>', `<head>${analyticsHeadSnippet}`);
            }
        }
    ],
});

