import React from 'react';

import './TextInput.css';

export enum TextInputSizes {
  SMALL = 'text-small',
  MEDIUM = 'text-medium',
  LARGE = 'text-large',
}

type TextInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  testId?: string;
  size?: TextInputSizes;
  placeholder?: string;
  type?: string;
};

export default function TextInput({
  value,
  onChange,
  testId = 'app-text-input',
  size = TextInputSizes.SMALL,
  placeholder = '',
  type = 'text',
}: TextInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={`textInput ${size}`}
      data-testid={testId}
      placeholder={placeholder}
      type={type}
    />
  );
}
