import { render, screen } from '@testing-library/react';
import React from 'react';
import ImagesCarousel from '.';
import userEvent from '@testing-library/user-event';

describe('ImageCarousel component tests', () => {
  it('should render the component with empty state correctly', () => {
    render(<ImagesCarousel />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-empty')).toBeInTheDocument();
  });

  it('should display the images in a working carousel', () => {
    render(
      <ImagesCarousel images={['image1.jpg', 'image2.jpg', 'image3.jpg']} />,
    );
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-prev')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-next')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-selectors')).toBeInTheDocument();
    expect(screen.queryAllByTestId('carousel-selector')).toHaveLength(3);
    expect(screen.getByTestId('carousel-img')).toBeInTheDocument();
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image1.jpg',
    );
    userEvent.click(screen.getByTestId('carousel-next'));
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image2.jpg',
    );
    userEvent.click(screen.getByTestId('carousel-next'));
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image3.jpg',
    );
    userEvent.click(screen.getByTestId('carousel-next'));
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image1.jpg',
    );
    userEvent.click(screen.getByTestId('carousel-prev'));
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image3.jpg',
    );
    userEvent.click(screen.getByTestId('carousel-prev'));
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image2.jpg',
    );
    userEvent.click(screen.getAllByTestId('carousel-selector')[0]);
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image1.jpg',
    );
    userEvent.click(screen.getAllByTestId('carousel-selector')[1]);
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image2.jpg',
    );
    userEvent.click(screen.getAllByTestId('carousel-selector')[2]);
    expect(screen.getByTestId('carousel-img')).toHaveAttribute(
      'src',
      'image3.jpg',
    );
  });
});
