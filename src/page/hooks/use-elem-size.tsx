import { RefObject, useLayoutEffect, useState } from "react";

export function useElemSize<T extends HTMLElement>(ref: RefObject<T>) {
  const [size, setSize] = useState([0, 0] as [number, number]);

  useLayoutEffect(() => {
    setSize([ref.current?.offsetWidth ?? 0, ref.current?.offsetHeight ?? 0]);
  }, [ref.current]);

  return size;
}
