export class CacheService {
  private cacheName: string;

  constructor(cacheName: string) {
    this.cacheName = cacheName;
  }

  private getMaxAge(headers: Headers): number {
    const cacheControl = headers.get('cache-control');
    if (!cacheControl) return 0;

    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
    return maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
  }

  getData = async (url: string) => {
    console.log('🔍 Fetching data from cache');
    try {
      const cache = await caches.open(this.cacheName);
      const cachedResponse = await cache.match(url);

      if (cachedResponse) {
        console.log('Data found in cache ✅');
        const cachedData = await cachedResponse.json();
        const metadata = {
          lastModified: cachedResponse.headers.get('last-modified') || '',
          cacheDate: cachedResponse.headers.get('date') || '',
          maxAge: this.getMaxAge(cachedResponse.headers)
        };
        return (cachedData && { cachedData, metadata }) || null;
      }
      console.log('no cache found, returning <null>');
      return { cachedData: null, metadata: null };
    } catch (error) {
      console.error('Could not read from cache', error);
      return null;
    }
  };

  async cacheData(url: string, data: any, originalHeaders: Headers) {
    try {
      const cache = await caches.open(this.cacheName);
      const headers = new Headers({
        date: new Date().toUTCString(),
        'cache-control': originalHeaders.get('cache-control') || '',
        'last-modified': originalHeaders.get('last-modified') || ''
      });

      const newMetadata = {
        lastModified: headers.get('last-modified') || '',
        cacheDate: new Date().toUTCString(),
        maxAge: this.getMaxAge(headers)
      };

      const response = new Response(JSON.stringify(data), { headers });
      await cache.put(url, response);

      return newMetadata;
    } catch (error) {
      console.error('Could not write to cache:', error);
    }
  }
}
