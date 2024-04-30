import { useEffect, useState } from "react";
import { AutomationMod } from "../automation.mod";
import { AutomationConfig } from "../config";

export function useAutomationConfig() {
  const [config, _setConfig] = useState<AutomationConfig>(() => AutomationMod.getConfig());

  useEffect(() => {
    AutomationMod.events.on("change:config", _setConfig);
    return () => {
      AutomationMod.events.off("change:config", _setConfig);
    };
  }, []);

  const setConfig = (config: AutomationConfig) => AutomationMod.setConfig(config);

  return { config, setConfig };
}
