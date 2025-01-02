import React from 'react';

export interface CheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const Checkbox = ({ value, onChange }: CheckboxProps) => {
  return <input type="checkbox" checked={value} onChange={(e) => onChange?.(e.target.checked)} />;
};
