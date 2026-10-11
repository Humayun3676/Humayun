import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const snapshotPath = path.join(rootDir, 'src', 'prerender-snapshot.html');

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

async function generateSnapshot() {
  console.log('[snapshot] Starting DOM snapshot generation...');

  const indexPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[snapshot] dist/index.html not found! Run "npx vite build" first.');
    process.exit(1);
  }

  const { server, port } = await startStaticServer();
  const url = `http://127.0.0.1:${port}/`;

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 }
    });

    console.log(`[snapshot] Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('#root > div', { timeout: 15000 });

    // Scroll through the entire page slowly to trigger every whileInView and ScrollReveal observer
    console.log('[snapshot] Scrolling to activate all in-view animations...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0); // Scroll back to top
            resolve();
          }
        }, 80);
      });
    });

    // Wait for any remaining transition animations to finish
    await page.waitForTimeout(1500);

    // Normalize styles in DOM so everything is 100% visible even with JS disabled
    console.log('[snapshot] Normalizing reveal states and opacity for zero-JS visibility...');
    await page.evaluate(() => {
      const allElements = document.querySelectorAll('#root *');
      allElements.forEach((el) => {
        const style = el.getAttribute('style');
        if (!style) return;

        // Ensure opacity is 1
        if (el.style.opacity && parseFloat(el.style.opacity) < 1) {
          el.style.opacity = '1';
        }
        // Remove any blur filter
        if (el.style.filter && el.style.filter.includes('blur')) {
          el.style.filter = 'none';
        }
        // Reset transforms that would shift off-screen
        if (el.style.transform && (el.style.transform.includes('translateY') || el.style.transform.includes('scaleX(0)'))) {
          el.style.transform = 'none';
        }
        // Ensure visibility is visible
        if (el.style.visibility === 'hidden') {
          el.style.visibility = 'visible';
        }
      });
    });

    let rootHtml = await page.locator('#root').innerHTML();
    await browser.close();

    if (!rootHtml || rootHtml.trim().length === 0) {
      throw new Error('Captured #root HTML was empty!');
    }

    // Secondary regex sweep on static string to guarantee no hidden styles linger
    rootHtml = rootHtml.replace(/opacity:\s*0(\.[0-9]+)?/g, 'opacity: 1');
    rootHtml = rootHtml.replace(/filter:\s*blur\([^)]+\)/g, 'filter: none');

    // Validation checks
    if (!rootHtml.includes('<h1')) {
      throw new Error('Snapshot validation failed: Missing <h1> tag!');
    }
    if (!rootHtml.includes('Humayun Mirza')) {
      throw new Error('Snapshot validation failed: Missing main text content!');
    }
    if (rootHtml.length < 50000) {
      throw new Error(`Snapshot validation failed: Unusually small payload (${rootHtml.length} chars)!`);
    }

    fs.writeFileSync(snapshotPath, rootHtml, 'utf-8');
    console.log(`[snapshot] Successfully generated src/prerender-snapshot.html (${rootHtml.length} characters)`);
    console.log(`[snapshot] Verified: <h1> present, text complete, no hidden reveal states.`);
  } catch (err) {
    console.error(`[snapshot] FATAL: Snapshot generation failed:`, err);
    process.exit(1);
  } finally {
    server.close();
  }
}

generateSnapshot();
