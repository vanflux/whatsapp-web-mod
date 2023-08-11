import { App } from "@page-components/app";
import { ConfigsMod } from "@page-features/configs-toggle/configs-toggle.mod";
import { ThemerMod } from "@page-features/themer/themer.mod";
import React from "react";
import { createRoot } from "react-dom/client";

export async function pageLoadedEntry() {
  window.destroyVFMod?.();
  ThemerMod.apply();
  ConfigsMod.apply();
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
  window.destroyVFMod = () => {
    root.unmount();
    ConfigsMod.destroy();
    ThemerMod.destroy();
  };
}
