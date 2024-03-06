import React, { createContext } from 'react';

// Interface
import { DataItems } from '@interfaces';
import { ToastAction, ToastState } from './reducer';

interface ContextProps {
  selectedRow: { index: any; data: any | null };
  setSelectedRow: (selectedRow: { index: any; data: any | null }) => void;
  dataItems: DataItems[];
  setDataItems: React.Dispatch<React.SetStateAction<any>>;
  toast: ToastState;
  dispatchToast: React.Dispatch<ToastAction>;
};

const Context = createContext<ContextProps>({
  selectedRow: { index: -1, data: null },
  setSelectedRow: () => {},
  dataItems: [],
  setDataItems: () => {},
  toast: 'idle',
  dispatchToast: () => {},
});

export default Context;
