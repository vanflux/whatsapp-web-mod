import { RefObject, useEffect } from "react";

export function useOutsideAlert<T extends HTMLElement | undefined>(
  ref: RefObject<T>,
  onOutsideClick: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
