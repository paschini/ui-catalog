import { createContext, Dispatch } from 'react';
import { Error } from './main/notifications/Errors.tsx';
import { GlobalActions } from './globalReducer.tsx';

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
