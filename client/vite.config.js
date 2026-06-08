import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        cleanupOutdatedCaches: true,
        // Estende il raggio d'azione della cache anche a richieste esterne o API
        runtimeCaching: [
          {
            // Le rotte di auth non vengono cachate - sempre fresh dal server
            urlPattern: /\/api\/auth\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /\/api\/(?!auth\/).*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-data-cache',
              expiration: {
                maxEntries: 50, // Massimo 50 risposte salvate
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 giorni di validità
              },
              cacheableResponse: {
                statuses: [0, 200], // Salva solo le risposte andate a buon fine
              },
            },
          },
          {
            // Cache per le immagini caricate dagli utenti o itinerari (opzionale)
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'itinerary-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 giorni
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Travel-dream',
        short_name: 'Trv-drm',
        description: 'Gestisci i tuoi itinerari di viaggio, anche offline',
        theme_color: '#6392f2',
        version: new Date().toISOString(),
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // extra per Android
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  // Configurazione del server di sviluppo con Proxy per Express
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})