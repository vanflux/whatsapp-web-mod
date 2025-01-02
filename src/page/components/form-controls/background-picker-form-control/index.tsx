import { BackgroundPicker, BackgroundPickerProps } from '@page-components/basic/background-picker';
import { FormLabel } from '@page-components/basic/form-label';
import React from 'react';

interface Props extends BackgroundPickerProps {
  label: string;
}

export const BackgroundPickerFormControl = ({ label, ...backgroundPickerProps }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <FormLabel>{label}</FormLabel>
      <BackgroundPicker {...backgroundPickerProps} />
    </div>
  );
};
