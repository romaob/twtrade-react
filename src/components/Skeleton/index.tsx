import React from 'react';

import './Skeleton.css';

type Props = {
  loading?: boolean;
  children: React.ReactNode;
  flex?: boolean;
  rounded?: boolean;
};

export default function Skeleton({
  loading,
  children,
  flex = false,
  rounded = false,
}: Props) {
  return (
    <div
      className={`skeleton ${flex ? 'flex' : ''} ${loading ? 'loading' : ''} ${
        rounded ? 'rounded' : ''
      }`}
      data-testid="skeleton"
    >
      {children}
    </div>
  );
}
