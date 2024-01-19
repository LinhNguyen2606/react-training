import { ReactNode, useReducer } from 'react';
import { ContextStorage } from '.';

import reducer, { initialState } from './Reducer';

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextStorage.Provider value={{ state, dispatch }}>
      {children}
    </ContextStorage.Provider>
  );
};

export default Provider;
