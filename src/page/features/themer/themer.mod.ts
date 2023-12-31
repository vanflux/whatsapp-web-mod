import { hookFn } from "../../utils/hook-fn";
import { DEFAULT_THEMER_CONFIG, ThemerConfig } from "./config";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";
import "./styles.css";
import { ThemerThemes } from "./themes";

const CONFIG_STORAGE_KEY = "themer-config";

export class ThemerMod {
  public static displayName = "Themer";
  public static events = new EventEmitter();
  private static config: ThemerConfig = DEFAULT_THEMER_CONFIG;
  private static timers: NodeJS.Timer[] = [];
  private static destroySetAttributeHook: () => void;

  private static transparentRGBA(opacity: number) {
    const difference = (this.config.transparency - 0.5) * 2;
    const weightedDifference = difference < 0 ? difference * 2 : difference;
    const opacityMultiplier = 1 - weightedDifference;
    return `rgba(${this.config.uiColor}, ${opacity * opacityMultiplier * 100}%)`;
  }

  private static update() {
    // Force darkmode
    if (!document.body.classList.contains("dark")) document.body.classList.add("dark");
    if (document.body.classList.contains("light")) document.body.classList.remove("light");
    const side = document.querySelector<HTMLDivElement>("#side");
    if (side) {
      side.style.background = this.transparentRGBA(0.27);
    }
    const chatList = document.querySelector<HTMLDivElement>('[data-testid="chat-list"]');
    if (chatList) {
      chatList.style.filter = this.config.blurContacts ? "blur(10px)" : "";
    }
    const appWrapperWeb = document.querySelector<HTMLDivElement>(".app-wrapper-web");
    if (appWrapperWeb) {
      // Change doodles opacity
      appWrapperWeb.style.setProperty("--doodles-opacity", `${this.config.doodlesOpacity}`);

      // Blur profile photo
      appWrapperWeb.style.setProperty("--profile-photo-filter", `${this.config.blurProfilePhoto ? "sepia(50%) blur(15px)" : ""}`);

      // Disable startup loader
      appWrapperWeb.style.setProperty("--startup-background-rgb", "-");

      // Make status page transparent
      appWrapperWeb.style.setProperty("--status-background", this.transparentRGBA(0.87));

      // Make media viewer transparent and blur
      appWrapperWeb.style.setProperty("--media-viewer-background", this.transparentRGBA(0.8));
      appWrapperWeb.style.setProperty("--media-viewer-backdrop-filter", "blur(4px)");

      // Make drawer transparent
      appWrapperWeb.style.setProperty("--drawer-background", this.transparentRGBA(0.8));
      appWrapperWeb.style.setProperty("--drawer-section-background", this.transparentRGBA(0.27));
      appWrapperWeb.style.setProperty("--drawer-background-deep", this.transparentRGBA(0.8));

      // Make some panels transparent
      appWrapperWeb.style.setProperty("--panel-background-lighter", this.transparentRGBA(0));
      appWrapperWeb.style.setProperty("--panel-background-deeper", this.transparentRGBA(0.5));

      // Change unread marker color
      //appWrapperWeb.style.setProperty('--unread-marker-background', '#ffffff88');

      // Make three dots dropdown transparent
      appWrapperWeb.style.setProperty("--dropdown-background", this.transparentRGBA(0.8));
      appWrapperWeb.style.setProperty("--dropdown-background-hover", this.transparentRGBA(0.27));

      // Make message input transparent
      appWrapperWeb.style.setProperty("--rich-text-panel-background", this.transparentRGBA(0.27));
      appWrapperWeb.style.setProperty("--compose-input-background", this.transparentRGBA(0.27));
      appWrapperWeb.style.setProperty("--compose-input-border", "none");

      // Make messages and system messages transparent
      appWrapperWeb.style.setProperty("--outgoing-background", this.config.outgoingMessageBackground);
      appWrapperWeb.style.setProperty("--outgoing-background-deeper", this.transparentRGBA(0.05));
      appWrapperWeb.style.setProperty("--outgoing-background-rgb", "-");
      appWrapperWeb.style.setProperty("--incoming-background", this.config.incomingMessageBackground);
      appWrapperWeb.style.setProperty("--incoming-background-deeper", this.transparentRGBA(0.05));
      appWrapperWeb.style.setProperty("--incoming-background-rgb", "-");
      appWrapperWeb.style.setProperty("--system-message-background", this.config.systemMessageBackground);

      // Change message color
      appWrapperWeb.style.setProperty("--message-primary", this.config.messageColor);
      appWrapperWeb.style.setProperty("--bubble-meta", this.config.messageColor);

      // Change secondary color
      appWrapperWeb.style.setProperty("--secondary", this.config.secondaryColor);

      // Change quoted message color
      appWrapperWeb.style.setProperty("--quoted-message-text", this.config.quotedMessageColor);

      // Make left panel transparent
      appWrapperWeb.style.setProperty("--background-default", this.transparentRGBA(0));
      appWrapperWeb.style.setProperty("--background-default-hover", this.transparentRGBA(0.27));
      appWrapperWeb.style.setProperty("--background-default-active", this.transparentRGBA(0.27));

      // Make intro / first page of whatsapp web transparent
      appWrapperWeb.style.setProperty("--intro-background", this.transparentRGBA(0));

      // Make search input transparent
      appWrapperWeb.style.setProperty("--search-input-background", this.transparentRGBA(0.27));
      appWrapperWeb.style.setProperty("--search-container-background", this.transparentRGBA(0));
      appWrapperWeb.style.setProperty("--search-input-container-background", this.transparentRGBA(0));
      appWrapperWeb.style.setProperty("--search-input-container-background-active", this.transparentRGBA(0));

      // Make top panel transparent
      appWrapperWeb.style.setProperty("--panel-header-background", this.transparentRGBA(0.13));

      // Make green top panel transparent
      appWrapperWeb.style.setProperty("--app-background-stripe", this.transparentRGBA(0));

      // Define settings drawer background
      appWrapperWeb.style.setProperty("--settings-drawer-background", this.transparentRGBA(0.8));

      // Change background
      appWrapperWeb.style.background = this.config.background;

      const appWrapperWebDiv = appWrapperWeb.querySelector<HTMLDivElement>(":scope > div");
      if (appWrapperWebDiv) {
        appWrapperWebDiv.style.background = this.transparentRGBA(0);
        appWrapperWebDiv.style.borderRadius = this.config.roundedBorders ? "16px" : "0px";
      }
      const main = document.querySelector<HTMLDivElement>("#main");
      if (main) {
        main.style.background = this.transparentRGBA(0);
      }
    }
  }

  public static getConfig() {
    return this.config;
  }

  public static setConfig(config: ThemerConfig) {
    this.config = config;
    this.update();
    StorageService.setItem(CONFIG_STORAGE_KEY, config);
    this.events.emit("change:config", config);
  }

  public static apply() {
    this.config = StorageService.getItem<ThemerConfig>(CONFIG_STORAGE_KEY) ?? DEFAULT_THEMER_CONFIG;
    ThemerThemes.setup();
    this.destroySetAttributeHook = hookFn(HTMLDivElement.prototype, "setAttribute", function (this: HTMLElement, key, value) {
      if (key === "role" && value === "application") {
        if (this.querySelector("ul > div > div > li")) {
          this.style.backdropFilter = "blur(4px)";
        }
      }
    });

    this.timers.push(setInterval(this.update.bind(this), 1000));
  }

  public static destroy() {
    this.destroySetAttributeHook();
    this.timers.forEach((timer) => clearInterval(timer));
  }
}
