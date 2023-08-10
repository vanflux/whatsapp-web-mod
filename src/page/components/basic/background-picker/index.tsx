import React, { useMemo, useRef, useState } from "react";
import { useOutsideAlert } from "../../../hooks/use-outside-alert";
import { themerGradients } from "../../../mods/themer/gradients";
import styles from "./styles.module.css";

export interface BackgroundPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const BackgroundPicker = ({ value, onChange }: BackgroundPickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useOutsideAlert(ref, () => setOpen(false));

  const items = useMemo(() => {
    if (value) {
      return [
        themerGradients.find((x) => x.value === value) ?? {
          value,
          name: "Custom",
        },
        ...themerGradients.filter((x) => x.value !== value),
      ];
    } else {
      return themerGradients;
    }
  }, [open]);

  return (
    <div className={styles.container} ref={ref}>
      <div
        className={`${styles.field} ${styles.item}`}
        style={{
          background: value,
          borderBottomLeftRadius: open ? 0 : undefined,
          borderBottomRightRadius: open ? 0 : undefined,
        }}
        onClick={() => setOpen(!open)}
      >
        <div>{items.find((x) => x.value === value)?.name}</div>
      </div>
      {open && (
        <div className={styles.selector}>
          {items.map((gradient) => (
            <div
              key={gradient.value}
              className={`${styles.item} ${gradient.value === value ? styles.selected : ""}`}
              style={{
                background: gradient.value,
              }}
              onClick={() => onChange(gradient.value)}
            >
              <div>{gradient.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
