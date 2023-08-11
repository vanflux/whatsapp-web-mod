import { BackgroundPicker, BackgroundPickerProps } from "@page-components/basic/background-picker";
import { Flex } from "@page-components/basic/flex";
import { FormLabel } from "@page-components/basic/form-label";
import React from "react";

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
