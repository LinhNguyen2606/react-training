import { TYPES } from "@constants";

export type ToastState = 'idle' | 'processing' | 'success' | 'failure';

export type ToastAction = 
  | { type: 'PROCESSING' }
  | { type: 'SUCCESS' }
  | { type: 'FAILURE' }
  | { type: 'IDLE' };

export const initialState: ToastState = 'idle'

const Reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case TYPES.PROCESSING:
      return 'processing'
    case TYPES.SUCCESS:
      return 'success'
    case TYPES.FAILURE:
      return 'failure'
    case TYPES.IDLE:
      return 'idle'
    default:
      throw new Error('Invalid action');
  }
};

export default Reducer;