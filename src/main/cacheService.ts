export class CacheService {
  private cacheName: string;

  constructor(cacheName: string) {
    this.cacheName = cacheName;
  }

  async getData(url: string) {
    try {
      const cache = await caches.open(this.cacheName);
      const cachedResponse = await cache.match(url);

      if (cachedResponse) {
        return await cachedResponse.json();
      }
      return null;
    } catch (error) {
      console.error('Cache läsningsfel:', error);
      return null;
    }
  }

  async cacheData(url: string, data: any) {
    try {
      const cache = await caches.open(this.cacheName);
      const response = new Response(JSON.stringify(data));
      await cache.put(url, response);
    } catch (error) {
      console.error('Cache skrivningsfel:', error);
    }
  }
}
