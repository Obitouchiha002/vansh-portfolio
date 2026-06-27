import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'icon.png'],
        workbox: {
          maximumFileSizeToCacheInBytes: 10000000
        },
        manifest: {
          name: 'Vansh Kashyap Portfolio',
          short_name: 'VK Portfolio',
          description: 'Vansh Kashyap - Web Developer & IT Support Specialist',
          theme_color: '#09090b',
          background_color: '#09090b',
          display: 'standalone',
          icons: [
            {
              src: '/icon.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/icon.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    // NOTE: GEMINI_API_KEY is intentionally NOT exposed to the client.
    // The chatbot now calls the server-side /api/chat route, so the key
    // stays secret on the server and is never shipped in the browser bundle.
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
