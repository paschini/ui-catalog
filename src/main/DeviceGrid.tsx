import type { DeviceData } from './DeviceDataTypes.ts';
import { createUseStyles } from 'react-jss';
import { theme } from '../WebUnifiTheme.tsx';
import ImageLoader from '../components/ImageLoader.tsx';
import { Suspense, useContext, useEffect, useState } from 'react';
import Img from '../assets/icons/Img.tsx';
import { GlobalContext } from '../globalContext.tsx';
import { prefetchImage } from './utils.tsx';

const useStyles = createUseStyles({
  table: {
    width: '96%',
    height: '100%',
    overflowY: 'hidden'
  },
  tableContent: {
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    }
  },
  tableRow: {
    width: '99%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
    gridAutoRows: 'auto',
    gap: '15px',
    lineHeight: theme.sizes.lineHeight,
    alignItems: 'start'
  },
  tableCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderRadius: theme.sizes.borderRadius,
    border: `1px solid ${theme.color.neutral03Light}`,
    backgroundColor: theme.color.neutral01,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color.neutral02
    },
    '&:hover > div': {
      backgroundColor: theme.color.neutral02
    }
  },
  tableCellInfo: {
    width: 'calc(100% - 10px)',
    height: 'min-content',
    padding: '5px',
    alignItems: 'center',
    backgroundColor: theme.color.natural,
    overflow: 'hidden'
  },
  tableCellImage: {
    width: 84,
    height: 84,
    objectFit: 'contain',
    objectPosition: 'center'
  },
  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize'
  },
  abbrev: {
    color: theme.color.text3Light
  },
  unifiTag: {
    position: 'relative',
    width: '100%'
  },
  unifiTagText: {
    position: 'absolute',
    top: 0,
    backgroundColor: theme.color.natural,
    color: theme.color.ublue06,
    padding: '5px 10px',
    lineHeight: '18px',
    borderRadius: theme.sizes.borderRadius
  }
});

type DeviceGridProps = {
  onSelectDevice: (id: string) => void;
};

const DeviceGrid = (props: DeviceGridProps) => {
  const styles = useStyles();
  const { onSelectDevice } = props;
  const iconSize = 84;

  const {
    globalState: { deviceList, filteredDeviceList }
  } = useContext(GlobalContext);

  const [devices, setDevices] = useState<DeviceData[]>([]);

  useEffect(() => {
    if (filteredDeviceList.length > 0) {
      setDevices(filteredDeviceList);
    } else {
      setDevices(deviceList);
    }
  }, [deviceList, filteredDeviceList]);

  return (
    <div className={styles.table}>
      <div className={styles.tableContent}>
        <div className={styles.tableRow}>
          {devices.map((device) => (
            <div
              key={`device-${device.id}`}
              className={styles.tableCell}
              onClick={() => onSelectDevice(device.id)}
              onMouseEnter={() => prefetchImage(device)}
            >
              {device.line.name === 'UniFi' && (
                <div className={styles.unifiTag}>
                  <div className={styles.unifiTagText}>UniFi</div>
                </div>
              )}
              <Suspense fallback={<Img />}>
                <ImageLoader
                  src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${iconSize}&q=75`}
                  alt={`icon for ${device.product.name} ${device.line.name}`}
                />
              </Suspense>

              <div className={styles.tableCellInfo}>
                <div className={styles.text}>{device.product.name}</div>
                <div className={`${styles.text} ${styles.abbrev}`}>{device.product.abbrev}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceGrid;
