import React from 'react'
import Button, { ButtonColors } from '../Button'

import './SidePanel.css'

type Props = {
    show: boolean
    children: React.ReactNode
    onClose?: () => void
    primaryAction?: () => void
    primaryActionText?: string
    secondaryAction?: () => void
    secondaryActionText?: string
}

export default function SidePanel({
    show,
    children,
    onClose,
    primaryAction,
    primaryActionText = 'Confirm',
    secondaryAction,
    secondaryActionText = 'Cancel',
}: Props) {
  return (
    <div className="side-panel-container">
        {show && (
            <div className="side-panel">
                {onClose && (
                    <div className="top-actions">
                        <Button text='X' onClick={onClose} color={ButtonColors.transparent} />
                    </div>
                )}
                <div className="side-panel-content">{children}</div>
                {(primaryAction || secondaryAction) && (
                    <div className="side-panel-actions">
                        {secondaryAction && (
                            <Button
                                text={secondaryActionText}
                                onClick={secondaryAction}
                                color={ButtonColors.transparent}
                            />
                        )}
                        {primaryAction && (
                            <Button
                                text={primaryActionText}
                                onClick={primaryAction}
                                color={ButtonColors.primary}
                            />
                        )}
                    </div>
                )}
            </div>
        )}
    </div>
  )
}