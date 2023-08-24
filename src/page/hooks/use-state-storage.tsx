import { useEffect, useState } from "react";
import { StorageService } from "../services/storage.service";

export function useStateStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(() => {
    let newValue: T;
    try {
      const item = StorageService.getItem<T>(key);
      newValue = item == null ? initialValue : item;
    } catch {
      newValue = initialValue;
    }
    return newValue;
  });

  useEffect(() => {
    StorageService.setItem(key, value);
  }, [value]);

  return [value, setValue];
}
