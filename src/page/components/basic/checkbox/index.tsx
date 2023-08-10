import React from "react";
import styles from "./styles.module.css";

export interface CheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export const Checkbox = ({ value, onChange }: CheckboxProps) => {
  return <input className={styles.container} type="checkbox" checked={value} onChange={(e) => onChange?.(e.target.checked)} />;
};
