import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import { useData } from './useData.tsx';
import { WebUnifiColors } from '../WebUnifiColors.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  main: {
    gridArea: 'main',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    backgroundColor: theme.color.natural
  },
  contentArea: {
    display: 'flex',
    width: '100%',
    height: '96%',
    margin: '20px 0 0 0',
    alignContent: 'center',
    justifyContent: 'staart',
    padding: '0 40px 0 40px'
  },
  notificationArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    // columnGap: '20px',
    justifyContent: 'space-between',
    width: '100%',
    height: 'min-content',
    alignSelf: 'flex-end',
    boxShadow: `0 -20px 20px 20px ${WebUnifiColors.neutral02}`,
    backgroundColor: theme.color.natural,
    zIndex: 10000000
  },
  dataInfo: {
    width: 'max-content',
    margin: '20px 40px',
    alignSelf: 'end',
    justifyContent: 'left'
  },
  errors: {
    width: 'max-content',
    alignSelf: 'center',
    justifyContent: 'right',
    margin: '20px 40px'
  }
}));

const Main = () => {
  const styles = useStyles();
  const endpoint = 'https://static.ui.com/fingerprint/ui/public.json';
  const { data, dataIsLoading, dataError, metadata } = useData(endpoint);
  const [isShowingNotification, setIsShowingNotification] = useState(true);
  const [activeView, setActiveView] = useState<'list' | 'grid' | 'details'>('list');

  return (
    <div className={styles.main}>
      {isShowingNotification && (
        <div className={styles.notificationArea}>
          <div className={styles.dataInfo}>
            {data && (
              <div>
                <div>{`Data version: ${data.version}`}</div>
                <div>{`Date modified: ${metadata.lastModified}`}</div>
              </div>
            )}
          </div>

          <div className={styles.errors}>{dataError && <p>Data error: {dataError.message}</p>}</div>
        </div>
      )}
      <div className={styles.contentArea}>
        {dataIsLoading && <p>Loading...</p>}
        <div>Im the middle container</div>
      </div>
    </div>
  );
};

export default Main;
