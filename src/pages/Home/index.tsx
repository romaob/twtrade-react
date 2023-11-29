import React, { useState } from 'react';
import Button, { ButtonColors } from '../../components/Button';

import './Home.css';
import { useSearchContext } from '../../context/SearchContext';
import Filters from '../../components/Filters';

import PostCard from '../../components/PostCard';
import { Post } from '../../graphql/hooks/usePostWithFilters';
import SidePanel from '../../components/SidePanel';
import ProfileMenu from '../../components/ProfileMenu';
import { useProfileContext } from '../../context/ProfileContext';
import PostForm from '../../components/PostForm';

export default function Home(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const { profile } = useProfileContext();

  const {
    searchFilters,
    setSearchFilters,
    debouncedFilters,
    searchLoading,
    searchData,
    reSearch,
  } = useSearchContext();

  function handleToggleMenuClick() {
    setShowMenu(!showMenu);
  }

  function getTitle() {
    if (searchLoading) return 'Looking for posts...';
    if (debouncedFilters?.description) {
      return `Recent posts for "${debouncedFilters?.description}"`;
    }
    return 'Recent posts';
  }

  function getResults() {
    if (searchLoading) {
      const results: Post[] = [];
      for (let i = 0; i < 10; i++) {
        results.push({
          _id: i.toString(),
          _vehicle: {
            _id: '123456',
            name: 'Lorem ipsum dolor sit amet',
          },
          priceNow: 12345,
          priceBefore: 12345,
          year: 1234,
          mileage: 1234,
          _user: {
            _id: '',
            username: '',
            email: '',
            profile: {
              name: '',
              profileImage: '',
            },
          },
          createdAt: new Date().toISOString(),
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam',
          images: ['img1', 'img2', 'img3'],
          updatedAt: new Date().toISOString(),
          views: 999,
        });
      }
      return (
        <>
          {results.map((post, i) => (
            <PostCard
              key={i + post._id}
              post={post}
              loading
              onSelect={() => {
                /**/
              }}
            />
          ))}
        </>
      );
    }

    if (searchData?.postsWithFilters?.length === 0) {
      return (
        <div className="no-results">
          <h2>No results found</h2>
        </div>
      );
    }

    if (searchData?.postsWithFilters) {
      return (
        <>
          {searchData?.postsWithFilters.map((post, i) => (
            <PostCard
              key={i + post._id}
              post={post}
              loading={false}
              onSelect={() => {
                /**/
              }}
            />
          ))}
        </>
      );
    }
  }

  function handleTogglePostForm() {
    setShowPostForm(!showPostForm);
  }

  function handleCreatePostFormClose(refresh: boolean) {
    setShowPostForm(false);
    if (refresh) {
      reSearch && reSearch();
    }
  }

  React.useEffect(() => {
    if (!searchFilters) {
      setSearchFilters && setSearchFilters({});
    }
  }, []);

  return (
    <div className="page" data-testid="home-page">
      <div className="search-menu-container" data-testid="search-menu">
        <div
          className="search-menu-button-container"
          data-testid="search-menu-button-container"
        >
          <Button
            onClick={handleToggleMenuClick}
            icon
            color={showMenu ? ButtonColors.transparent : ButtonColors.primary}
            testId="toggle-menu-button"
          >
            <img
              src={require('../../assets/images/menu.png')}
              alt="menu"
              className="icon-large"
            />
          </Button>
        </div>
        <div
          className={`search-menu ${showMenu ? 'show' : ''}`}
          data-testid="menu"
        >
          <img
            src={require('../../assets/images/logo-white.png')}
            alt="logo"
            className="menu-logo"
            data-testid="menu-logo"
          />
          <Filters />
        </div>
      </div>
      <div className="search-content" data-testid="search-content">
        <div className="search-top">
          <h1 className="search-term-title">{getTitle()}</h1>
          {profile && (
            <Button
              text="Post an ad"
              color={ButtonColors.accent}
              onClick={handleTogglePostForm}
            />
          )}
          <div className="space" />
          <ProfileMenu />
        </div>
        <div className="search-results" data-testid="search-results">
          {getResults()}
        </div>
      </div>
      <PostForm show={showPostForm} onClose={handleCreatePostFormClose} />
    </div>
  );
}
