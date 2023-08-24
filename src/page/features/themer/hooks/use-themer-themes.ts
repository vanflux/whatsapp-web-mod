import { useEffect, useState } from "react";
import { Theme } from "../theme";
import { ThemerThemes } from "../themes";

export function useThemerThemes() {
  const [themes, _setThemes] = useState(() => ThemerThemes.getThemes());
  const [editingThemeName, _setEditingThemeName] = useState(() => ThemerThemes.getEditingThemeName());

  useEffect(() => {
    ThemerThemes.events.on("change:themes", _setThemes);
    ThemerThemes.events.on("change:editingThemeName", _setEditingThemeName);
    return () => {
      ThemerThemes.events.off("change:themes", _setThemes);
      ThemerThemes.events.off("change:editingThemeName", _setEditingThemeName);
    };
  }, []);

  const upsertTheme = (theme: Theme) => ThemerThemes.upsertTheme(theme);
  const removeTheme = (name: string) => ThemerThemes.removeTheme(name);
  const setEditingThemeName = (editingThemeName?: string) => ThemerThemes.setEditingThemeName(editingThemeName);

  return { themes, editingThemeName, upsertTheme, removeTheme, setEditingThemeName };
}
