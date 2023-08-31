import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState(() => [window.innerWidth, window.innerHeight] as const);

  useLayoutEffect(() => {
    const handleSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  return size;
}
