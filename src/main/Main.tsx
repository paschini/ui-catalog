import { lazy, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { GlobalContext } from '../globalContext';
import type { ThemeProps } from '../WebUnifiTheme';
import { useData } from './useData';
import { WebUnifiColors } from '../WebUnifiColors';
import DataVersion from './notifications/DataVersion';
import Errors from './notifications/Errors';
import DeviceList from './DeviceList';
import DeviceGrid from './DeviceGrid';

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
  const DeviceDetails = lazy(() => import('./DeviceDetails'));

  const styles = useStyles();
  const endpoint = 'https://static.ui.com/fingerprint/ui/public.json';
  const { data, dataIsLoading, dataError, metadata } = useData(endpoint);
  const [isShowingNotification, setIsShowingNotification] = useState(false);

  const {
    globalState: { activeView, errors },
    globalDispatch
  } = useContext(GlobalContext);

  const selectDeviceId = useCallback(
    (index: number) => {
      requestAnimationFrame(() => {
        globalDispatch({ type: 'SET_ACTIVE_DEVICE', index: index });
        globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'details' });
      });
    },
    [globalDispatch]
  );

  const getView = () => {
    switch (activeView) {
      case 'list':
        return <DeviceList onSelectDevice={selectDeviceId} />;
      case 'grid':
        return <DeviceGrid onSelectDevice={selectDeviceId} />;
      case 'details':
        return (
          <Suspense>
            <DeviceDetails />
          </Suspense>
        );

      default:
        return <DeviceList onSelectDevice={selectDeviceId} />;
    }
  };

  if (dataError) {
    globalDispatch({ type: 'SET_ERROR', payload: dataError });
  }

  if (errors.length > 0) {
    setIsShowingNotification(true);
  }

  useEffect(() => {
    if (data) {
      globalDispatch({
        type: 'SET_DEVICE_LIST',
        payload: data.devices
      });
    }
  }, [data, globalDispatch]);

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
