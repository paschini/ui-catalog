import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import { useData } from './useData.tsx';
import { WebUnifiColors } from '../WebUnifiColors.tsx';
import DataVersion from './notifications/DataVersion.tsx';
import Errors from './notifications/Errors.tsx';
import DeviceList from './DeviceList.tsx';

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
  const [isShowingNotification, setIsShowingNotification] = useState(true);
  const [activeView, setActiveView] = useState<'list' | 'grid' | 'details'>('list');

  // TODO: activeView and errors need to be a global context
  // TODO: product icons are probably images that can be extracted from the magic image url
  // Image urls can be built using
  // https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${id}%2Fdefault%2F${images.default}.png&w=${size}&q=75

  // For an example see
  // https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2Fed67d43e-2d5c-4928-ace8-edf984baeff1%2Fdefault%2F977c1f8c477549aeb7238727fd4ecc62.png&w=640&q=75

  data && console.log(data.devices);

  return (
    <div className={styles.main}>
      {isShowingNotification && (
        <div className={styles.notificationArea}>
          <DataVersion version={data?.version} lastModified={metadata?.lastModified} />
          <Errors errors={[]} />
        </div>
      )}
      <div className={styles.contentArea}>
        {dataIsLoading && <p>Loading...</p>}
        {data && <DeviceList devices={data?.devices} />}
      </div>
    </div>
  );
};

export default Main;
