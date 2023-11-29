import React from 'react';

import { Post } from '../../graphql/hooks/usePostWithFilters';
import Skeleton from '../Skeleton';

import './PostCard.css';
import ImagesCarousel from '../ImageCarousel';

type Props = {
  post: Post;
  loading: boolean;
  onSelect: (post: Post) => void;
};

export default function PostCard({ post, loading, onSelect }: Props) {
  function handleSelect() {
    onSelect(post);
  }

  return (
    <Skeleton loading={loading}>
      <div className="post-card" data-testid="post-card" onClick={handleSelect}>
        <div className="card-image" data-testid="card-image">
          <ImagesCarousel images={post?.images || []} />
        </div>
        <div className="card-content" data-testid="card-content">
          <h2>{post._vehicle.name}</h2>
          <div className="card-info" data-testid="card-info">
            <h3 className="price" data-testid="price">
              $ {post.priceNow}
            </h3>
            {post.priceBefore && post.priceBefore !== post.priceNow && (
              <h4 className="price-before" data-testid="price-before">
                $ {post.priceBefore}
              </h4>
            )}
          </div>
          <div className="card-info" data-testid="card-info">
            <p>{post.year}</p>
            <p>{post.mileage} miles</p>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
