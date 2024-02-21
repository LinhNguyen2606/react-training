import React, { createContext } from 'react';

// Interface
import { State, User } from '@interfaces';

import { initialState } from '@stores/Reducer';

type ContextProps = {
  state: State;
  dispatch: React.Dispatch<any>;
  selectedRow: { index: number; data: User | null };
  setSelectedRow: (selectedRow: { index: number; data: User | null }) => void;
  dataItems: any;
  setDataItems: React.Dispatch<React.SetStateAction<any>>;
};

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
  selectedRow: { index: -1, data: null },
  setSelectedRow: () => {},
  dataItems: [],
  setDataItems: () => {},
});

export default Context;
