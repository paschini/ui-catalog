import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { Error } from './main/notifications/Errors';
import type { GlobalActions } from './globalReducer';
import type { DeviceData } from './main/DeviceDataTypes';

export type View = 'list' | 'grid' | 'details';

export type GlobalStateType = {
  activeView: View;
  previousView: View;
  deviceList: DeviceData[];
  filteredDeviceList: DeviceData[];
  checkedFilterItems: string[];
  activeDeviceIndex: number;
  errors: Error[];
};

export type GlobalContext = {
  globalState: GlobalStateType;
  globalDispatch: Dispatch<GlobalActions>;
};

export const initialValue: GlobalContext = {
  globalState: {
    activeView: 'list',
    previousView: 'list',
    deviceList: [],
    filteredDeviceList: [],
    checkedFilterItems: [],
    activeDeviceIndex: 0,
    errors: []
  },
  globalDispatch: () => null
};

export const GlobalContext = createContext(initialValue);
