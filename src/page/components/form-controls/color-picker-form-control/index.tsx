import { ColorPicker, ColorPickerProps } from "@page-components/basic/color-picker";
import { Flex } from "@page-components/basic/flex";
import { FormLabel } from "@page-components/basic/form-label";
import React from "react";

interface Props extends ColorPickerProps {
  label: string;
}

export const ColorPickerFormControl = ({ label, ...colorPickerProps }: Props) => {
  return (
    <Flex direction="column" gap={4}>
      <FormLabel>{label}</FormLabel>
      <ColorPicker {...colorPickerProps} />
    </Flex>
  );
};
