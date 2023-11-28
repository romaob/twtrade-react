import React from 'react';
import Button from '../../components/Button';
import { useSearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import TextInput, { TextInputSizes } from '../../components/TextInput';
import Skeleton from '../../components/Skeleton';

export default function Welcome(): JSX.Element {
  const [text, setText] = React.useState('');
  const { setSearchFilters, debouncedFilters, searchFilters } =
    useSearchContext();

  const navigate = useNavigate();

  /**
   * Function to get the button text based on the search input state
   * @returns {string} The button text
   */
  function getButtonText() {
    if (debouncedFilters?.description) return 'Search Posts!';
    return 'Search All Posts!';
  }

  /**
   * Function to handle the search button click
   */
  function handleSearchButtonClick() {
    setSearchFilters &&
      setSearchFilters({
        ...searchFilters,
        description: text,
      });
    navigate('/posts');
  }

  return (
    <div className="page" data-testid="welcome-page">
      <div className="page-content">
        <div className="bg-container" data-testid="welcome-bg">
          <div className="bg" />
          <img
            className="welcome-logo"
            src={require('../../assets/images/logo-white.png')}
            alt="logo"
          />
          <h1 className="title">Find your bike here!</h1>
        </div>
        <div className="panel" data-testid="welcome-panel">
          <h1 className="title" data-testid="welcome-title">
            Welcome to Two Wheel Trade!
          </h1>
          <p className="description" data-testid="welcome-description">
            Search for a specific model or hit the button to search all posts!
          </p>
          <div className="search-input-container">
            <TextInput
              value={text}
              onChange={setText}
              placeholder="Search for a model, brand, post description..."
              testId="welcome-search-input"
            />
          </div>
          <Button
            text={getButtonText()}
            testId="welcome-search-button"
            onClick={handleSearchButtonClick}
          />
        </div>
      </div>
    </div>
  );
}
