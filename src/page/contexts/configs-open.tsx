import { useStateStorage } from "@page-hooks/use-state-storage";
import React, { createContext, PropsWithChildren, useContext } from "react";

interface Props {
  open: boolean;
  toggle: () => void;
}

const ConfigsOpenContext = createContext<Props>({
  open: false,
  toggle: () => {},
});

let globalToggle: () => void;

export const ConfigsOpenContextProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useStateStorage("configs-open", true);

  globalToggle = () => setOpen(!open);
  return <ConfigsOpenContext.Provider value={{ open, toggle: globalToggle }}>{children}</ConfigsOpenContext.Provider>;
};

export const useConfigsOpen = () => {
  return useContext(ConfigsOpenContext);
};

export const toggleConfigs = () => globalToggle();
