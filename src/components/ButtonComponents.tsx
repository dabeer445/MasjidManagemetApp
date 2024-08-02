import React from 'react';
import { Button } from '@nextui-org/react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow';
  isLoading?: boolean;
  className?: string;
}

export const SubmitButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  color = 'primary',
  variant = 'solid',
  isLoading = false,
  className,
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      onPress={onClick}
      isLoading={isLoading}
      className={className}
    >
      {children}
    </Button>
  );
};

export const CancelButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  color = 'danger',
  variant = 'light',
  className,
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      onPress={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};