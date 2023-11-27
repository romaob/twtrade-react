import React from 'react'

export default function Welcome(): JSX.Element {
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
          />
          <button className='search-button' data-testid='welcome-search-button'>
            Search All Posts!
          </button>
        </div>
      </div>
    </div>
  )
}