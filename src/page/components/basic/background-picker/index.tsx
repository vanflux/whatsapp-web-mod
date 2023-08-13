import { themerGradients } from "@page-features/themer/gradients";
import { useOutsideAlert } from "@page-hooks/use-outside-alert";
import React, { useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import ReactGPicker from "react-gcolor-picker";

export interface BackgroundPickerProps {
  onlySolid?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const BackgroundPicker = ({ onlySolid, value, onChange }: BackgroundPickerProps) => {
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
  }, [open, value]);

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
          <ReactGPicker
            value={value}
            onChange={onChange}
            solid
            gradient={!onlySolid}
            showAlpha
            showGradientAngle
            showGradientMode
            showGradientPosition
            showGradientResult
            showGradientStops
            showInputs
            debounce
            debounceMS={10}
            defaultColors={themerGradients.map((x) => x.value)}
            defaultColorsLimit={Infinity}
          />
        </div>
      )}
    </div>
  );
};
