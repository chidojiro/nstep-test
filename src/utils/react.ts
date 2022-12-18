import React from 'react';

export const createContext = <TValue = unknown>(): [React.Provider<TValue>, () => TValue] => {
  const context = React.createContext<TValue>(null as any);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hook = () => React.useContext(context);

  return [context.Provider, hook];
};
