import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';
import { ConfigsMod } from './mods/configs';
import { ThemerMod } from './mods/themer';

export async function pageLoadedEntry() {
  window.destroyVFMod?.();
  ThemerMod.apply();
  ConfigsMod.apply();
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
  window.destroyVFMod = () => {
    root.unmount();
    ConfigsMod.destroy();
    ThemerMod.destroy();
  };
}
