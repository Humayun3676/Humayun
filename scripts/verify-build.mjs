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

console.log(`[verify-build] Pre-render verification PASSED! dist/index.html has valid, complete content (${html.length} bytes, #root: ${rootContent.length} chars, <h1> confirmed).`);
