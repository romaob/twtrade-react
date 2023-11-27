import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from '.';
import userEvent from '@testing-library/user-event';

describe('Welcome page', () => {
    it('should render without errors', () => {
        render(<Welcome />);
        expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
    });

    it('should render the expected components and info', () => {
        render(<Welcome />);
        expect(screen.getByTestId('welcome-page')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-title')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-description')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-search-input')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-search-button')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-bg')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-panel')).toBeInTheDocument();        
    });

    it('should be able to fill the search input', () => {
        const testText = 'test';
        render(<Welcome />);
        const searchInput = screen.getByTestId('welcome-search-input');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveValue('');
        searchInput.focus();
        expect(searchInput).toHaveFocus();
        userEvent.type(searchInput, testText);
        expect(searchInput).toHaveValue(testText);
    });

    it('should render different texts on the search button depending on the input state', () => {
        render(<Welcome />);
        expect(screen.getByTestId('welcome-search-button')).toBeInTheDocument();
        expect(screen.getByTestId('welcome-search-button')).toHaveTextContent('Search All Posts!');
        const testText = 'test';
        const searchInput = screen.getByTestId('welcome-search-input');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveValue('');
        searchInput.focus();
        expect(searchInput).toHaveFocus();
        userEvent.type(searchInput, testText);
        expect(searchInput).toHaveValue(testText);
        expect(screen.getByTestId('welcome-search-button')).toHaveTextContent('Search Posts!');
    });

    it('should redirect to the home page updating the state with the search input text', () => {
        render(<Welcome />);
        const testText = 'test';
        const searchInput = screen.getByTestId('welcome-search-input');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveValue('');
        searchInput.focus();
        expect(searchInput).toHaveFocus();
        userEvent.type(searchInput, testText);
        expect(searchInput).toHaveValue(testText);
        const searchButton = screen.getByTestId('welcome-search-button');
        expect(searchButton).toBeInTheDocument();
        userEvent.click(searchButton);
        //Expect to be redirected to the home page
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
});
