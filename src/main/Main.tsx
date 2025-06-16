import { useEffect, useReducer, useState } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import { useData } from './useData.tsx';
import { WebUnifiColors } from '../WebUnifiColors.tsx';
import DataVersion from './notifications/DataVersion.tsx';
import Errors from './notifications/Errors.tsx';
import DeviceList from './DeviceList.tsx';
import { globalReducer } from '../globalReducer.tsx';
import { initialValue } from '../globalContext.tsx';
import DeviceGrid from './DeviceGrid.tsx';

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
    padding: '0 40px 0 40px'
  },
  notificationArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 'min-content',
    alignSelf: 'flex-end',
    boxShadow: `0 -20px 20px 20px ${WebUnifiColors.neutral02}`,
    backgroundColor: theme.color.natural,
    zIndex: 10000000
  }
}));

const Main = () => {
  const styles = useStyles();
  const endpoint = 'https://static.ui.com/fingerprint/ui/public.json';
  const { data, dataIsLoading, dataError, metadata } = useData(endpoint);
  const [isShowingNotification, setIsShowingNotification] = useState(false);

  const [{ activeView }] = useReducer(globalReducer, initialValue);

  data && console.log(data.devices);

  const getView = () => {
    switch (activeView) {
      case 'list':
        return <DeviceList devices={data?.devices} />;
      case 'grid':
        return <DeviceGrid devices={data?.devices} />;

      default:
        return <DeviceList devices={data?.devices} />;
    }
  };

  useEffect(() => {
    console.log('changed');
  }, [activeView]);

  return (
    <div className={styles.main}>
      {isShowingNotification && (
        <div className={styles.notificationArea}>
          <DataVersion version={data?.version} lastModified={metadata?.lastModified} />
          <Errors />
        </div>
      )}
      <div className={styles.contentArea}>
        {dataIsLoading && <p>Loading...</p>}

        {data && getView()}
      </div>
    </div>
  );
};

export default Main;
