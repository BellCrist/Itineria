import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Estende il raggio d'azione della cache anche a richieste esterne o API
        runtimeCaching: [
          {
            // Supponendo che le tue chiamate al server inizino con /api/
            urlPattern: /^https:\/\/tuo-dominio-o-localhost:5000\/api\/.*/i,
            handler: 'StaleWhileRevalidate',
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
        name: 'TraveLog',
        short_name: 'Travelog',
        description: 'Gestisci i tuoi itinerari di viaggio, anche offline',
        theme_color: '#6392f2',
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
  ]
})
