import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchContextProvider, useSearchContext } from '../SearchContext';
import { MockedProvider } from '@apollo/client/testing';

function renderContext() {
  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <SearchContextProvider>
        <div data-testid="test-child" />
      </SearchContextProvider>
    </MockedProvider>
  );
}

describe('SearchContextProvider', () => {
  it('renders its children', () => {
    render(renderContext());

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});