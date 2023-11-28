import React from 'react';

import './Button.css';

export enum ButtonColors {
  primary = 'primary',
  secondary = 'secondary',
  accent = 'accent',
  transparent = 'transparent',
}

type Props = {
  text?: string;
  onClick: () => void;
  testId?: string;
  children?: React.ReactNode;
  icon?: boolean;
  color?: ButtonColors;
};

export default function Button({
  text = '',
  onClick,
  testId = 'app-button',
  children,
  icon = false,
  color = ButtonColors.secondary,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`appButton ${color || ''} ${icon ? 'icon' : ''}`}
      data-testid={testId}
    >
      {text}
      {children}
    </button>
  );
}
