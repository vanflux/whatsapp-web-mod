import { App } from "@page-components/app";
import { ConfigsMod } from "@page-features/configs-toggle/configs-toggle.mod";
import { CryptographyMod } from "@page-features/cryptography/cryptography.mod";
import { ThemerMod } from "@page-features/themer/themer.mod";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import React from "react";
import { createRoot } from "react-dom/client";

export async function pageLoadedEntry() {
  window.destroyVFMod?.();
  WapiMod.apply();
  ThemerMod.apply();
  CryptographyMod.apply();
  ConfigsMod.apply();
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
  window.destroyVFMod = () => {
    root.unmount();
    ConfigsMod.destroy();
    CryptographyMod.destroy();
    ThemerMod.destroy();
    WapiMod.destroy();
  };
}
