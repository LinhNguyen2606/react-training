import {
  ReactNode,
  useReducer,
  useState
} from 'react';

// Stores
import { Context, reducer } from '@stores';

// Interface
import { DataItems, User } from '@interfaces';

interface ProviderProps {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [toast, dispatchToast] = useReducer(reducer, 'idle');

  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({ index: -1, data: null });
  const [dataItems, setDataItems] = useState<DataItems[]>([]);
  
  return (
    <Context.Provider
      value={{
        toast,
        dispatchToast,
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
