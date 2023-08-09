import React from "react";
import styles from "./styles.module.css";

export interface SliderProps {
  value: number;
  onChange?: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  valueFormatter?: (value: number) => string;
  valueMinWidth?: number;
}

export const Slider = ({
  value,
  onChange,
  min,
  max,
  step,
  valueFormatter = String,
  valueMinWidth = 0
}: SliderProps) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.value}
        style={{ minWidth: valueMinWidth }}
      >
        {valueFormatter(value)}
      </div>
      <input
        className={styles.slider}
        type="range"
        min={min ?? 0}
        max={max ?? 1}
        step={step ?? 0.1}
        value={value ?? 0}
        onChange={e => onChange?.(Number(e.target.value))}
      />
    </div>
  )
};
