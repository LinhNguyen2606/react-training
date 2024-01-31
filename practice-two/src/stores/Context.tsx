import React, { createContext } from 'react';

// Interface
import { State } from '@interfaces';

import { initialState } from '@stores/Reducer';

type ContextProps = {
  state: State;
  dispatch: React.Dispatch<any>;
};

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});

export default Context;
