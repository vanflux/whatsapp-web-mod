import { useEffect, useState } from "react";
import { ThemerConfig } from "../config";
import { ThemerMod } from "../themer.mod";

export function useThemerConfig() {
  const [config, _setConfig] = useState(() => ThemerMod.getConfig());

  useEffect(() => {
    ThemerMod.events.on("change:config", _setConfig);
    return () => {
      ThemerMod.events.off("change:config", _setConfig);
    };
  }, []);

  const setConfig = (config: ThemerConfig) => ThemerMod.setConfig(config);

  return { config, setConfig };
}
