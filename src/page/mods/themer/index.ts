import { themerGradients } from "./gradients";

export const DEFAULT_THEMER_CONFIG: ThemerConfig = {
  background: themerGradients.find(({ name }) => name === "Professional")!
    .value,
  blurContacts: false,
  roundedBorders: true,
  transparency: 0.5,
  uiColor: "0, 0, 0",
  outgoingMessageBackground: "#005C4BCC",
  incomingMessageBackground: "#202C33CC",
  systemMessageBackground: "#182229CC",
  messageColor: "#E9EDEF",
  quotedMessageColor: "hsla(0, 0%, 100%, 0.6)",
};

export interface ThemerConfig {
  background: string;
  blurContacts: boolean;
  roundedBorders: boolean;
  transparency: number;
  uiColor: string;
  outgoingMessageBackground: string;
  incomingMessageBackground: string;
  systemMessageBackground: string;
  messageColor: string;
  quotedMessageColor: string;
}

export class ThemerMod {
  private static config: ThemerConfig = DEFAULT_THEMER_CONFIG;
  private static timers: NodeJS.Timer[] = [];

  private static transparentRGBA(opacity: number) {
    const difference = (this.config.transparency - 0.5) * 2;
    const weightedDifference = difference < 0 ? difference * 2 : difference;
    const opacityMultiplier = 1 - weightedDifference;
    return `rgba(${this.config.uiColor}, ${
      opacity * opacityMultiplier * 100
    }%)`;
  }

  private static update() {
    const side = document.querySelector<HTMLDivElement>("#side");
    if (side) {
      side.style.background = this.transparentRGBA(0.27);
    }
    const chatList = document.querySelector<HTMLDivElement>(
      '[data-testid="chat-list"]',
    );
    if (chatList) {
      chatList.style.filter = this.config.blurContacts ? "blur(10px)" : "";
    }
    const appWrapperWeb =
      document.querySelector<HTMLDivElement>(".app-wrapper-web");
    if (appWrapperWeb) {
      // Disable startup loader
      appWrapperWeb.style.setProperty("--startup-background-rgb", "-");

      // Make status page transparent
      appWrapperWeb.style.setProperty(
        "--status-background",
        this.transparentRGBA(0.87),
      );

      // Make media viewer transparent
      appWrapperWeb.style.setProperty(
        "--media-viewer-background",
        this.transparentRGBA(0.8),
      );

      // Make drawer transparent
      appWrapperWeb.style.setProperty(
        "--drawer-background",
        this.transparentRGBA(0.8),
      );
      appWrapperWeb.style.setProperty(
        "--drawer-section-background",
        this.transparentRGBA(0.27),
      );
      appWrapperWeb.style.setProperty(
        "--drawer-background-deep",
        this.transparentRGBA(0.8),
      );

      // Make some panels transparent
      appWrapperWeb.style.setProperty(
        "--panel-background-lighter",
        this.transparentRGBA(0),
      );
      appWrapperWeb.style.setProperty(
        "--panel-background-deeper",
        this.transparentRGBA(0.5),
      );

      // Change unread marker color
      //appWrapperWeb.style.setProperty('--unread-marker-background', '#ffffff88');

      // Make three dots dropdown transparent
      appWrapperWeb.style.setProperty(
        "--dropdown-background",
        this.transparentRGBA(0.8),
      );
      appWrapperWeb.style.setProperty(
        "--dropdown-background-hover",
        this.transparentRGBA(0.27),
      );

      // Make message input transparent
      appWrapperWeb.style.setProperty(
        "--rich-text-panel-background",
        this.transparentRGBA(0.27),
      );
      appWrapperWeb.style.setProperty(
        "--compose-input-background",
        this.transparentRGBA(0.27),
      );
      appWrapperWeb.style.setProperty("--compose-input-border", "none");

      // Make messages and system messages transparent
      appWrapperWeb.style.setProperty(
        "--outgoing-background",
        this.config.outgoingMessageBackground,
      );
      appWrapperWeb.style.setProperty(
        "--outgoing-background-deeper",
        this.transparentRGBA(0.05),
      );
      appWrapperWeb.style.setProperty("--outgoing-background-rgb", "-");
      appWrapperWeb.style.setProperty(
        "--incoming-background",
        this.config.incomingMessageBackground,
      );
      appWrapperWeb.style.setProperty(
        "--incoming-background-deeper",
        this.transparentRGBA(0.05),
      );
      appWrapperWeb.style.setProperty("--incoming-background-rgb", "-");
      appWrapperWeb.style.setProperty(
        "--system-message-background",
        this.config.systemMessageBackground,
      );

      // Change message color
      appWrapperWeb.style.setProperty(
        "--message-primary",
        this.config.messageColor,
      );

      // Change quoted message color
      appWrapperWeb.style.setProperty(
        "--quoted-message-text",
        this.config.quotedMessageColor,
      );

      // Make left panel transparent
      appWrapperWeb.style.setProperty(
        "--background-default",
        this.transparentRGBA(0),
      );
      appWrapperWeb.style.setProperty(
        "--background-default-hover",
        this.transparentRGBA(0.27),
      );
      appWrapperWeb.style.setProperty(
        "--background-default-active",
        this.transparentRGBA(0.27),
      );

      // Make intro / first page of whatsapp web transparent
      appWrapperWeb.style.setProperty(
        "--intro-background",
        this.transparentRGBA(0),
      );

      // Make search input transparent
      appWrapperWeb.style.setProperty(
        "--search-input-background",
        this.transparentRGBA(0.27),
      );
      appWrapperWeb.style.setProperty(
        "--search-container-background",
        this.transparentRGBA(0),
      );
      appWrapperWeb.style.setProperty(
        "--search-input-container-background",
        this.transparentRGBA(0),
      );
      appWrapperWeb.style.setProperty(
        "--search-input-container-background-active",
        this.transparentRGBA(0),
      );

      // Make top panel transparent
      appWrapperWeb.style.setProperty(
        "--panel-header-background",
        this.transparentRGBA(0.13),
      );

      // Change background
      appWrapperWeb.style.background = this.config.background;

      const appWrapperWebDiv =
        appWrapperWeb.querySelector<HTMLDivElement>(":scope > div");
      if (appWrapperWebDiv) {
        appWrapperWebDiv.style.background = this.transparentRGBA(0);
        appWrapperWebDiv.style.borderRadius = this.config.roundedBorders
          ? "16px"
          : "0px";
      }
    }
  }

