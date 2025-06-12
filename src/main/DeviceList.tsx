import { DeviceData } from './DeviceDataTypes.ts';

type DeviceListProps = {
  devices: DeviceData[];
};

const DeviceList = (props: DeviceListProps) => {
  const { devices } = props;

  return (
    <div>
      {devices.map((device) => (
        <div key={device.id}>
          <span>{device.line.name}</span>
          <span>{device.product.name}</span>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
