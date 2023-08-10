import React, { useRef, useState } from "react";
import { ChromePicker, ColorResult } from "react-color";
import { useOutsideAlert } from "../../../hooks/use-outside-alert";
import styles from "./styles.module.css";

export interface ColorPickerProps {
  value: string;
  onChange: (value: ColorResult) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useOutsideAlert(ref, () => setOpen(false));

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.field} style={{ background: value }} onClick={() => setOpen(!open)} />
      {open && (
        <div className={styles.selector}>
          <ChromePicker color={value} onChange={onChange} onChangeComplete={onChange} />
        </div>
      )}
    </div>
  );
};
