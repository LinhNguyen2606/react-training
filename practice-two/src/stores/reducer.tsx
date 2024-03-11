// Constant
import { TYPES } from '@constants';
import { DataItems } from '@interfaces';

export interface State<T> {
  toast: 'idle' | 'processing' | 'success' | 'failure';
  selectedRow: { index: number; data: T | null };
  dataItems: DataItems[];
}

export interface Action {
  type: keyof typeof TYPES;
  payload?: any;
}

export const initialState: State<any> = {
  toast: 'idle',
  selectedRow: { index: -1, data: null },
  dataItems: [],
};

const Reducer = <T,>(state: State<T>, action: Action): State<T> => {
  switch (action.type) {
    case TYPES.IDLE:
      return { ...state, toast: 'idle' };
    case TYPES.PROCESSING:
      return { ...state, toast: 'processing' };
    case TYPES.SUCCESS:
      return { ...state, toast: 'success' };
    case TYPES.FAILURE:
      return { ...state, toast: 'failure' };
    case TYPES.SELECTED_ROW:
      return { ...state, selectedRow: action.payload };
    case TYPES.DATA_ITEMS:
      return { ...state, dataItems: action.payload };
    default:
      throw new Error('Invalid action');
  }
};

export default Reducer;
