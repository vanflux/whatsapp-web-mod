import React from "react";
import { Checkbox, CheckboxProps } from "../../basic/checkbox";
import { Flex } from "../../basic/flex";
import { FormLabel } from "../../basic/form-label";

interface Props extends CheckboxProps {
  label?: string;
}

export const CheckboxFormControl = ({
  label,
  ...checkboxProps
}: Props) => {
  return (
    <Flex align='center' gap={4}>
      <Checkbox {...checkboxProps} />
      <FormLabel>{label}</FormLabel>
    </Flex>
  )
};