  public static setConfig(config: ThemerConfig) {
    this.config = config;
    this.update();
  }

  public static apply() {
    // A hacky stuff to prevent [data-testid=conversation-panel-wrapper] element backgroundColor change
    if (!window.vfDivSetAttribute) {
      window.vfDivSetAttribute = HTMLDivElement.prototype.setAttribute;
      HTMLDivElement.prototype.setAttribute.toString = () =>
        "function String() {\n    [native code]\n}";
      HTMLDivElement.prototype.setAttribute.toString.toString =
        HTMLDivElement.prototype.setAttribute.toString;
    }
    HTMLDivElement.prototype.setAttribute = function (...args: any) {
      if (
        args[0] === "data-testid" &&
        args[1] === "conversation-panel-wrapper"
      ) {
        this.style.background = "transparent";
      } else {
        return window.vfDivSetAttribute!.call(this, ...args);
      }
    };

    this.timers.push(setInterval(this.update.bind(this), 1000));
    this.timers.push(
      setInterval(() => {
        const appWrapperWeb = document.querySelector(".app-wrapper-web");
        if (appWrapperWeb) {
          const appWrapperWebSpanDivs = [
            ...appWrapperWeb.querySelectorAll<HTMLDivElement>(
              ":scope > span > div",
            ),
          ];
          for (const appWrapperWebSpanDiv of appWrapperWebSpanDivs) {
            const statusPanel =
              appWrapperWebSpanDiv.querySelector<HTMLDivElement>(
                '[data-testid^="status-"][data-testid$="-main-panel"]',
              );
            if (statusPanel) {
              statusPanel.style.backdropFilter = "blur(4px)";
              appWrapperWebSpanDiv.style.background =
                this.transparentRGBA(0.47);
            }
            const contactMenuDropdown =
              appWrapperWebSpanDiv.querySelector<HTMLDivElement>(
                '[data-testid="contact-menu-dropdown"]',
              );
            if (contactMenuDropdown) {
              appWrapperWebSpanDiv.style.backdropFilter = "blur(4px)";
              appWrapperWebSpanDiv.style.background =
                this.transparentRGBA(0.47);
            }
            const mediaViewerModal =
              appWrapperWebSpanDiv.querySelector<HTMLDivElement>(
                '[data-testid="media-viewer-modal"]',
              );
            if (mediaViewerModal) {
              mediaViewerModal.style.backdropFilter = "blur(4px)";
              appWrapperWebSpanDiv.style.background =
                this.transparentRGBA(0.47);
            }
          }
          const settingsDrawer = document.querySelector<HTMLDivElement>(
            '[data-testid="settings-drawer"]',
          );
          if (settingsDrawer) {
            settingsDrawer.style.background = this.transparentRGBA(0.8);
            settingsDrawer.style.backdropFilter = "blur(4px)";
          }
        }
        const main = document.querySelector<HTMLDivElement>("#main");
        if (main) {
          main.style.background = this.transparentRGBA(0);
        }
      }, 100),
    );
  }

  public static destroy() {
    HTMLDivElement.prototype.setAttribute = window.vfDivSetAttribute!;
    this.timers.forEach((timer) => clearInterval(timer));
  }
}
