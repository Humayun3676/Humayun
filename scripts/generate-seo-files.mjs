import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Determine SITE_URL
let siteUrl = process.env.VITE_SITE_URL;

if (!siteUrl) {
  const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.ts');
  if (fs.existsSync(siteConfigPath)) {
    const content = fs.readFileSync(siteConfigPath, 'utf-8');
    const match = content.match(/:\s*['"](https?:\/\/[^'"]+)['"]/);
    if (match) {
      siteUrl = match[1].replace(/\/+$/, '');
    }
  }
}

if (!siteUrl) {
  siteUrl = 'https://humayunmirza.dev';
}

siteUrl = siteUrl.replace(/\/+$/, '');
const today = new Date().toISOString().split('T')[0];

console.log(`[seo-generator] Generating sitemap.xml, robots.txt, and site.webmanifest for SITE_URL: ${siteUrl}`);

// 2. Generate sitemap.xml content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

// 3. Generate robots.txt content
const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

// 4. Generate site.webmanifest content
const webmanifestContent = JSON.stringify({
  name: "Humayun Mirza Portfolio",
  short_name: "Humayun Mirza",
  description: "Humayun Mirza is a Software Engineer and AI/ML Developer from Sialkot, Pakistan, building intelligent systems in machine learning and computer vision.",
  start_url: "/",
  scope: "/",
  id: `${siteUrl}/`,
  display: "standalone",
  background_color: "#0B1120",
  theme_color: "#0B1120",
  icons: [
    {
      src: "/favicon-48x48.png",
      sizes: "48x48",
      type: "image/png"
    },
    {
      src: "/favicon-96x96.png",
      sizes: "96x96",
      type: "image/png"
    },
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png"
    }
  ]
}, null, 2) + '\n';

// Write to public/ directory
const publicDir = path.join(rootDir, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), webmanifestContent, 'utf-8');

// If dist/ exists, write to dist/ as well
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'site.webmanifest'), webmanifestContent, 'utf-8');
}

console.log(`[seo-generator] Successfully generated sitemap.xml, robots.txt, and site.webmanifest (sitemap loc: ${siteUrl}/, sitemap line: ${siteUrl}/sitemap.xml)`);
