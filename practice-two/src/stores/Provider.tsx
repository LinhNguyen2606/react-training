import { ReactNode, useReducer } from 'react';

// Stores
import { Context, Reducer } from '@stores';

import { initialState } from '@stores/Reducer';

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default Provider;
