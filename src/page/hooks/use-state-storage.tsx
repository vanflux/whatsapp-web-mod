import { useState } from "react";

export function useStateStorage<T>(key: string, initialValue: T, onChange?: (value: T) => void): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    let newValue: T;
    try {
      newValue = JSON.parse(localStorage.getItem(`vf:${key}`)!) as T;
      if (newValue == null) newValue = initialValue;
    } catch {
      newValue = initialValue;
    }
    onChange?.(newValue);
    return newValue;
  });

  return [
    value,
    (value: T) => {
      onChange?.(value);
      localStorage.setItem(`vf:${key}`, JSON.stringify(value));
      setValue(value);
    },
  ];
};
