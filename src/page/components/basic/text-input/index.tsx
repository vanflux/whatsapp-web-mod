import React, { ForwardedRef, KeyboardEvent, forwardRef } from 'react';

interface Props {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value?: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  fullWidth?: boolean;
}

export const TextInput = forwardRef(
  ({ value, placeholder, disabled, onChange, onKeyDown, onKeyUp, fullWidth }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        type="text"
        disabled={disabled}
        style={{ width: fullWidth ? '100%' : undefined }}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        className="flex m-0 p-1 border border-gray-300 h-7 rounded box-border text-black"
      />
    );
  },
);
