import React, { createContext, useCallback, useState } from 'react';
import useDebounceValue from '../hooks/useDebounceValue';

type SearchContextType = {
  searchValue: string;
  debouncedValue: string;
  setSearchValue: (term: string) => void;
  runSearch: () => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchValue: '',
  debouncedValue: '',
  setSearchValue: () => {
    // do nothing
  },
  runSearch: () => {
    // do nothing
  },
});

export interface SearchContextProviderProps {
  children: React.ReactNode;
}

export const useSearchContext = () => React.useContext(SearchContext);

export const SearchContextProvider: React.FC<
  React.PropsWithChildren<SearchContextProviderProps>
> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const { debouncedValue } = useDebounceValue({
    value: searchValue,
    delay: 500,
  });

  const runSearch = useCallback(() => {
    //Set loading and run the graphql query
  }, [debouncedValue]);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        debouncedValue,
        setSearchValue,
        runSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
