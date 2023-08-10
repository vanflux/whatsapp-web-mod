import React from "react";
import { BackgroundPicker, BackgroundPickerProps } from "../../basic/background-picker";
import { Flex } from "../../basic/flex";
import { FormLabel } from "../../basic/form-label";

interface Props extends BackgroundPickerProps {
  label: string;
}

export const BackgroundPickerFormControl = ({ label, ...backgroundPickerProps }: Props) => {
  return (
    <Flex direction="column" gap={4}>
      <FormLabel>{label}</FormLabel>
      <BackgroundPicker {...backgroundPickerProps} />
    </Flex>
  );
};
