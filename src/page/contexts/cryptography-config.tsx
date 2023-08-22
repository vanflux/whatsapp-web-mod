import { CryptographyConfig, DEFAULT_CRYPTOGRAPHY_CONFIG } from "@page-features/cryptography/config";
import { CryptographyMod } from "@page-features/cryptography/cryptography.mod";
import { useStateStorage } from "@page-hooks/use-state-storage";
import React, { createContext, PropsWithChildren, useContext } from "react";

interface Props {
  config: CryptographyConfig;
  setConfig: (config: CryptographyConfig) => void;
}

const CryptographyConfigContext = createContext<Props>({
  config: DEFAULT_CRYPTOGRAPHY_CONFIG,
  setConfig: () => {},
});

export const CryptographyConfigContextProvider = ({ children }: PropsWithChildren) => {
  const [config, setConfig] = useStateStorage<CryptographyConfig>("cryptography-config", DEFAULT_CRYPTOGRAPHY_CONFIG, (config) =>
    CryptographyMod.setConfig(config),
  );

  return <CryptographyConfigContext.Provider value={{ config, setConfig }}>{children}</CryptographyConfigContext.Provider>;
};

export const useCryptographyConfig = () => {
  return useContext(CryptographyConfigContext);
};
