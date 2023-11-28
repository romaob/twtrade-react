import React, { useState } from 'react';

import './ImageCarousel.css';

type Props = {
  images?: string[];
};

export default function ImagesCarousel({ images }: Props) {
  const [index, setIndex] = useState(0);
  const length = images ? images.length : 0;

  function handleIndexChange(offset: number) {
    const newIndex = index + offset;
    if (newIndex > length - 1) return setIndex(0);
    if (newIndex < 0) return setIndex(length - 1 || 0);
    setIndex(newIndex);
  }

  function handleSelectorClick(i: number) {
    setIndex(i);
  }

  return (
    <div className="carousel" data-testid="carousel">
      {length > 1 && (
        <div
          className="carousel-prev"
          data-testid="carousel-prev"
          onClick={() => handleIndexChange(-1)}
        >
          <img src={require('../../assets/images/arrow-left.png')} alt="prev" />
        </div>
      )}
      {length > 1 && (
        <div
          className="carousel-next"
          data-testid="carousel-next"
          onClick={() => handleIndexChange(1)}
        >
          <img
            src={require('../../assets/images/arrow-right.png')}
            alt="next"
          />
        </div>
      )}
      {length > 1 && (
        <div className="carousel-selectors" data-testid="carousel-selectors">
          {images?.map((_, i) => (
            <div
              key={i}
              className={`carousel-selector ${i === index ? 'selected' : ''}`}
              data-testid="carousel-selector"
              onClick={() => {
                handleSelectorClick(i);
              }}
            />
          ))}
        </div>
      )}
      <div className="carousel-image" data-testid="carousel-images">
        {!images || images.length === 0 ? (
          <div className="carousel-empty" data-testid="carousel-empty">
            <h1>No images</h1>
          </div>
        ) : (
          <img src={images[index]} alt="carousel" data-testid="carousel-img" />
        )}
      </div>
    </div>
  );
}
