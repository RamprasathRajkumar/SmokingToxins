const CACHE_NAME = 'nicotrack-cache-v2'; // Bumped cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.tsx',
  '/App.tsx',
  '/constants.ts',
  '/types.ts',
  '/services/geminiService.ts',
  '/components/AddEntryForm.tsx',
  '/components/DailyTracker.tsx',
  '/components/Header.tsx',
  '/components/HistoryLog.tsx',
  '/components/Icons.tsx',
  '/components/Loader.tsx',
  '/components/SubstanceGauge.tsx',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@babel/standalone/babel.min.js', // Add babel to cache
  'https://esm.sh/react@^19.1.0',
  'https://esm.sh/react-dom@^19.1.0/client',
  'https://esm.sh/@google/genai@^1.8.0'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll with a catch to prevent a single failed asset from breaking the entire cache
        return cache.addAll(urlsToCache).catch(error => {
            console.error('Failed to cache one or more URLs:', error);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});