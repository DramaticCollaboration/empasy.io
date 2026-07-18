import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import { globSync } from 'glob';

// Find all HTML files, excluding node_modules, components, and build output
const htmlFiles = globSync('**/*.html', {
    ignore: ['node_modules/**', 'dist/**', 'components/**', '.gemini/**']
});

const input = {};
htmlFiles.forEach((file) => {
    // Replace backslashes for Windows, remove .html extension, and create a unique name
    const name = file.replace(/\\/g, '/').replace(/\.html$/, '').replace(/\//g, '_');
    input[name] = resolve(__dirname, file);
});

export default defineConfig({
    build: {
        rollupOptions: {
            input
        }
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'components'),
        }),
    ],
});
