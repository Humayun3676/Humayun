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
      return html.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderSnapshotPlugin()],
})
