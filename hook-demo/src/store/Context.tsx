import React, { createContext } from 'react';
import { State } from '../interfaces';
import { initialState } from './Reducer';

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<any>;
};

const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});

export default Context;
