import { useState, useEffect } from 'react';
import { CacheService } from './cacheService';

const cacheService = new CacheService('ui-data-cache');

export const useData = (url: string, shouldFetch: boolean) => {
  const [data, setData] = useState<any>(null);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [dataError, setDataError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataIsLoading(true);

        // Kolla först i cache om vi inte behöver hämta ny data
        if (!shouldFetch) {
          const cachedData = await cacheService.getData(url);
          if (cachedData) {
            setData(cachedData);
            setDataIsLoading(false);
            return;
          }
        }

        // Hämta ny data om det behövs
        const response = await fetch(url);
        const jsonData = await response.json();

        // Spara i cache
        await cacheService.cacheData(url, jsonData);
        setData(jsonData);
      } catch (error) {
        setDataError(error instanceof Error ? error : new Error('Ett fel uppstod'));
      } finally {
        setDataIsLoading(false);
      }
    };

    fetchData();
  }, [url, shouldFetch]);

  return { data, dataIsLoading, dataError };
};

// import { useState, useEffect } from 'react';
//
// export const useData = (url: string, shouldFetch: boolean) => {
//   const [data, setData] = useState(null);
//   const [dataIsLoading, setDataIsLoading] = useState(true);
//   const [dataError, setDataError] = useState<Error | null>(null);
//
//   useEffect(() => {
//     if (shouldFetch) {
//       const fetchData = async () => {
//         try {
//           setDataIsLoading(true);
//           const response: Response = await fetch(url, { method: 'GET' });
//           console.log(response);
//           const raw = response.json;
//
//           console.log(raw);
//
//           setData(raw);
//         } catch (error) {
//           setDataError(error instanceof Error ? error : new Error('Something went wrong while fetching data.'));
//         } finally {
//           setDataIsLoading(false);
//         }
//       };
//
//       fetchData();
//     }
//   }, [url]);
//
//   return { data, dataIsLoading, dataError };
// };
