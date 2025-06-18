import { lazy, Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { GlobalContext } from '../globalContext.tsx';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import { useData } from './useData.tsx';
import { WebUnifiColors } from '../WebUnifiColors.tsx';
import DataVersion from './notifications/DataVersion.tsx';
import Errors from './notifications/Errors.tsx';
import DeviceList from './DeviceList.tsx';
import DeviceGrid from './DeviceGrid.tsx';
import Img from '../assets/icons/Img.tsx';

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
  const DeviceDetails = lazy(() => import('./DeviceDetails.tsx'));

  const styles = useStyles();
  const endpoint = 'https://static.ui.com/fingerprint/ui/public.json';
  const { data, dataIsLoading, dataError, metadata } = useData(endpoint);
  const [isShowingNotification, setIsShowingNotification] = useState(false);

  const [_, setSelectedDeviceId] = useState<string | null>(null);

  const selectDeviceId = useCallback((id: string) => {
    requestAnimationFrame(() => {
      setSelectedDeviceId(id);
      globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'details' });
    });
  }, []);

  const {
    globalState: { activeView, errors },
    globalDispatch
  } = useContext(GlobalContext);

  const getView = () => {
    switch (activeView) {
      case 'list':
        return <DeviceList onSelectDevice={selectDeviceId} />;
      case 'grid':
        return <DeviceGrid onSelectDevice={selectDeviceId} />;
      case 'details':
        return (
          <Suspense fallback={<Img />}>
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
