import React, { createContext, useState } from 'react';
import { SearchContextProvider } from './SearchContext';
import { ProfileContextProvider } from './ProfileContext';

export const AppContext = createContext({});

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <AppContext.Provider value={{}}>
      <ProfileContextProvider>
      <SearchContextProvider>
      {children}
      </SearchContextProvider>
      </ProfileContextProvider>
    </AppContext.Provider>
  );
};
