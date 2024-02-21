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
  const [dataItems, setDataItems] = useState<any>([]);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        selectedRow,
        setSelectedRow,
        dataItems,
        setDataItems
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
