import { useState, useEffect } from 'react';
import { CacheService } from './cacheService';

const cacheService = new CacheService('ui-data-cache');

export const useData = (url: string) => {
  const [data, setData] = useState<any>();
  const [metadata, setMetadata] = useState<any>();
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [dataError, setDataError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('🔍 Fetching data');
    const fetchData = async () => {
      try {
        setDataIsLoading(true);

        const { cachedData, metadata } = await cacheService.getData(url);

        if (cachedData) {
          setData(cachedData);
          setMetadata(metadata);

          console.log('Using cached data.');
          setDataIsLoading(false);
          return;
        }

        const response = await fetch(url);

        console.log('🔍 Original response headers:', {
          lastModified: response.headers.get('last-modified'),
          allHeaders: JSON.stringify(Object.fromEntries(response.headers.entries()))
        });

        const newData = await response.json();

        const newMetadata = await cacheService.cacheData(url, newData, response.headers);
        console.log('Caching new data ✨');
        setData(newData);
        setMetadata(newMetadata);
      } catch (error) {
        setDataError(error instanceof Error ? error : new Error('Something went wrong while fetching data.'));
      } finally {
        setDataIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, dataIsLoading, dataError, metadata };
};
