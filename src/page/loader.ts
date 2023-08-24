export interface Mod {
  displayName: string;
  apply: () => Promise<void> | void;
  destroy: () => Promise<void> | void;
}

export class ModLoader {
  private static loaded = false;
  private static loadedMods: Mod[];

  public static async apply(mods: Mod[]) {
    if (this.loaded) return console.log("Mods already loaded!");
    this.loaded = true;
    this.loadedMods = [];
    for (const mod of mods) {
      try {
        await mod.apply();
        this.loadedMods.unshift(mod);
        console.log(`Mod "${mod.displayName}" loaded successfully!`);
      } catch (exc) {
        console.log(`Mod "${mod.displayName}" load failed!`, exc);
      }
    }
  }

  public static async destroy() {
    if (!this.loaded) return console.log("Mods are not loaded!");
    this.loaded = false;
    for (const mod of this.loadedMods) {
      try {
        await mod.destroy();
        console.log(`Mod "${mod.displayName}" unloaded successfully!`);
      } catch (exc) {
        console.log(`Mod "${mod.displayName}" unload failed!`, exc);
      }
    }
  }
}
