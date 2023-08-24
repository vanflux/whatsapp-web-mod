import { toast } from "react-toastify";
import { Theme } from "./theme";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";

const THEMES_STORAGE_KEY = "themer-themes";
const EDITING_THEME_NAME_STORAGE_KEY = "themer-editing-theme-name";

export class ThemerThemes {
  public static events = new EventEmitter();
  private static themes: Theme[];
  private static editingThemeName: string | undefined;

  public static setup() {
    this.themes = StorageService.getItem(THEMES_STORAGE_KEY) ?? [];
    this.editingThemeName = StorageService.getItem(EDITING_THEME_NAME_STORAGE_KEY);
  }

  public static getThemes() {
    return this.themes;
  }

  public static setThemes(themes: Theme[]) {
    this.themes = themes;
    StorageService.setItem(THEMES_STORAGE_KEY, themes);
    this.events.emit("change:themes", themes);
  }

  public static getEditingThemeName() {
    return this.editingThemeName;
  }

  public static setEditingThemeName(editingThemeName?: string) {
    this.editingThemeName = editingThemeName;
    StorageService.setItem(EDITING_THEME_NAME_STORAGE_KEY, editingThemeName);
    this.events.emit("change:editingThemeName", editingThemeName);
  }

  public static upsertTheme(theme: Theme) {
    const existingTheme = this.themes.find((t) => t.name === theme.name);
    if (existingTheme) {
      existingTheme.config = theme.config;
      this.setThemes([...this.themes]);
      toast.success(`Theme "${theme.name}" updated!`);
    } else {
      this.setThemes([...this.themes, theme]);
      toast.success(`Theme "${theme.name}" created!`);
    }
  }

  public static removeTheme(name: string) {
    this.setThemes(this.themes.filter((theme) => theme.name !== name));
    toast.success(`Theme "${name}" deleted!`);
  }
}
