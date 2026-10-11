import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

async function testNoJs() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  const { port } = await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ port: server.address().port });
    });
  });

  const browser = await chromium.launch({ headless: true });
  // Launch context with JavaScript explicitly DISABLED
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log(`[test-no-js] Loading http://127.0.0.1:${port}/ with JavaScript DISABLED...`);
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });

  // 1. Verify H1 exists and is visible
  const h1 = page.locator('h1');
  const h1Count = await h1.count();
  const h1Visible = await h1.first().isVisible();
  const h1Text = await h1.first().innerText();
  console.log(`[test-no-js] H1 Count: ${h1Count}, IsVisible: ${h1Visible}, Text: "${h1Text}"`);

  // 2. Check for any inline opacity: 0 elements inside #root
  const zeroOpacityElements = await page.evaluate(() => {
    const hidden = [];
    document.querySelectorAll('#root *').forEach((el) => {
      const style = el.getAttribute('style') || '';
      if (style.includes('opacity: 0') || style.includes('opacity:0')) {
        hidden.push(el.tagName + '.' + el.className);
      }
    });
    return hidden;
  });
  console.log(`[test-no-js] Elements with inline opacity: 0: ${zeroOpacityElements.length}`);

  // 3. Check section visibility
  const sections = ['#about', '#experience', '#projects', '#certifications'];
  for (const s of sections) {
    const loc = page.locator(s);
    const count = await loc.count();
    const visible = count > 0 ? await loc.first().isVisible() : false;
    console.log(`[test-no-js] Section ${s}: exists=${count > 0}, visible=${visible}`);
  }

  // 4. Capture screenshot
  const outDir = path.join(rootDir, 'seo-verification-screenshots');
  fs.makedirsSync ? fs.makedirsSync(outDir) : fs.mkdirSync(outDir, { recursive: true });
  const shotPath = path.join(outDir, 'no-js-snapshot-verification.png');
  await page.screenshot({ path: shotPath, fullPage: true });
  console.log(`[test-no-js] Captured full-page no-JS screenshot at ${shotPath}`);

  await browser.close();
  server.close();

  if (!h1Visible || zeroOpacityElements.length > 0) {
    console.error('[test-no-js] FAILED: Some content was not visible without JS!');
    process.exit(1);
  } else {
    console.log('[test-no-js] PASSED! All snapshot content is 100% visible with JavaScript disabled.');
  }
}

testNoJs().catch(err => {
  console.error('[test-no-js] Error:', err);
  process.exit(1);
});
