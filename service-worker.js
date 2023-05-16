// Installation steps
self.addEventListener('install', (event) => {
    event.waitUntil(
        fetch('manifest.json')
            .then((response) => response.json())
            .then((data) => {
                const fileUrls = data.files;
                return caches.open('be-cache')
                    .then((cache) => cache.addAll(fileUrls));
            })
    )
})

self.addEventListener('activate', (event) => {
    console.log("SW activated");
})
async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (e) {
        const cache = await caches.open('be-cache');
        return cache.match(event.request)
    }
}

self.addEventListener('fetch', (event) => {
    console.log("SW fetched");
    event.respondWith(fetchAssets(event));
})


