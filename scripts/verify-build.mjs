import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('[verify-build] FATAL: dist/index.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf-8');

// 1. Verify #root exists and is not empty
const rootStart = html.indexOf('<div id="root">');
const rootEnd = html.lastIndexOf('</div>');

if (rootStart === -1 || rootEnd === -1 || rootEnd <= rootStart) {
  console.error('[verify-build] FATAL: <div id="root"> tag not found or malformed!');
  process.exit(1);
}

const rootContent = html.substring(rootStart + '<div id="root">'.length, rootEnd).trim();
if (!rootContent || rootContent.length < 50000) {
  console.error(`[verify-build] FATAL: dist/index.html has an empty or insufficient #root payload (${rootContent.length} chars)!`);
  console.error('[verify-build] Refusing to deploy without pre-rendered semantic HTML.');
  process.exit(1);
}

// 2. Verify <h1> tag is present inside #root
if (!rootContent.includes('<h1')) {
  console.error('[verify-build] FATAL: dist/index.html is missing an <h1> heading inside #root!');
  process.exit(1);
}

// 3. Verify Humayun Mirza is present in the rendered content
if (!rootContent.includes('Humayun Mirza')) {
  console.error('[verify-build] FATAL: dist/index.html does not contain the name "Humayun Mirza" inside #root!');
  process.exit(1);
}

// 4. Verify no obsolete domain references in dist/index.html head / metadata
const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
const headContent = headMatch ? headMatch[0] : '';
const obsoleteDomains = ['vercel.app', 'humayun-pearl', 'humayunmirza.online', 'www.humayunmirza'];
for (const domain of obsoleteDomains) {
  if (headContent.includes(domain)) {
    console.error(`[verify-build] FATAL: dist/index.html head contains obsolete domain "${domain}"!`);
    process.exit(1);
  }
}

// 5. Verify presence of required icons in dist/
const requiredIcons = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon-96x96.png',
  'favicon-192x192.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml',
];
for (const icon of requiredIcons) {
  const iconPath = path.resolve(__dirname, '..', 'dist', icon);
  if (!fs.existsSync(iconPath)) {
    console.error(`[verify-build] FATAL: dist/${icon} is missing!`);
    process.exit(1);
  }
}

console.log(`[verify-build] Pre-render and SEO verification PASSED! dist/index.html has valid content (${html.length} bytes, #root: ${rootContent.length} chars, <h1> confirmed, 0 obsolete domain hits, all ${requiredIcons.length} static assets verified).`);
