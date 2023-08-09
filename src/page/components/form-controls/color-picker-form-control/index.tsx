import React from "react";
import { ColorPicker, ColorPickerProps } from "../../basic/color-picker";
import { Flex } from "../../basic/flex";
import { FormLabel } from "../../basic/form-label";

interface Props extends ColorPickerProps {
  label: string;
}

export const ColorPickerFormControl = ({
  label,
  ...colorPickerProps
}: Props) => {
  return (
    <Flex direction='column' gap={4}>
      <FormLabel>{label}</FormLabel>
      <ColorPicker {...colorPickerProps} />
    </Flex>
  )
};
