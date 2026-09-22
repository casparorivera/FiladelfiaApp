// Service worker — instalabilidad de la PWA + notificaciones push en
// segundo plano (cuando la app está cerrada) mediante Firebase Cloud
// Messaging.

importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDDfJZ-idJ1bujgvr3dflpLB3K-NxKXaWc",
  authDomain: "app-filadelfia.firebaseapp.com",
  projectId: "app-filadelfia",
  storageBucket: "app-filadelfia.firebasestorage.app",
  messagingSenderId: "957927460722",
  appId: "1:957927460722:web:1d5ea35120404df12f57eb"
});

const messaging = firebase.messaging();

// Cuando llega una notificación con la app cerrada o en segundo plano,
// Firebase ya la muestra automáticamente usando notification.title/body
// — no hace falta código adicional aquí para eso.

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', () => {
  // Sin manejo especial por ahora — deja pasar todas las peticiones normales.
});

// Si tocan la notificación, abre (o enfoca) la app.
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(listaClientes => {
      for (const cliente of listaClientes) {
        if ('focus' in cliente) return cliente.focus();
      }
      if (clients.openWindow) return clients.openWindow('index.html');
    })
  );
});
