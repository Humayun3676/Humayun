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

async function startStaticServer() {
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

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      resolve({ server, port });
    });
  });
}

async function prerender() {
  console.log('[prerender] Starting pre-render snapshot generation...');
  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[prerender] dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const { server, port } = await startStaticServer();
  const url = `http://127.0.0.1:${port}/`;

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Visit page and wait for complete render
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('#root > div', { timeout: 10000 });
    // Small buffer for Framer Motion and canvas initial paint
    await page.waitForTimeout(1000);

    const rootHtml = await page.locator('#root').innerHTML();
    await browser.close();

    if (!rootHtml || rootHtml.trim().length === 0) {
      throw new Error('Pre-rendered HTML was empty!');
    }

    console.log(`[prerender] Snapshot extracted (${rootHtml.length} characters)`);

    // Read dist/index.html and replace empty #root
    let htmlContent = fs.readFileSync(indexPath, 'utf-8');
    htmlContent = htmlContent.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
    fs.writeFileSync(indexPath, htmlContent, 'utf-8');

    console.log('[prerender] Successfully injected pre-rendered HTML into dist/index.html');
  } catch (err) {
    console.error('[prerender] Error during pre-rendering:', err);
    process.exit(1);
  } finally {
    server.close();
  }
}

prerender();
