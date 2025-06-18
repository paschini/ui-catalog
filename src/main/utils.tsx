import type { DeviceData } from './DeviceDataTypes.ts';

export const prefetchImage = (device: DeviceData) => {
  const img = new Image();
  img.src = `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${device.id}%2Fdefault%2F${device.images.default}.png&w=292&q=75`;
};
