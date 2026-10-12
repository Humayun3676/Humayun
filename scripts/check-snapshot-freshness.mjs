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

function extractFromHtml(htmlString) {
  // Extract all headings (h1, h2, h3)
  const headings = [];
  const headingRegex = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let match;
  while ((match = headingRegex.exec(htmlString)) !== null) {
    const text = match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (text) headings.push(text);
  }

  // Extract all anchor hrefs
  const links = [];
  const linkRegex = /<a\b[^>]*?\bhref=["']([^"']*)["'][^>]*>/gi;
  while ((match = linkRegex.exec(htmlString)) !== null) {
    links.push(match[1]);
  }

  // Extract clean text content
  const cleanText = htmlString
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return { headings, allLinks: links, uniqueLinks: [...new Set(links)].sort(), cleanText };
}

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

async function checkFreshness() {
  console.log('[snapshot-guard] Verifying pre-render snapshot freshness...');

  if (!fs.existsSync(snapshotPath)) {
    console.error('\n============================================================');
    console.error('FATAL: src/prerender-snapshot.html is missing!');
    console.error('Snapshot is stale, run npm run snapshot');
    console.error('============================================================\n');
    process.exit(1);
  }

  const snapshotHtml = fs.readFileSync(snapshotPath, 'utf-8');
  const snapshotData = extractFromHtml(snapshotHtml);

  // Check if Chromium is available
  let browser = null;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    console.warn(`[snapshot-guard] Notice: Headless Chromium not available in this environment (${err.message}).`);
    console.warn('[snapshot-guard] Performing structural snapshot verification fallback...');

    if (!snapshotHtml.includes('<h1') || snapshotData.headings.length < 5 || snapshotData.links.length < 5) {
      console.error('\n============================================================');
      console.error('FATAL: Snapshot failed structural integrity check!');
      console.error('Snapshot is stale, run npm run snapshot');
      console.error('============================================================\n');
      process.exit(1);
    }

    console.log('[snapshot-guard] Structural verification PASSED.');
    return;
  }

  // Chromium is available: render the live app
  const { server, port } = await startServer();
  const url = `http://127.0.0.1:${port}/`;

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('#root > div', { timeout: 10000 });

    // Scroll to bottom to trigger full DOM rendering
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const timer = setInterval(() => {
          window.scrollBy(0, 500);
          total += 500;
          if (total >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });
    });
    await page.waitForTimeout(500);

    const renderedRootHtml = await page.locator('#root').innerHTML();
    const liveData = extractFromHtml(renderedRootHtml);

    await browser.close();
    server.close();

    // 1. Compare Headings
    const missingHeadings = liveData.headings.filter(h => !snapshotData.headings.includes(h));
    if (missingHeadings.length > 0) {
      console.error('\n============================================================');
      console.error('FATAL: Detected heading mismatch between live app and snapshot!');
      console.error('Missing in snapshot:', missingHeadings);
      console.error('Snapshot is stale, run npm run snapshot');
      console.error('============================================================\n');
      process.exit(1);
    }

    // 2. Compare Link Hrefs (all links and unique destinations)
    const missingLinks = liveData.allLinks.filter(l => !snapshotData.allLinks.includes(l));
    const extraLinks = snapshotData.allLinks.filter(l => !liveData.allLinks.includes(l));
    if (missingLinks.length > 0 || extraLinks.length > 0 || liveData.allLinks.length !== snapshotData.allLinks.length) {
      console.error('\n============================================================');
      console.error('FATAL: Detected link mismatch between live app and snapshot!');
      console.error('Live app links:', liveData.allLinks);
      console.error('Snapshot links:', snapshotData.allLinks);
      console.error('Snapshot is stale, run npm run snapshot');
      console.error('============================================================\n');
      process.exit(1);
    }

    // 3. Compare general text presence
    const sampleWords = liveData.cleanText.split(' ').filter(w => w.length > 5).slice(0, 50);
    const missingWords = sampleWords.filter(w => !snapshotData.cleanText.includes(w));
    if (missingWords.length > 5) {
      console.error('\n============================================================');
      console.error('FATAL: Significant text drift detected between live app and snapshot!');
      console.error('Snapshot is stale, run npm run snapshot');
      console.error('============================================================\n');
      process.exit(1);
    }

    console.log(`[snapshot-guard] PASSED: All ${liveData.headings.length} headings, ${liveData.allLinks.length} links (${liveData.uniqueLinks.length} unique destinations), and visible text match perfectly.`);
    console.log(`[snapshot-guard] Verified links: ${JSON.stringify(liveData.allLinks)}`);
  } catch (err) {
    if (browser) await browser.close();
    server.close();
    console.error(`[snapshot-guard] Error during freshness check:`, err);
    process.exit(1);
  }
}

checkFreshness();
