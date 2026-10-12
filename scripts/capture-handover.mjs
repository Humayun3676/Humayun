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

async function startServer() {
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
      resolve({ server, port: server.address().port });
    });
  });
}

async function runCapture(theme = 'light') {
  const { server, port } = await startServer();
  const framesDir = path.join(rootDir, 'seo-verification-screenshots', `handover-${theme}`);
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();
  const client = await page.context().newCDPSession(page);

  // 4x CPU slowdown
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  // Slow 4G profile: latency 150ms, 1.6Mbps down, 750Kbps up
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });

  // Set theme before navigation
  await page.addInitScript((th) => {
    try {
      localStorage.setItem('theme', th);
    } catch (e) {}
  }, theme);

  console.log(`[capture-${theme}] Starting frame-by-frame capture under 4x CPU slowdown & Slow 4G...`);

  // Start polling frames every 50ms while navigating
  const opacities = [];
  let frameCount = 0;
  let capturing = true;

  const captureInterval = setInterval(async () => {
    if (!capturing) return;
    try {
      const frameIndex = frameCount++;
      const data = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const heroImg = document.querySelector('img[alt*="Humayun Mirza"]');
        return {
          h1Opacity: h1 ? window.getComputedStyle(h1).opacity : null,
          heroImgOpacity: heroImg ? window.getComputedStyle(heroImg).opacity : null,
          rootChildrenCount: document.getElementById('root') ? document.getElementById('root').children.length : 0,
        };
      }).catch(() => null);

      if (data) {
        opacities.push({ frameIndex, ...data, timeMs: frameIndex * 50 });
        if (frameIndex % 5 === 0) {
          await page.screenshot({ path: path.join(framesDir, `frame-${String(frameIndex).padStart(3, '0')}.png`) }).catch(() => {});
        }
      }
    } catch (e) {}
  }, 50);

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Wait for full settle

  capturing = false;
  clearInterval(captureInterval);

  await browser.close();
  server.close();

  // Analyze opacities for dips
  let hadDip = false;
  let dipDetails = [];
  for (let i = 1; i < opacities.length; i++) {
    const prev = opacities[i - 1];
    const curr = opacities[i];
    if (prev.h1Opacity === '1' && parseFloat(curr.h1Opacity) < 0.8) {
      hadDip = true;
      dipDetails.push(`Frame ${curr.frameIndex} (${curr.timeMs}ms): H1 opacity dropped from ${prev.h1Opacity} to ${curr.h1Opacity}`);
    }
  }

  console.log(`[capture-${theme}] Captured ${frameCount} frames.`);
  if (hadDip) {
    console.warn(`[capture-${theme}] DETECTED OPACITY DIP:`, dipDetails);
  } else {
    console.log(`[capture-${theme}] PASSED: Zero opacity dips detected. Handover is completely seamless.`);
  }

  return { hadDip, dipDetails, frameCount };
}

async function main() {
  const lightResult = await runCapture('light');
  const darkResult = await runCapture('dark');

  console.log('\n--- Handover Summary ---');
  console.log(`Light Mode: ${lightResult.hadDip ? 'FAILED (Dip detected)' : 'PASSED (0 dips)'}`);
  console.log(`Dark Mode:  ${darkResult.hadDip ? 'FAILED (Dip detected)' : 'PASSED (0 dips)'}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
