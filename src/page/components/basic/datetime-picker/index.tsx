import React, { useCallback, useMemo } from "react";
import Datetime from "react-datetime";
import styles from "./styles.module.css";
import "react-datetime/css/react-datetime.css";

interface Props {
  value?: Date;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onlyDate?: boolean;
  onChange?: (value?: Date) => void;
}

export const DateTimePicker = ({ value, placeholder, disabled, fullWidth, onlyDate, onChange }: Props) => {
  const renderInput = useCallback((props: any) => <input {...props} value={value == undefined ? "" : props.value} />, [value]);

  const inputProps = useMemo<React.HTMLProps<HTMLInputElement> | undefined>(
    () => ({
      disabled,
      placeholder,
      className: styles.input,
      style: { width: fullWidth ? "100%" : undefined },
    }),
    [disabled, placeholder, fullWidth],
  );

  const intervalValue = useMemo(() => value, [value?.toISOString()]);

  const internalOnChange = useCallback((value: any) => onChange?.((value as any)?.toDate?.()), [onChange]);

  return (
    <Datetime
      renderInput={renderInput}
      inputProps={inputProps}
      timeFormat={onlyDate ? "" : "HH:mm:ss"}
      value={intervalValue}
      onChange={internalOnChange}
      className={styles.container}
    />
  );
};
