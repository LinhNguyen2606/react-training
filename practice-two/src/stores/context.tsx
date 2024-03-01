import React, { createContext } from 'react';

// Interface
import { DataItems } from '@interfaces';

type ContextProps = {
  selectedRow: { index: any; data: any | null };
  setSelectedRow: (selectedRow: { index: any; data: any | null }) => void;
  dataItems: DataItems[];
  setDataItems: React.Dispatch<React.SetStateAction<any>>;
  isShowProgress: 'idle' | 'processing' | 'success' | 'failure';
  setIsShowProgress: React.Dispatch<
    React.SetStateAction<'idle' | 'processing' | 'success' | 'failure'>
  >;
};

const Context = createContext<ContextProps>({
  selectedRow: { index: -1, data: null },
  setSelectedRow: () => {},
  dataItems: [],
  setDataItems: () => {},
  isShowProgress: 'idle',
  setIsShowProgress: () => {},
});

export default Context;
