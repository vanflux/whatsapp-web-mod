import React, { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../utils/cn';

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
  selected?: boolean;
  disabled?: boolean;
}

export const Button = ({ children, onClick, fullWidth, style, className, selected, disabled }: Props) => {
  return (
    <button
      style={{ width: fullWidth ? '100%' : undefined, border: selected ? '1px solid white' : '', ...style }}
      onClick={onClick}
      className={cn(
        'bg-black/40 text-gray-200 rounded transition-all flex flex-col items-center px-1 py-2',
        'justify-center min-h-7 hover:bg-gray-300/20 disabled:bg-gray-300/40 disabled:cursor-default',
        className,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
