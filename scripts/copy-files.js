import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const DIST_DIR = 'dist';
const SRC_DIR = 'src/pages';

// Mapping of HTML files to their corresponding JSX files
const FILE_MAPPING = {
    'hydra.html': 'Hydra.jsx',
    'syncboot.html': 'SyncBoot.jsx',
    'synceta.html': 'SyncEta.jsx',
    'syncapim.html': 'SyncAPIM.jsx',
    'synccms.html': 'SyncCMS.jsx',
    'use-cases.html': 'UseCases.jsx',
    'company.html': 'Company.jsx',
    'contact.html': 'Contact.jsx',
};


// Get the list of filenames from the environment variable
const files = process.env.COPY_FILES;
if (!files) {
    console.error('COPY_FILES is not defined in the .env file.');
    process.exit(1);
}

const filenames = files.split(',');
const sourceFile = 'dist/index.html';

// Check if the source file exists
if (!fs.existsSync(sourceFile)) {
    console.error(`Source file "${sourceFile}" does not exist.`);
    process.exit(1);
}

// Copy dist/index.html to each specified file
filenames.forEach((file) => {
    const targetPath = path.join('dist', file);
    try {
        fs.copyFileSync(sourceFile, targetPath);
        console.log(`Copied "${sourceFile}" to "${targetPath}"`);
    } catch (error) {
        console.error(`Failed to copy "${sourceFile}" to "${targetPath}":`, error);
    }
});



function extractMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const metadataMatch = content.match(/const\s+metadata\s*=\s*({[\s\S]*?});/);

        if (metadataMatch) {
            // Parse the metadata object
            const metadataStr = metadataMatch[1];
            // Using eval is not ideal but works for this specific case since we control the source
            const metadata = eval(`(${metadataStr})`);
            return metadata;
        }
    } catch (error) {
        console.error(`Error extracting metadata from ${filePath}:`, error);
    }
    return null;
}

function injectMetadata(htmlFile, metadata) {
    try {
        const htmlPath = path.join(DIST_DIR, htmlFile);
        let htmlContent = fs.readFileSync(htmlPath, { encoding: 'utf-8'});

        // Create meta tags
        const metaTags = [];
        if (metadata.title) {
            metaTags.push(`<title>${metadata.title}</title>`);
            metaTags.push(`<meta name="title" content="${metadata.title}">`);
            metaTags.push(`<meta property="og:title" content="${metadata.title}">`);
        }
        if (metadata.description) {
            metaTags.push(`<meta name="description" content="${metadata.description}">`);
            metaTags.push(`<meta property="og:description" content="${metadata.description}">`);
        }
        if (metadata.keywords) {
            metaTags.push(`<meta name="keywords" content="${metadata.keywords}">`);
        }
        if (metadata.author) {
            metaTags.push(`<meta name="author" content="${metadata.author}">`);
        }
        metaTags.push(`<meta property="og:image" content="https://www.empasy.com/favicon.png">`);

        // Insert meta tags after <head>
        htmlContent = htmlContent.replace(
            /<head>/i,
            `<head>\n    ${metaTags.join('\n    ')}`
        );

        fs.writeFileSync(htmlPath, htmlContent);
        console.log(`✓ Injected metadata into ${htmlFile}`);
    } catch (error) {
        console.error(`Error injecting metadata into ${htmlFile}:`, error);
    }
}

function main() {
    try {
        // Process each file in the mapping
        for (const [htmlFile, jsxPath] of Object.entries(FILE_MAPPING)) {
            const fullJsxPath = path.join(SRC_DIR, jsxPath);
            
            if (!fs.existsSync(fullJsxPath)) {
                console.warn(`Source file not found: ${fullJsxPath}. Skipping metadata injection for ${htmlFile}.`);
                continue;
            }

            const metadata = extractMetadata(fullJsxPath);

            if (metadata) {
                injectMetadata(htmlFile, metadata);
            } else {
                console.warn(`No metadata found for ${htmlFile}`);
            }
        }
    } catch (error) {
        console.error('Error processing files:', error);
        process.exit(1);
    }
}

main();
