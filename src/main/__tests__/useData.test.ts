import { renderHook, waitFor } from '@testing-library/react';
import { useData } from '../useData.tsx';

jest.mock('../cacheService', () => {
  const mockGetData = jest.fn();
  const mockCacheData = jest.fn();

  return {
    CacheService: jest.fn().mockImplementation(() => ({
      getData: mockGetData,
      cacheData: mockCacheData
    })),

    __mockGetData: mockGetData,
    __mockCacheData: mockCacheData
  };
});

const { __mockGetData: mockGetData, __mockCacheData: mockCacheData } = jest.requireMock('../cacheService');

describe('useData', () => {
  const mockUrl = 'https://example.com/api/data';
  const mockData = { id: 1, name: 'Test Data' };
  const mockMetadata = {
    lastModified: 'Wed, 21 Oct 2023 07:28:00 GMT',
    cacheDate: 'Wed, 21 Oct 2023 07:30:00 GMT',
    maxAge: 3600
  };

  let originalFetch: typeof global.fetch;
  let originalConsoleLog: typeof console.log;

  beforeEach(() => {
    jest.clearAllMocks();

    originalConsoleLog = console.log;
    console.log = jest.fn();

    originalFetch = global.fetch;
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    console.log = originalConsoleLog;
  });

  test('should use cached data when available', async () => {
    mockGetData.mockResolvedValueOnce({
      cachedData: mockData,
      metadata: mockMetadata
    });

    const { result } = renderHook(() => useData(mockUrl));

    expect(result.current.dataIsLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.dataIsLoading).toBe(false);
    });

    expect(mockGetData).toHaveBeenCalledWith(mockUrl);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(mockData);
    expect(result.current.metadata).toEqual(mockMetadata);
    expect(result.current.dataError).toBeNull();
    expect(console.log).toHaveBeenCalledWith('Using cached data.');
  });

  test('should fetch data when cache is not available', async () => {
    mockGetData.mockResolvedValueOnce({
      cachedData: null,
      metadata: null
    });

    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce(mockData),
      headers: new Headers({
        'last-modified': mockMetadata.lastModified,
        'cache-control': `max-age=${mockMetadata.maxAge}`
      })
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);
    mockCacheData.mockResolvedValueOnce(mockMetadata);

    const { result } = renderHook(() => useData(mockUrl));

    await waitFor(() => {
      expect(result.current.dataIsLoading).toBe(false);
    });

    expect(mockGetData).toHaveBeenCalledWith(mockUrl);
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
    expect(console.log).toHaveBeenCalledWith('Caching new data ✨');
    expect(mockCacheData).toHaveBeenCalledWith(mockUrl, mockData, mockResponse.headers);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.metadata).toEqual(mockMetadata);
  });

  test('should handle errors during data fetching', async () => {
    const mockError = new Error('Failed to fetch data');
    mockGetData.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useData(mockUrl));

    await waitFor(() => {
      expect(result.current.dataIsLoading).toBe(false);
    });

    expect(mockGetData).toHaveBeenCalledWith(mockUrl);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.dataError).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  test('should handle errors during fetch', async () => {
    mockGetData.mockResolvedValueOnce({
      cachedData: null,
      metadata: null
    });

    const mockError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useData(mockUrl));

    await waitFor(() => {
      expect(result.current.dataIsLoading).toBe(false);
    });

    expect(mockGetData).toHaveBeenCalledWith(mockUrl);
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
    expect(mockCacheData).not.toHaveBeenCalled();
    expect(result.current.dataError).toEqual(mockError);
    expect(result.current.data).toBeUndefined();
  });

  test('should set loading state correctly', async () => {
    mockGetData.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ cachedData: mockData, metadata: mockMetadata }), 100))
    );

    const { result } = renderHook(() => useData(mockUrl));
    expect(result.current.dataIsLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.dataIsLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
  });
});
