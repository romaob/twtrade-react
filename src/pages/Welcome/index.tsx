import React from 'react'
import Button from '../../components/button'
import { useSearchContext } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom';

export default function Welcome(): JSX.Element {
  const {searchValue, setSearchValue, runSearch} = useSearchContext();

  const navigate = useNavigate();

  /**
   * Function to get the button text based on the search input state
   * @returns {string} The button text
   */
  function getButtonText() {
    return 'Search All Posts!'
  }

  /**
   * Function to handle the search button click
   */
  function handleSearchButtonClick() {
    runSearch();
    navigate('/home');
  }

  /**
   * Function to handle the search input change
   * @param {React.ChangeEvent<HTMLInputElement>} event The input change event
   */
  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setSearchValue(text || '');
  }

  return (
    <div className='page' data-testid='welcome-page'>
      <div className='page-content'>
        <div className='bg-container' data-testid='welcome-bg'>
          <div className='bg' />
          <img className='welcome-logo' src={require('../../assets/images/logo-white.png')} alt='logo'/>
          <h1 className='title'>Find your bike here!</h1>
        </div>
        <div className='panel' data-testid='welcome-panel'>
          <h1 className='title' data-testid='welcome-title'>
            Welcome to Two Wheel Trade!
          </h1>
          <p className='description' data-testid='welcome-description'>
            Search for a specific model or hit the button to search all posts!
          </p>
          <input
            type='text'
            className='search-input'
            placeholder='Search for a model, brand, post description...'
            data-testid='welcome-search-input'
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          <Button text={getButtonText()} testId='welcome-search-button' onClick={handleSearchButtonClick}/>
        </div>
      </div>
    </div>
  )
}