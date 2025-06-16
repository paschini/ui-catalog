import { createContext } from 'react';
import type { Dispatch } from 'react';
import type { Error } from './main/notifications/Errors.tsx';
import type { GlobalActions } from './globalReducer.tsx';

export type ActiveView = 'list' | 'grid' | 'details';

export type GlobalStateType = { activeView: ActiveView; errors: Error[] };

export type GlobalContext = {
  globalState: GlobalStateType;
  globalDispatch: Dispatch<GlobalActions>;
};

export const initialValue: GlobalContext = {
  globalState: { activeView: 'list', errors: [] },
  globalDispatch: () => null
};

export const GlobalContext = createContext(initialValue);
