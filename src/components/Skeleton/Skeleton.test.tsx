import { render, screen } from '@testing-library/react';
import React from 'react';
import Skeleton from '.';

const TestChild = () => <div data-testid="test-child">Test Child</div>;

describe('Tests for the Skeleton component', () => {
  it('should render the component and chilren when loading false or undefined', () => {
    render(
      <Skeleton>
        <TestChild />
      </Skeleton>,
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should have the loading style', () => {
    render(
      <Skeleton loading={true}>
        <TestChild />
      </Skeleton>,
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton')).toHaveClass('loading');
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });
});
