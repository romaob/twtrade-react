import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Welcome from '.';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

function getComponent() {
  return (
    <BrowserRouter>
      <Welcome />;
    </BrowserRouter>
  );
}

describe('Welcome page', () => {
  it('should render without errors', () => {
    render(getComponent());
    expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
  });

  it('should render the expected components and info', () => {
    render(getComponent());
    expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-title')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-description')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-search-input')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-search-button')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-bg')).toBeInTheDocument();
    expect(screen.getByTestId('welcome-panel')).toBeInTheDocument();
  });
});
