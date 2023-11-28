import React, { createContext, useCallback, useEffect, useState } from 'react';
import useDebounceValue from '../hooks/useDebounceValue';
import {
  Data,
  Post,
  usePostsWithFilters,
} from '../graphql/hooks/usePostWithFilters';

export type SearchFilters = {
  description?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMin?: number;
  mileageMax?: number;
};

type SearchContextType = {
  searchLoading?: boolean;
  searchData?: Data;
  searchFilters?: SearchFilters | null;
  setSearchFilters?: (filters: SearchFilters) => void;
  debouncedFilters?: SearchFilters | null;
};

export const SearchContext = createContext<SearchContextType>({
  searchLoading: false,
  searchData: undefined,
  searchFilters: undefined,
  setSearchFilters: () => {
    // do nothing
  },
  debouncedFilters: {},
});

export interface SearchContextProviderProps {
  children: React.ReactNode;
}

export const useSearchContext = () => React.useContext(SearchContext);

export const SearchContextProvider: React.FC<
  React.PropsWithChildren<SearchContextProviderProps>
> = ({ children }) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(
    null,
  );
  const { debouncedValue: debouncedFilters } = useDebounceValue({
    value: searchFilters,
    delay: 500,
  });
  const { loading, data, error } = usePostsWithFilters(debouncedFilters);

  return (
    <SearchContext.Provider
      value={{
        searchLoading: loading,
        searchData: data,
        searchFilters,
        setSearchFilters,
        debouncedFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
