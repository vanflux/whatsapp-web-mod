import { FormLabel } from '@page-components/basic/form-label';
import { Slider, SliderProps } from '@page-components/basic/slider';
import React from 'react';

interface Props extends SliderProps {
  label: string;
}

export const SliderFormControl = ({ label, ...sliderProps }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <FormLabel>{label}</FormLabel>
      <Slider {...sliderProps} />
    </div>
  );
};
