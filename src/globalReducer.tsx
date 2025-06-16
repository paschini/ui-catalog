import { ActiveView, GlobalStateType } from './globalContext.tsx';
import { Error } from './main/notifications/Errors.tsx';

export type GlobalActions = { type: 'SET_ACTIVE_VIEW'; payload: ActiveView } | { type: 'SET_ERROR'; payload: Error };

export const globalReducer = (state: GlobalStateType, action: GlobalActions): GlobalStateType => {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW': {
      return {
        ...state,
        activeView: action.payload
      };
    }
    case 'SET_ERROR': {
      return { ...state, errors: [...state.errors, action.payload] };
    }
    default: {
      return state;
    }
  }
};
