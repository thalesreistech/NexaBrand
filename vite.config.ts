import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Ensure assets are copied to public/assets so they are served correctly in dev and production
try {
  const srcAssets = path.resolve(__dirname, 'assets');
  const destAssets = path.resolve(__dirname, 'public/assets');
  if (fs.existsSync(srcAssets)) {
    if (fs.existsSync(destAssets)) {
      fs.rmSync(destAssets, { recursive: true, force: true });
    }
    fs.cpSync(srcAssets, destAssets, { recursive: true, force: true });
    console.log('Successfully synchronized /assets with /public/assets');
  }
} catch (err) {
  console.error('Failed to copy /assets to /public/assets:', err);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
