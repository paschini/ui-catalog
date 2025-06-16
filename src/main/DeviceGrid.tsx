import { DeviceData } from './DeviceDataTypes.ts';
import { createUseStyles } from 'react-jss';
import { theme } from '../WebUnifiTheme.tsx';

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
    // boxShadow: `0 -20px 20px 20px ${WebUnifiColors.neutral02}`
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

type DeviceGridProps = {
  devices: DeviceData[];
};

const DeviceGrid = (props: DeviceGridProps) => {
  const styles = useStyles();
  const { devices } = props;
  const iconSizeSmall = 20;
  // const iconSizeMedium = 32;
  // const iconSizeBig = 64;

  return (
    <div className={styles.table}>
      <div className={styles.tableHeaders}>
        <div className={styles.tableRow}>
          <span>GRID</span>
          <span>Product Line</span>
          <span>Name</span>
        </div>
      </div>

      <div className={styles.tableContent}>
        {devices.map((device) => (
          <div className={styles.tableRow} key={`device-${device.id}`}>
            <img
              alt={`icon for ${device.product.name} ${device.line.name}`}
              src={`https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=${iconSizeSmall}&q=75`}
            />
            <span>{device.line.name}</span>
            <span>{device.product.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceGrid;
