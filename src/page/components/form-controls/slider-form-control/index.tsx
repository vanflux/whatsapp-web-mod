import React from "react";
import { Slider, SliderProps } from "../../basic/slider";
import { FormLabel } from "../../basic/form-label";
import { Flex } from "../../basic/flex";

interface Props extends SliderProps {
  label: string;
}

export const SliderFormControl = ({
  label,
  ...sliderProps
}: Props) => {
  return (
    <Flex direction='column' gap={4}>
      <FormLabel>{label}</FormLabel>
      <Slider {...sliderProps} />
    </Flex>
  )
};
