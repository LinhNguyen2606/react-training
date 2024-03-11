import {
  ReactNode,
  Reducer,
  useReducer
} from 'react';

// Stores
import { Context, reducer } from '@stores';
import {
  Action,
  initialState,
  State
} from '@stores/reducer';

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<State<any>, Action>>(
    reducer,
    initialState
  );

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
