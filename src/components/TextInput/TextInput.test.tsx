import React from 'react';
import { render, screen } from '@testing-library/react';
import TextInput from '.';
import userEvent from '@testing-library/user-event';

describe('TextInput tests', () => {
  it('should render the component correctly', () => {
    render(<TextInput value="" onChange={() => {}} />);
    expect(screen.getByTestId('app-text-input')).toBeInTheDocument();
  });

  it('should display the placeholder correctly', () => {
    render(
      <TextInput value="" onChange={() => {}} placeholder="test placeholder" />,
    );
    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('should display the value correctly', () => {
    render(<TextInput value="test value" onChange={() => {}} />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('should call the onChange function correctly', () => {
    const onChange = jest.fn();
    render(<TextInput value="" onChange={onChange} />);
    const input = screen.getByTestId('app-text-input');
    expect(onChange).toHaveBeenCalledTimes(0);
    userEvent.type(input, 'test value');
    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
