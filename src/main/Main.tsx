import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import { useHeaders } from './useHeaders.tsx';
import { useData } from './useData.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  main: {
    gridArea: 'main',
    width: '100vw',
    height: '100%',
    padding: '0 40px 0 40px',
    backgroundColor: theme.color.natural
  }
}));

const Main = () => {
  const styles = useStyles();
  const endpoint = 'https://static.ui.com/fingerprint/ui/public.json';

  const { headers, headerIsLoading, headerError, needsFetch } = useHeaders(endpoint);
  const { data, dataIsLoading, dataError } = useData(endpoint, true); //TODO unforce

  return (
    <div className={styles.main}>
      <h1>Main Page! </h1>
      <h2>Header:</h2>

      {/*{headerIsLoading && <p>Loading headers...</p>}*/}
      {/*{headerError && <p>Error: {headerError.message}</p>}*/}
      {/*{headers && <div>{headers.cacheControl && <p>Cache-Control: {headers.cacheControl}</p>}</div>}*/}

      {needsFetch && dataIsLoading && <p>Loading...</p>}
      {dataError && <p>Data error: {dataError.message}</p>}
      {headers && <div>{headers.cacheControl && <p>Cache-Control: {headers.cacheControl}</p>}</div>}
      {data && <div>/* Rendera din data här */</div>}
    </div>
  );
};

export default Main;
