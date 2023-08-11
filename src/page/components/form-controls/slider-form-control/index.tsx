import { Flex } from "@page-components/basic/flex";
import { FormLabel } from "@page-components/basic/form-label";
import { Slider, SliderProps } from "@page-components/basic/slider";
import React from "react";

interface Props extends SliderProps {
  label: string;
}

export const SliderFormControl = ({ label, ...sliderProps }: Props) => {
  return (
    <Flex direction="column" gap={4}>
      <FormLabel>{label}</FormLabel>
      <Slider {...sliderProps} />
    </Flex>
  );
};
