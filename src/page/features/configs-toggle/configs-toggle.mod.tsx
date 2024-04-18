import React from "react";
import { createRoot, Root } from "react-dom/client";
import { ConfigsToggleButton } from "./components/configs-toggle-button";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";

const CONFIGS_TOGGLE_STORAGE_KEY = "configs-open";

export class ConfigsMod {
  public static displayName = "ConfigsToggle";
  public static events = new EventEmitter();
  private static root?: Root;
  private static timer?: NodeJS.Timer;
  private static open: boolean;

  public static getOpen() {
    return this.open;
  }

  public static toggle() {
    this.open = !this.open;
    StorageService.setItem(CONFIGS_TOGGLE_STORAGE_KEY, this.open);
    this.events.emit("change:open", this.open);
  }

  public static apply() {
    this.open = StorageService.getItem<boolean>(CONFIGS_TOGGLE_STORAGE_KEY) ?? true;
    const container = document.createElement("div");
    document.body.appendChild(container);
    this.root = createRoot(container);
    this.root.render(<ConfigsToggleButton />);
    this.timer = setInterval(() => {
      const icon = document.querySelector('header [data-icon="community-outline"]');
      const menuBarCommunity = icon?.parentElement?.parentElement;
      if (menuBarCommunity) {
        const parent = menuBarCommunity.parentElement;
        if (!parent?.contains(container)) {
          if (parent) {
            parent.insertBefore(container, menuBarCommunity);
          }
        }
      }
    }, 1000);
  }

  public static destroy() {
    clearInterval(this.timer);
    this.root?.unmount();
  }
}
