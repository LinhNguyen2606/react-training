import { ReactNode, useState } from 'react';

// Stores
import { Context } from '@stores';

// Interface
import { DataItems, User } from '@interfaces';

type ProviderProps = {
  children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    data: User | null;
  }>({ index: -1, data: null });
  const [dataItems, setDataItems] = useState<DataItems[]>([]);
  const [isShowProgress, setIsShowProgress] = useState<
    'idle' | 'processing' | 'success' | 'failure'
  >('idle');

  return (
    <Context.Provider
      value={{
        selectedRow,
        setSelectedRow,
        dataItems,
        setDataItems,
        isShowProgress,
        setIsShowProgress,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
