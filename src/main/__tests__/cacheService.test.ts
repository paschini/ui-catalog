import { CacheService } from '../cacheService';

type MockCache = {
  match: jest.Mock;
  put: jest.Mock;
};

type MockCaches = {
  open: jest.Mock;
};

const mockCache: MockCache = {
  match: jest.fn(),
  put: jest.fn()
};

const mockCaches: MockCaches = {
  open: jest.fn().mockResolvedValue(mockCache as never)
};

const originalGlobal = global;

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, 'caches', {
      value: mockCaches,
      writable: true
    });

    cacheService = new CacheService('test-cache');
  });

  afterEach(() => {
    Object.defineProperty(global, 'caches', {
      value: originalGlobal.caches,
      writable: true
    });
  });

  describe('getData', () => {
    test('should return cached data and metadata when cache exists', async () => {
      const url = 'https://example.com/api/data';
      const cachedData = { id: 1, name: 'Test Data' };
      const headers = new Headers({
        'last-modified': 'Wed, 21 Oct 2023 07:28:00 GMT',
        date: 'Wed, 21 Oct 2023 07:30:00 GMT',
        'cache-control': 'max-age=3600'
      });

      const mockResponse = {
        json: jest.fn().mockResolvedValue(cachedData as never),
        headers
      };

      mockCache.match.mockResolvedValueOnce(mockResponse as never);

      const result = await cacheService.getData(url);
      expect(mockCaches.open).toHaveBeenCalledWith('test-cache');
      expect(mockCache.match).toHaveBeenCalledWith(url);
      expect(result).toEqual({
        cachedData,
        metadata: {
          lastModified: 'Wed, 21 Oct 2023 07:28:00 GMT',
          cacheDate: 'Wed, 21 Oct 2023 07:30:00 GMT',
          maxAge: 3600
        }
      });
    });

    test('should return null data when cache does not exist', async () => {
      const url = 'https://example.com/api/data';

      mockCache.match.mockResolvedValue(null as never);

      const result = await cacheService.getData(url);
      expect(mockCaches.open).toHaveBeenCalledWith('test-cache');
      expect(mockCache.match).toHaveBeenCalledWith(url);
      expect(result).toEqual({ cachedData: null, metadata: null });
    });

    test('should handle errors and return null', async () => {
      const url = 'https://example.com/api/data';

      mockCache.match.mockRejectedValue(new Error('Cache error') as never);

      const result = await cacheService.getData(url);
      expect(mockCaches.open).toHaveBeenCalledWith('test-cache');
      expect(mockCache.match).toHaveBeenCalledWith(url);
      expect(result).toBeNull();
    });
  });
});
