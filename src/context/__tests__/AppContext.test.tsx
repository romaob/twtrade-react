import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppContextProvider } from '../AppContext';
import { MockedProvider } from '@apollo/client/testing';

describe('AppContextProvider', () => {
  it('renders its children', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AppContextProvider>
          <div data-testid="test-child" />
        </AppContextProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});