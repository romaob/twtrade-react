import React from 'react'

import './Button.css'

type Props = {
    text: string
    onClick: () => void
    testId?: string
}

export default function Button({
    text,
    onClick,
    testId = 'app-button'
}: Props) {
  return (    
    <button onClick={onClick} className='appButton' data-testid={testId}>{text}</button>
  )
}