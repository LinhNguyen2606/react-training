// Constant
import { TYPES } from '@constants';

export interface State {
  toast: 'idle' | 'processing' | 'success' | 'failure';
}

export interface Action<T> {
  type: keyof typeof TYPES;
  payload?: T;
}

export const initialState: State = {
  toast: 'idle',
};

const Reducer = <T,>(state: State, action: Action<T>): State => {
  switch (action.type) {
    case TYPES.PROCESSING:
      return { ...state, toast: 'processing' };
    case TYPES.SUCCESS:
      return { ...state, toast: 'success' };
    case TYPES.FAILURE:
      return { ...state, toast: 'failure' };
    case TYPES.IDLE:
      return { ...state, toast: 'idle' };
    default:
      throw new Error('Invalid action');
  }
};

export default Reducer;
