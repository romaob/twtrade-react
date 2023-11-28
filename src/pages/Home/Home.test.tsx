import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import Home from '.';
import { render, screen } from '@testing-library/react';

function renderComponent() {
  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <Home />
    </MockedProvider>
  )
}

describe('Home page tests', () => {
  it('should render the page correctly', () => {
    render(renderComponent());
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('search-menu-button-container')).toBeInTheDocument();
    expect(screen.getByTestId('search-menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-logo')).toBeInTheDocument();
    expect(screen.getByTestId('search-content')).toBeInTheDocument();
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    expect(screen.getByTestId('filters')).toBeInTheDocument();
  });
});
