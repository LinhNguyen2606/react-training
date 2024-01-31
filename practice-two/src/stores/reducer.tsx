import { State } from '@interfaces';

type Action = {};

export const initialState: State = {};

const Reducer = (state: State, action: Action): State => {
  switch (action) {
    default:
      throw new Error('Invalid action');
  }
};

export default Reducer;
