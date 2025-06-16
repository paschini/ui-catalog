import { Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import { theme } from '../WebUnifiTheme.tsx';
import type { DeviceData } from './DeviceDataTypes.ts';
import ImageLoader from './ImageLoader.tsx';
import Img from '../assets/icons/Img.tsx';

const useStyles = createUseStyles({
  table: {
    width: '96%',
    height: '100%',
    overflowY: 'hidden'
  },
  tableHeaders: {
    fontWeight: 'bold'
  },
  tableContent: {
    height: '100%',
    overflowY: 'scroll'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 1fr',
    gridAutoRows: '28px',
    lineHeight: theme.sizes.lineHeight,
    alignItems: 'center',
    borderBottom: `1px solid ${theme.color.neutral02}`
  }
});

type DeviceListProps = {
  devices: DeviceData[];
  onSelectDevice: (id: string) => void;
};

const DeviceList = (props: DeviceListProps) => {
  const styles = useStyles();
  const { devices, onSelectDevice } = props;
  const iconSize = 20;

  return (
    <div className={styles.table}>
      <div className={styles.tableHeaders}>
        <div className={styles.tableRow}>
          <span>&nbsp;</span>
          <span>Product Line</span>
          <span>Name</span>
        </div>
      </div>

      <div className={styles.tableContent}>
        {devices.map((device) => (
          <div className={styles.tableRow} key={`device-${device.id}`} onClick={() => onSelectDevice(device.id)}>
            <Suspense fallback={<Img width={'33'} height={'19'} />}>
              <ImageLoader
                src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${iconSize}&q=75`}
                alt={`icon for ${device.product.name} ${device.line.name}`}
              />
            </Suspense>

            <span>{device.line.name}</span>
            <span>{device.product.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
