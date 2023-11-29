import React from 'react';
import Button, { ButtonColors } from '../Button';

import './SidePanel.css';
import Skeleton from '../Skeleton';

type Props = {
  show: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  primaryAction?: () => void;
  primaryActionText?: string;
  secondaryAction?: () => void;
  secondaryActionText?: string;
  loading?: boolean;
};

export default function SidePanel({
  show,
  children,
  onClose,
  primaryAction,
  primaryActionText = 'Confirm',
  secondaryAction,
  secondaryActionText = 'Cancel',
  loading,
}: Props) {
  return (
    <div className="side-panel-container">
      {show && (
        <div className="side-panel">
          {onClose && (
            <div className="top-actions">
              <Skeleton loading={loading} rounded>
                <Button
                  text="X"
                  onClick={onClose}
                  color={ButtonColors.transparent}
                />
              </Skeleton>
            </div>
          )}
          <div className="side-panel-content">{children}</div>
          {(primaryAction || secondaryAction) && (
            <div className="side-panel-actions">
              {secondaryAction && (
                <Skeleton loading={loading}>
                  <Button
                    text={secondaryActionText}
                    onClick={secondaryAction}
                    color={ButtonColors.transparent}
                  />
                </Skeleton>
              )}
              {primaryAction && (
                <Skeleton loading={loading}>
                  <Button
                    text={primaryActionText}
                    onClick={primaryAction}
                    color={ButtonColors.primary}
                  />
                </Skeleton>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
