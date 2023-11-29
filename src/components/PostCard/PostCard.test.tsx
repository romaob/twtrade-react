import React from 'react';
import PostCard from '.';
import { render, screen } from '@testing-library/react';
import { Post } from '../../graphql/hooks/usePostWithFilters';

const post: Post = {
  _vehicle: {
    _id: '1',
    name: 'Test Vehicle',
  },
  priceNow: 10000,
  priceBefore: 20000,
  year: 2020,
  mileage: 10000,
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  _id: '',
  _user: {
    _id: '',
    username: '',
    email: '',
    profile: {
      name: '',
      profileImage: '',
    },
  },
  createdAt: '',
  description: '',
  updatedAt: '',
  views: 0,
};

describe('PostCard component tests', () => {
  it('should render the component correctly', () => {
    render(
      <PostCard
        post={post}
        loading={false}
        onSelect={() => {
          /**/
        }}
      />,
    );
    expect(screen.getByTestId('post-card')).toBeInTheDocument();
    expect(screen.getByTestId('card-image')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.queryAllByTestId('card-info')).toHaveLength(2);
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('price-before')).toBeInTheDocument();
    expect(screen.getByText('Test Vehicle')).toBeInTheDocument();
    expect(screen.getByText('$ 10000')).toBeInTheDocument();
    expect(screen.getByText('$ 20000')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('10000 miles')).toBeInTheDocument();
  });

  it('should call onSelect with the post when selected', () => {
    const onSelect = jest.fn();
    render(<PostCard post={post} loading={false} onSelect={onSelect} />);
    expect(onSelect).not.toHaveBeenCalled();
    screen.getByTestId('post-card').click();
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(post);
  });
});
