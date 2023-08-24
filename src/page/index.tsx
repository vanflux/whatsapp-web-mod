import { App } from "@page-components/app";
import { ConfigsMod } from "@page-features/configs-toggle/configs-toggle.mod";
import { CryptographyMod } from "@page-features/cryptography/cryptography.mod";
import { ThemerMod } from "@page-features/themer/themer.mod";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import React from "react";
import { createRoot } from "react-dom/client";
import { ModLoader } from "./loader";

export async function pageLoadedEntry() {
  await window.destroyVFMod?.();
  await ModLoader.apply([WapiMod, ThemerMod, CryptographyMod, ConfigsMod]);
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
  window.destroyVFMod = async () => {
    root.unmount();
    await ModLoader.destroy();
  };
}
