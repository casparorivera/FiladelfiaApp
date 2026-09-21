// Service worker mínimo — solo lo necesario para que el navegador
// permita instalar la app ("Agregar a pantalla de inicio"). No guarda
// nada en caché todavía, así que siempre se ve la versión más reciente.

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', () => {
  // Sin manejo especial por ahora — deja pasar todas las peticiones normales.
});
