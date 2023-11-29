import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import Filters from '.';
import { AppContextProvider } from '../../context/AppContext';
import userEvent from '@testing-library/user-event';
import { SearchContext, useSearchContext } from '../../context/SearchContext';

const componentWrapper = () => (
  <MockedProvider mocks={[]} addTypename={false}>
    <AppContextProvider>
      <Filters />
    </AppContextProvider>
  </MockedProvider>
);

jest.mock('../../graphql/hooks/useBrands', () => ({
  useBrands: () => ({
    brands: [
      {
        _id: '1',
        name: 'Test Brand',
      },
    ],
    loading: false,
  }),
}));

const setFiltersMock = jest.fn();
jest.doMock('../../context/SearchContext', () => ({
  useSearchContext: () => ({
    searchFilters: {},
    setSearchFilters: setFiltersMock,
  }),
}));

describe('Filters component tests', () => {
  it('should render the component correctly', () => {
    render(componentWrapper());
    expect(screen.getByTestId('filters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Posts')).toBeInTheDocument();
    expect(screen.getByText('Makes:')).toBeInTheDocument();
    expect(screen.getByText('Price:')).toBeInTheDocument();
    expect(screen.getByTestId('price-min')).toBeInTheDocument();
    expect(screen.getByTestId('price-max')).toBeInTheDocument();
    expect(screen.getByTestId('year-min')).toBeInTheDocument();
    expect(screen.getByTestId('year-max')).toBeInTheDocument();
    expect(screen.getByText('Mileage:')).toBeInTheDocument();
    expect(screen.getByTestId('mileage-min')).toBeInTheDocument();
    expect(screen.getByTestId('mileage-max')).toBeInTheDocument();
  });

  it('should show and handle the search input', () => {
    render(componentWrapper());
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
  });

  it('should show the list of makes', () => {
    render(componentWrapper());
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });
});
