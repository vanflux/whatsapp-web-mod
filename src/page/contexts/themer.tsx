import React, { createContext, PropsWithChildren, useContext } from "react";
import { useStateStorage } from "../hooks/use-state-storage";
import { DEFAULT_THEMER_CONFIG, ThemerConfig, ThemerMod } from "../mods/themer";

interface Props {
  config: ThemerConfig;
  setConfig: (config: ThemerConfig) => void;
}

const ThemerContext = createContext<Props>({
  config: DEFAULT_THEMER_CONFIG,
  setConfig: () => {},
});

export const ThemerContextProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useStateStorage<ThemerConfig>(
    "themer-config",
    DEFAULT_THEMER_CONFIG,
    (value) => ThemerMod.setConfig(value),
  );

  return (
    <ThemerContext.Provider value={{ config, setConfig }}>
      {children}
    </ThemerContext.Provider>
  );
};

export const useThemer = () => {
  return useContext(ThemerContext);
};
