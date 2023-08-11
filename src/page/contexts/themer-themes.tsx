import { Theme } from "@page-features/themer/theme";
import { useStateStorage } from "@page-hooks/use-state-storage";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { toast } from "react-toastify";

interface Props {
  themes: Theme[];
  editingThemeName?: string;
  upsertTheme: (theme: Theme) => void;
  removeTheme: (name: string) => void;
  setEditingThemeName: (name?: string) => void;
}

const ThemerThemesContext = createContext<Props>({
  themes: [],
  upsertTheme: () => {},
  removeTheme: () => {},
  setEditingThemeName: () => {},
});

export const ThemerThemesContextProvider = ({ children }: PropsWithChildren) => {
  const [editingThemeName, setEditingThemeName] = useStateStorage<string | undefined>("themer-editing-theme-name", "");
  const [themes, setThemes] = useStateStorage<Theme[]>("themer-themes", []);

  const upsertTheme = (theme: Theme) => {
    const existingTheme = themes.find((t) => t.name === theme.name);
    if (existingTheme) {
      existingTheme.config = theme.config;
      setThemes([...themes]);
      toast.success(`Theme "${theme.name}" updated!`);
    } else {
      setThemes([...themes, theme]);
      toast.success(`Theme "${theme.name}" created!`);
    }
  };

  const removeTheme = (name: string) => {
    setThemes(themes.filter((theme) => theme.name !== name));
    toast.success(`Theme "${name}" deleted!`);
  };

  return (
    <ThemerThemesContext.Provider value={{ themes, editingThemeName, upsertTheme, removeTheme, setEditingThemeName }}>
      {children}
    </ThemerThemesContext.Provider>
  );
};

export const useThemerThemes = () => {
  return useContext(ThemerThemesContext);
};
