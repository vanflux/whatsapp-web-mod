import React from "react";
import Datetime from "react-datetime";
import styles from "./styles.module.css";
import "react-datetime/css/react-datetime.css";

interface Props {
  value?: Date;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value?: Date) => void;
}

export const DateTimePicker = ({ value, placeholder, disabled, fullWidth, onChange }: Props) => {
  return (
    <Datetime
      renderInput={(props) => <input {...props} />}
      inputProps={{
        disabled,
        placeholder,
        className: styles.input,
        style: { width: fullWidth ? "100%" : undefined },
      }}
      timeFormat="HH:mm:ss"
      value={value}
      initialViewDate={new Date()}
      onChange={(value) => onChange?.((value as any)?.toDate())}
      className={styles.container}
    />
  );
};
