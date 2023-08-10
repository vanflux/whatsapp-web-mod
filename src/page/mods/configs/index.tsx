import React from "react";
import { createRoot, Root } from "react-dom/client";
import { ConfigsButton } from "../../components/configs-button";

export class ConfigsMod {
  private static root?: Root;
  private static timer?: NodeJS.Timer;

  public static apply() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    this.root = createRoot(container);
    this.root.render(<ConfigsButton />);
    this.timer = setInterval(() => {
      const menuBarCommunityTab = document.querySelector(
        '[data-testid="menu-bar-community-tab"]',
      );
      if (menuBarCommunityTab) {
        const parent = menuBarCommunityTab.parentElement;
        if (!parent?.contains(container)) {
          if (parent) {
            parent.insertBefore(container, menuBarCommunityTab);
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
