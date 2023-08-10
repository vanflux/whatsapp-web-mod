import React from "react";
import styles from "./styles.module.css";

interface Props {
  value?: string;
  placeholder?: string;
  onChange?: (value?: string) => void;
  fullWidth?: boolean;
}

export const TextInput = ({
  value,
  placeholder,
  onChange,
  fullWidth,
}: Props) => {
  return (
    <input
      type="text"
      style={{ width: fullWidth ? "100%" : undefined }}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className={styles.container}
    />
  );
};
