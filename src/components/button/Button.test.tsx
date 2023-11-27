import React from 'react';
import Button from ".";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('App button component tests', () => {
    
    it('should render button with text and handle the onClick', () => {
        const text = 'test';
        const onClick = jest.fn();
        render(<Button text={text} onClick={onClick} />);
        expect(onClick).toHaveBeenCalledTimes(0); 
        const button = screen.getByTestId('app-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(text);
        userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

});