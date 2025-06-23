import { Suspense, useContext, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { theme } from '../WebUnifiTheme';
import Img from '../assets/icons/Img';
import ImageLoader from '../components/ImageLoader';
import { GlobalContext } from '../globalContext';

const useStyles = createUseStyles({
  detailsContainer: {
    margin: '0 auto',
    width: '768px',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '292px',
    height: '292px',
    objectFit: 'contain',
    objectPosition: 'center',
    backgroundColor: theme.color.neutral01,
    borderRadius: theme.sizes.borderRadius,
    border: `1px solid ${theme.color.neutral01}`
  },
  infoContainer: {
    width: 'calc(100% - 180px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    padding: theme.sizes.paddings.medium
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.color.text1,
    marginBottom: 0
  },
  subTitle: {
    paddingBottom: theme.sizes.paddings.medium,
    color: theme.color.text3Light
  },
  infoBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: theme.sizes.paddings.small
  },
  callers: {
    color: theme.color.text1Light
  },
  names: {
    color: theme.color.text3Light
  }
});

const DeviceDetails = () => {
  const styles = useStyles();
  const iconSize = '292';

  const {
    globalState: { activeDeviceIndex, deviceList }
  } = useContext(GlobalContext);

  const device = useMemo(() => deviceList[activeDeviceIndex], [deviceList, activeDeviceIndex]);
  const imageUrl = useMemo(
    () =>
      `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id || ''}%2Fdefault%2F${device.images.default || ''}.png&w=${iconSize}&q=75`,
    [device.id, device.images.default, iconSize]
  );

  return (
    <div className={styles.detailsContainer}>
      <Suspense fallback={<Img width={iconSize} />}>
        <ImageLoader src={imageUrl} alt={`icon for ${device.product.name} ${device.line.name}`} width={iconSize} />
      </Suspense>
      <div className={styles.infoContainer}>
        <div className={`${styles.text} ${styles.title}`}>{device.product.name}</div>
        <div className={`${styles.text} ${styles.subTitle}`}>{device.line.name}</div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>Product Line</span>
          <span className={`${styles.names} ${styles.text}`}>{device.line.name}</span>
        </div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>ID</span>
          <span className={`${styles.names} ${styles.text}`}>{device.id}</span>
        </div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>Name</span>
          <span className={`${styles.names} ${styles.text}`}>{device.product.name}</span>
        </div>

        <div className={styles.infoBlock}>
          <span className={styles.callers}>Shortname</span>
          <span className={`${styles.names} ${styles.text}`}>{device.shortnames[0]}</span>
        </div>

        {device.unifi?.network.radios?.ng && (
          <div className={styles.infoBlock}>
            <span className={styles.callers}>MaxPower</span>
            <span className={`${styles.names} ${styles.text}`}>{`${device.unifi.network.radios.ng.maxPower} W`}</span>
          </div>
        )}

        {device.unifi?.network && (
          <div className={styles.infoBlock}>
            <span className={styles.callers}>Number of Ports</span>
            <span className={`${styles.names} ${styles.text}`}>{device.unifi.network.numberOfPorts}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDetails;
