import React, {createContext, useState} from 'react';
import useDebounceValue from '../hooks/useDebounceValue';

type SearchContextType = {
  searchTerm: string;
  setSearchTerm?: (term: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: undefined,
});

export interface SearchContextProviderProps {
  children: React.ReactNode;
}

export const SearchContextProvider: React.FC<React.PropsWithChildren<SearchContextProviderProps>> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {debouncedValue} = useDebounceValue({
    value: searchTerm,
    delay: 500,
  });

  return (
    <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
      {children}
    </SearchContext.Provider>
  );
};