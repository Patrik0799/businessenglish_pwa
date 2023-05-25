const CACHE_NAME = 'be-cache';
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
            "/index.html",
            "/manifest.json",
            "/components/ccm.app_collection.js",
            "/components/ccm.chat.js",
            "/components/ccm.cloze-7.0.2.js",
            "/components/ccm.content.js",
            "/components/ccm.live_poll.js",
            "/components/ccm.menu-2.4.4.js",
            "/components/ccm.quick_decide.js",
            "/components/ccm.quiz-4.0.3.js",
            "/components/ccm.result.js",
            "/components/ccm.table-4.1.0.js",
            "/components/ccm.user.js",
            "/components/helper-5.1.0.mjs",
            "/demo_resources/resources.mjs",
            "/styles/app_collection.css",
            "/styles/chat.css",
            "/styles/cloze.css",
            "/styles/content.css",
            "/styles/live_poll.css",
            "/styles/menu.css",
            "/styles/quick_decide.css",
            "/styles/quiz.css",
            "/styles/result.css",
            "/styles/user.css",
            "/templates/templates.mjs",
            "/templates/templates_chat.html",
            "/templates/templates_login.js",
            "/templates/templates_quiz.html",
            "/templates/templates_result.html"
        ])
    }))
/*        fetch('manifest.json')
            .then((response) => response.json())
            .then((data) => {
                const fileUrls = data.files;
                return caches.open(CACHE_NAME)
                    .then((cache) => cache.addAll(fileUrls));
            })
    )*/
})
async function cleanupCache() {
    const keys = await caches.keys();
    const keysToDelete = keys.map(key => {
        if(key !== CACHE_NAME) {
            return caches.delete(key);
        }
    })
    return Promise.all(keysToDelete);
}
self.addEventListener('activate', (event) => {
    console.log("SW activated");
    event.waitUntil(cleanupCache());
})
async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (e) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request)
    }
}
self.addEventListener('fetch', (event) => {
    console.log("SW fetched");
    event.respondWith(fetchAssets(event));
})

self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: `${data.person} has changed ${data.section}`
    })
})


