import { useEffect, useState } from "react";
import { ConfigsMod } from "./configs-toggle.mod";

export function useConfigsToggle() {
  const [open, setOpen] = useState(() => ConfigsMod.getOpen());

  useEffect(() => {
    ConfigsMod.events.on("change:open", setOpen);
    return () => {
      ConfigsMod.events.off("change:open", setOpen);
    };
  }, []);

  const toggle = () => ConfigsMod.toggle();

  return { open, toggle };
}
