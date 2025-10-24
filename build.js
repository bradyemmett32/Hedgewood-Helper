const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Hedgewood Helper...\n');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
    console.log('✓ Created dist directory');
}

// Minify JavaScript files
console.log('\n📦 Minifying JavaScript files...');
try {
    execSync('npx terser script.js -o dist/script.min.js -c -m', { stdio: 'inherit' });
    console.log('✓ Minified script.js');

    execSync('npx terser data.js -o dist/data.min.js -c -m', { stdio: 'inherit' });
    console.log('✓ Minified data.js');

    execSync('npx terser foraging.js -o dist/foraging.min.js -c -m', { stdio: 'inherit' });
    console.log('✓ Minified foraging.js');

    execSync('npx terser foraging-data.js -o dist/foraging-data.min.js -c -m', { stdio: 'inherit' });
    console.log('✓ Minified foraging-data.js');
} catch (error) {
    console.error('❌ Error minifying JavaScript:', error.message);
    process.exit(1);
}

// Minify CSS files
console.log('\n🎨 Minifying CSS files...');
try {
    execSync('npx cleancss -o dist/styles.min.css styles.css', { stdio: 'inherit' });
    console.log('✓ Minified styles.css');

    execSync('npx cleancss -o dist/foraging.min.css foraging.css', { stdio: 'inherit' });
    console.log('✓ Minified foraging.css');
} catch (error) {
    console.error('❌ Error minifying CSS:', error.message);
    process.exit(1);
}

// Minify service worker if it exists
if (fs.existsSync('sw.js')) {
    console.log('\n⚙️  Minifying service worker...');
    try {
        execSync('npx terser sw.js -o dist/sw.min.js -c -m', { stdio: 'inherit' });
        console.log('✓ Minified sw.js');
    } catch (error) {
        console.error('❌ Error minifying service worker:', error.message);
    }
}

// Copy HTML files to dist with optimizations
console.log('\n📄 Processing HTML files...');

// Process index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml
    .replace('href="styles.css"', 'href="dist/styles.min.css"')
    .replace('<script src="data.js"></script>', '<script src="dist/data.min.js" defer></script>')
    .replace('<script src="script.js"></script>', '<script src="dist/script.min.js" defer></script>');

// Add preload hints and service worker registration before closing body tag
const indexSwSnippet = `
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('dist/sw.min.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker registration failed'));
            });
        }
    </script>
</body>`;
indexHtml = indexHtml.replace('</body>', indexSwSnippet);

fs.writeFileSync('index-optimized.html', indexHtml);
console.log('✓ Created index-optimized.html');

// Process foraging.html
let foragingHtml = fs.readFileSync('foraging.html', 'utf8');
foragingHtml = foragingHtml
    .replace('href="styles.css"', 'href="dist/styles.min.css"')
    .replace('href="foraging.css"', 'href="dist/foraging.min.css"')
    .replace('<script src="foraging-data.js"></script>', '<script src="dist/foraging-data.min.js" defer></script>')
    .replace('<script src="foraging.js"></script>', '<script src="dist/foraging.min.js" defer></script>');

// Add service worker registration
const foragingSwSnippet = `
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('dist/sw.min.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker registration failed'));
            });
        }
    </script>
</body>`;
foragingHtml = foragingHtml.replace('</body>', foragingSwSnippet);

fs.writeFileSync('foraging-optimized.html', foragingHtml);
console.log('✓ Created foraging-optimized.html');

// Calculate file size savings
console.log('\n📊 File Size Analysis:');

const files = [
    { original: 'script.js', minified: 'dist/script.min.js' },
    { original: 'data.js', minified: 'dist/data.min.js' },
    { original: 'foraging.js', minified: 'dist/foraging.min.js' },
    { original: 'foraging-data.js', minified: 'dist/foraging-data.min.js' },
    { original: 'styles.css', minified: 'dist/styles.min.css' },
    { original: 'foraging.css', minified: 'dist/foraging.min.css' }
];

let totalOriginal = 0;
let totalMinified = 0;

files.forEach(file => {
    if (fs.existsSync(file.original) && fs.existsSync(file.minified)) {
        const origSize = fs.statSync(file.original).size;
        const minSize = fs.statSync(file.minified).size;
        const savings = ((1 - minSize / origSize) * 100).toFixed(1);

        totalOriginal += origSize;
        totalMinified += minSize;

        console.log(`${file.original.padEnd(25)} ${(origSize / 1024).toFixed(1)}KB → ${(minSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    }
});

const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
console.log(`\n${'TOTAL'.padEnd(25)} ${(totalOriginal / 1024).toFixed(1)}KB → ${(totalMinified / 1024).toFixed(1)}KB (${totalSavings}% reduction)`);

console.log('\n✅ Build complete!\n');
console.log('📝 Next steps:');
console.log('   1. Test index-optimized.html and foraging-optimized.html');
console.log('   2. When satisfied, rename optimized files to replace originals');
console.log('   3. Configure server to enable gzip/brotli compression');
console.log('   4. Add Cache-Control headers on your web server\n');
