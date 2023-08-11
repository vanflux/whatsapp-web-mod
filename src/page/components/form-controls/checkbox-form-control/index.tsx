import { Checkbox, CheckboxProps } from "@page-components/basic/checkbox";
import { Flex } from "@page-components/basic/flex";
import { FormLabel } from "@page-components/basic/form-label";
import React from "react";

interface Props extends CheckboxProps {
  label?: string;
}

export const CheckboxFormControl = ({ label, ...checkboxProps }: Props) => {
  return (
    <Flex align="center" gap={4}>
      <Checkbox {...checkboxProps} />
      <FormLabel>{label}</FormLabel>
    </Flex>
  );
};
