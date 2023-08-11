import { DEFAULT_THEMER_CONFIG, ThemerConfig } from "@page-features/themer/config";
import { ThemerMod } from "@page-features/themer/themer.mod";
import { useStateStorage } from "@page-hooks/use-state-storage";
import React, { createContext, PropsWithChildren, useContext } from "react";

interface Props {
  config: ThemerConfig;
  setConfig: (config: ThemerConfig) => void;
}

const ThemerConfigContext = createContext<Props>({
  config: DEFAULT_THEMER_CONFIG,
  setConfig: () => {},
});

export const ThemerConfigContextProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useStateStorage<ThemerConfig>("themer-config", DEFAULT_THEMER_CONFIG, (value) => ThemerMod.setConfig(value));

  return <ThemerConfigContext.Provider value={{ config, setConfig }}>{children}</ThemerConfigContext.Provider>;
};

export const useThemerConfig = () => {
  return useContext(ThemerConfigContext);
};
