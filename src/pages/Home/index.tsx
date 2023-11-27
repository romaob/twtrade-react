import React, { useState } from 'react';
import Button, { ButtonColors } from '../../components/Button';

import './Home.css';
import { useSearchContext } from '../../context/SearchContext';
import Filters from '../../components/Filters';

export default function Home(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const {debouncedValue} = useSearchContext();


  function handleToggleMenuClick() {
    setShowMenu(!showMenu);
  }

  function getTitle() {
    if (debouncedValue) {
      return `Recent posts for "${debouncedValue}"`;
    }
    return 'Recent posts';
  }

  return (
    <div className="page" data-testid="home-page">
      <div className='search-menu-container'>
        <div className='search-menu-button-container'>
          <Button onClick={handleToggleMenuClick} icon color={showMenu ? ButtonColors.transparent : ButtonColors.primary}>
            <img src={require('../../assets/images/menu.png')} alt='menu' className='icon-large'/>
          </Button>
        </div>
        <div className={`search-menu ${showMenu ? 'show' : ''}`}>
          <img src={require('../../assets/images/logo-white.png')} alt='logo' className='menu-logo'/>
          <Filters />
        </div>
      </div>
      <div className='search-content'>
        <div className='search-top'>
          <h1 className='search-term-title'>{getTitle()}</h1>
        </div>
        <div className='search-results'>
        </div>
      </div>
    </div>
  );
}
