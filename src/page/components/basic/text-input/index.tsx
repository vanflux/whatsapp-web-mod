import React, { ForwardedRef, KeyboardEvent, RefObject, forwardRef } from "react";
import styles from "./styles.module.css";

interface Props {
  value?: string;
  placeholder?: string;
  onChange?: (value?: string) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  fullWidth?: boolean;
}

export const TextInput = forwardRef(({ value, placeholder, onChange, onKeyDown, onKeyUp, fullWidth }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      type="text"
      style={{ width: fullWidth ? "100%" : undefined }}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      className={styles.container}
    />
  );
});
