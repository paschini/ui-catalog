import { ActiveView, GlobalStateType } from './globalContext.tsx';
import { Error } from './main/notifications/Errors.tsx';

type GlobalActions = { type: 'SET_ACTIVE_VIEW'; payload: ActiveView } | { type: 'SET_ERROR'; payload: Error };

export const globalReducer = (state: GlobalStateType, action: GlobalActions): GlobalState => {
  console.log('va', action);
  switch (action.type) {
    case 'SET_ACTIVE_VIEW': {
      return {
        ...state,
        activeView: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
