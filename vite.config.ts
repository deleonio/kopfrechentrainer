import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  version: string;
  name: string;
  author?: string;
  homepage?: string;
  repository?: { url: string };
};
const commitSha = process.env.GITHUB_SHA || process.env.CI_COMMIT_SHA || 'dev';

export default defineConfig({
  // Classic JSX transform using Preact's h() and Fragment
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },

  plugins: [
    VitePWA({
      // 'prompt' = zeigt dem Nutzer einen Hinweis, wenn eine neue Version verfügbar ist
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'assets/**/*.png'],
      manifest: {
        name: 'Kopfrechentrainer',
        short_name: 'Rechentrainer',
        description: 'Übe Kopfrechnen – Addition, Subtraktion, Multiplikation und Division',
        lang: 'de-DE',
        start_url: './',
        display: 'fullscreen',
        orientation: 'any',
        theme_color: '#ddd',
        background_color: '#ddd',
        icons: [
          {
            src: 'assets/pwa.icon.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'assets/pwa.icon.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'assets/pwa.icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'assets/pwa.icon.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'assets/pwa.icon.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'assets/pwa.icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // Alte, veraltete Caches beim Update löschen
        cleanupOutdatedCaches: true,
        // Neuer Service Worker wartet auf Nutzerbestätigung (kein skipWaiting)
        skipWaiting: false,
        // Neuer SW übernimmt sofort alle Tabs nach Aktivierung
        clientsClaim: true,
        runtimeCaching: [
          {
            // HTML: immer aktuellste Version vom Netz versuchen
            urlPattern: /\.html$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Statische Assets: gecachte Version sofort ausliefern, im Hintergrund aktualisieren
            urlPattern: /\.(css|gif|jpg|png|woff2?)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
          {
            // JS-Bundles: gecachte Version sofort, im Hintergrund aktualisieren
            urlPattern: /\.js$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'js-cache',
            },
          },
        ],
      },
    }),
  ],

  // Ant Design LESS-Theming: Variablen werden vor der Kompilierung injiziert
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#e2313b',
          'link-color': '#e2313b',
          'success-color': '#52c41a',
          'warning-color': '#faad14',
          'error-color': '#f5222d',
          'font-size-base': '14px',
          'heading-color': 'rgba(0, 0, 0, 0.85)',
          'text-color': 'rgba(0, 0, 0, 0.65)',
          'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
          'disabled-color': 'rgba(0, 0, 0, 0.25)',
          'border-radius-base': '4px',
          'border-color-base': '#d9d9d9',
          'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
        javascriptEnabled: true,
      },
    },
  },

  // Globale Konstanten, die zur Build-Zeit eingebettet werden
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha),
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_NAME__: JSON.stringify(pkg.name),
    __APP_AUTHOR__: JSON.stringify(pkg.author ?? ''),
    __APP_HOMEPAGE__: JSON.stringify(pkg.homepage ?? pkg.repository?.url ?? ''),
  },

  // react → preact/compat, damit Ant Design und react-router-dom ohne Änderungen funktionieren
  resolve: {
    alias: {
      'react/jsx-runtime': 'preact/jsx-runtime',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      react: 'preact/compat',
    },
  },

  build: {
    outDir: 'dist',
  },
});
