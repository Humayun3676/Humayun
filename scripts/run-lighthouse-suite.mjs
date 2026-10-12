import { execSync } from 'node:child_process';
import fs from 'node:fs';

function runLighthouse(url, isMobile, runIndex) {
  const outputPath = `lh-${isMobile ? 'mobile' : 'desktop'}-${runIndex}.json`;
  const presetArg = isMobile ? '' : '--preset=desktop';
  const cmd = `npx lighthouse ${url} ${presetArg} --output=json --output-path=${outputPath} --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet`;
  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });

  const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  const lhr = data;

  const scores = {
    performance: Math.round((lhr.categories.performance?.score || 0) * 100),
    accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
    seo: Math.round((lhr.categories.seo?.score || 0) * 100),
    lcp: Math.round(lhr.audits['largest-contentful-paint']?.numericValue || 0),
    cls: Number((lhr.audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
    tbt: Math.round(lhr.audits['total-blocking-time']?.numericValue || 0),
    totalBytes: Math.round((lhr.audits['total-byte-weight']?.numericValue || 0) / 1024)
  };

  const lcpElem = lhr.audits['largest-contentful-paint-element']?.details?.items?.[0];
  const lcpBreakdown = {
    ttfb: Math.round(lhr.audits['server-response-time']?.numericValue || 0),
    lcp: scores.lcp,
    nodeSnippet: lcpElem?.node?.snippet || ''
  };

  return { scores, lcpBreakdown, outputPath };
}

function getMedianRun(runs) {
  const sorted = [...runs].sort((a, b) => a.scores.performance - b.scores.performance);
  return sorted[1];
}

async function main() {
  const url = 'http://localhost:4173/';
  
  console.log('--- RUNNING 3 MOBILE LIGHTHOUSE AUDITS ---');
  const mobileRuns = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`\nMobile Run ${i}/3...`);
    mobileRuns.push(runLighthouse(url, true, i));
  }

  console.log('\n--- RUNNING 3 DESKTOP LIGHTHOUSE AUDITS ---');
  const desktopRuns = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`\nDesktop Run ${i}/3...`);
    desktopRuns.push(runLighthouse(url, false, i));
  }

  const medianMobile = getMedianRun(mobileRuns);
  const medianDesktop = getMedianRun(desktopRuns);

  const results = {
    mobileRuns: mobileRuns.map(r => r.scores),
    medianMobile: medianMobile.scores,
    desktopRuns: desktopRuns.map(r => r.scores),
    medianDesktop: medianDesktop.scores,
    lcpBreakdownMobile: medianMobile.lcpBreakdown
  };

  fs.writeFileSync('lighthouse-summary.json', JSON.stringify(results, null, 2));
  console.log('\n========================================');
  console.log('LIGHTHOUSE AUDIT COMPLETE - MEDIAN RESULTS');
  console.log('========================================');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
