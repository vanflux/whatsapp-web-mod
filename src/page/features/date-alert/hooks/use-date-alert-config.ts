import { useEffect, useState } from "react";
import { DateAlertConfig } from "../config";
import { DateAlertMod } from "../date-alert.mod";

export function useDateAlertConfig() {
  const [config, _setConfig] = useState<DateAlertConfig>(() => DateAlertMod.getConfig());

  useEffect(() => {
    DateAlertMod.events.on("change:config", _setConfig);
    return () => {
      DateAlertMod.events.off("change:config", _setConfig);
    };
  }, []);

  const setConfig = (config: DateAlertConfig) => DateAlertMod.setConfig(config);

  return { config, setConfig };
}
