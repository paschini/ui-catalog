import { createContext, Dispatch } from 'react';
import { Error } from './main/notifications/Errors.tsx';

export type ActiveView = 'list' | 'grid' | 'details';

export type GlobalStateType = { activeView: ActiveView; errors: Error[] };

export type GlobalContext = {
  globalState: GlobalStateType;
  globalDispatch: Dispatch<unknown>;
};

export const initialValue: GlobalState = {
  globalState: { activeView: 'list', errors: [] },
  globalDispatch: () => null
};

export const GlobalContext = createContext(initialValue);
