import { useEffect, useState } from "react";
import { CryptographyConfig } from "../config";
import { CryptographyMod } from "../cryptography.mod";

export function useCryptographyConfig() {
  const [config, _setConfig] = useState<CryptographyConfig>(() => CryptographyMod.getConfig());

  useEffect(() => {
    CryptographyMod.events.on("change:config", _setConfig);
    return () => {
      CryptographyMod.events.off("change:config", _setConfig);
    };
  }, []);

  const setConfig = (config: CryptographyConfig) => CryptographyMod.setConfig(config);

  return { config, setConfig };
}
