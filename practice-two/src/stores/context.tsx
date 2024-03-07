import { DataItems } from '@interfaces';
import React, { createContext } from 'react';

import { initialState, State } from './reducer';

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<any>;
  selectedRow: { index: any; data: any | null };
  setSelectedRow: (selectedRow: { index: any; data: any | null }) => void;
  dataItems: DataItems[];
  setDataItems: React.Dispatch<React.SetStateAction<any>>;
};

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => { },
  selectedRow: { index: -1, data: null },
  setSelectedRow: () => {},
  dataItems: [],
  setDataItems: () => {},
});

export default Context;
