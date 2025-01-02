import { Checkbox, CheckboxProps } from '@page-components/basic/checkbox';
import { FormLabel } from '@page-components/basic/form-label';
import React from 'react';

interface Props extends CheckboxProps {
  label?: string;
}

export const CheckboxFormControl = ({ label, ...checkboxProps }: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Checkbox {...checkboxProps} />
      <FormLabel>{label}</FormLabel>
    </div>
  );
};
