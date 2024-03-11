import React, { createContext } from 'react';

import { initialState, State } from '@stores/reducer';

interface ContextProps<T> {
  state: State<T>;
  dispatch: React.Dispatch<any>;
}

const Context = createContext<ContextProps<any>>({
  state: initialState,
  dispatch: () => {},
});

export default Context;
