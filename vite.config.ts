import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function prerenderSnapshotPlugin(): Plugin {
  return {
    name: 'prerender-snapshot-injector',
    apply: 'build',
    transformIndexHtml(html: string) {
      const snapshotPath = path.resolve(import.meta.dirname, 'src/prerender-snapshot.html');
      if (!fs.existsSync(snapshotPath)) {
        // If snapshot does not exist yet during initial setup, log notice
        console.warn('[prerender] Notice: src/prerender-snapshot.html not yet present. Skipping injection for initial build.');
        return html;
      }
      const snapshot = fs.readFileSync(snapshotPath, 'utf-8').trim();
      if (!snapshot || snapshot.length < 50000 || !snapshot.includes('<h1')) {
        throw new Error(
          '[prerender] FATAL ERROR: src/prerender-snapshot.html is empty, corrupted, or missing <h1>! Build aborted to prevent deploying an empty #root.'
        );
      }
      console.log(`[prerender] Injected verified snapshot (${snapshot.length} chars) into dist/index.html`);
      let transformedHtml = html.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`);
      
      // Automatically generate ISO 8601 build date for Schema.org ProfilePage dateModified
      const buildDateIso = new Date().toISOString();
      transformedHtml = transformedHtml.replace(/"dateModified":\s*"[^"]*"/, `"dateModified": "${buildDateIso}"`);
      return transformedHtml;
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderSnapshotPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
        }
      }
    }
  }
})
