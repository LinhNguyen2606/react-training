import {
  ReactNode,
  useReducer,
  useState
} from 'react';

// Stores
import { Context, reducer } from '@stores';
import { initialState } from '@stores/reducer';

// Interface
import { User } from '@interfaces';

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({ index: -1, data: null });

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        selectedRow,
        setSelectedRow,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
