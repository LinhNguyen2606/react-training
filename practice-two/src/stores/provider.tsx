import { ReactNode, useReducer } from 'react';

// Stores
import { Context, reducer } from '@stores';

import { initialState } from '@stores/reducer';

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default Provider;
