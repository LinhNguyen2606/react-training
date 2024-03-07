import {
  ReactNode,
  Reducer,
  useReducer,
  useState
} from 'react';

// Stores
import { Context, reducer } from '@stores';
import {
  Action,
  initialState,
  State
} from '@stores/reducer';

// Interfaces
import { DataItems, User } from '@interfaces';

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer<
    Reducer<State, Action<'idle' | 'processing' | 'success' | 'failure'>>
  >(reducer, initialState);

  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({ index: -1, data: null });
  const [dataItems, setDataItems] = useState<DataItems[]>([]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        selectedRow,
        setSelectedRow,
        dataItems,
        setDataItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
