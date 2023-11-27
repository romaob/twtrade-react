import React, { createContext, useState } from 'react';
import { SearchContextProvider } from './SearchContext';

export const AppContext = createContext({});

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={{}}>
      <SearchContextProvider>{children}</SearchContextProvider>
    </AppContext.Provider>
  );
};
