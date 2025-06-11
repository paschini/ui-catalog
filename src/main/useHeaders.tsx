import { useState, useEffect } from 'react';

interface Headers {
  cacheControl?: string;
  contentType?: string;
  contentLength?: string;
  lastModified?: string;
  etag?: string;
  expires?: string;
  date?: string;
  connection?: string;
  server?: string;
  xPoweredBy?: string;
  xFrameOptions?: string;
}

export const useHeaders = (url: string) => {
  const [headers, setHeaders] = useState<Headers | null>(null);
  const [headerIsLoading, setHeaderIsLoading] = useState(true);
  const [headerError, setHeaderError] = useState<Error | null>(null);
  const [needsFetch, setNeedsFetch] = useState(false);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        setHeaderIsLoading(true);

        const localHeaders = JSON.parse(localStorage.getItem('UIdataHeader') || '{}');
        const localLastModified = new Date(localHeaders.lastModified || 0);

        const response = await fetch(url, { method: 'HEAD' });
        const headersArray = [...response.headers];

        const formattedHeaders: Headers = headersArray.reduce((acc, [key, value]) => {
          const formattedKey = key
            .split('-')
            .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
            .join('');

          return {
            ...acc,
            [formattedKey]: value
          };
        }, {});

        setHeaders(formattedHeaders);

        const lastModified = new Date(formattedHeaders.lastModified || '');
        if (lastModified > localLastModified) {
          setNeedsFetch(true);
          localStorage.setItem('UIdataHeader', JSON.stringify(formattedHeaders));
        }
      } catch (error) {
        setHeaderError(error instanceof Error ? error : new Error('Something went wrong while fetching headers.'));
      } finally {
        setHeaderIsLoading(false);
      }
    };

    fetchHeaders();
  }, [url]);

  return { headers, headerIsLoading, headerError, needsFetch };
};
