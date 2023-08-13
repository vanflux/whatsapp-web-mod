import { DEFAULT_THEMER_CONFIG, ThemerConfig } from "./config";

export interface Theme {
  name: string;
  config: ThemerConfig;
}

export const serializeThemerTheme = (theme: Theme) => {
  return btoa(JSON.stringify(theme));
};

export const deserializeThemerTheme = (value: string) => {
  return JSON.parse(atob(value)) as Theme;
};

export const DEFAULT_THEMES: Theme[] = [
  {
    name: "Default",
    config: DEFAULT_THEMER_CONFIG,
  },
  {
    name: "Fire",
    config: {
      background: "linear-gradient(90deg, rgb(151, 145, 36) 0.00%,rgb(157, 37, 37) 100.00%)",
      blurContacts: false,
      roundedBorders: true,
      transparency: 0.27,
      uiColor: "45, 23, 9",
      outgoingMessageBackground: "#817c33",
      incomingMessageBackground: "#923b3b",
      systemMessageBackground: "#942424",
      messageColor: "#FFFFFFFF",
      secondaryColor: "#FFFFFFFF",
      quotedMessageColor: "#e6e6e6",
      doodlesOpacity: 0,
    },
  },
  {
    name: "Water",
    config: {
      background: "linear-gradient(90deg, rgb(36, 67, 151) 0.00%,rgb(37, 157, 156) 100.00%)",
      blurContacts: false,
      roundedBorders: true,
      transparency: 0.45,
      uiColor: "0, 0, 0",
      outgoingMessageBackground: "rgb(35, 98, 149)",
      incomingMessageBackground: "rgb(23, 138, 120)",
      systemMessageBackground: "rgb(32, 181, 72)",
      messageColor: "#FFFFFFFF",
      secondaryColor: "#FFFFFFFF",
      quotedMessageColor: "#e6e6e6",
      doodlesOpacity: 0,
    },
  },
  {
    name: "Rainbow",
    config: {
      background:
        "linear-gradient(45deg, rgb(255, 0, 0) 0.00%,rgb(217, 255, 0) 16.66%,rgb(4, 255, 0) 33.33%,rgb(0, 240, 255) 50.00%,rgb(10, 0, 255) 66.66%,rgb(242, 0, 255) 83.33%,rgb(255, 0, 0) 100.00%)",
      blurContacts: false,
      roundedBorders: true,
      transparency: 0.45,
      uiColor: "0, 0, 0",
      outgoingMessageBackground: "rgb(125, 85, 174)",
      incomingMessageBackground: "rgb(43, 159, 141)",
      systemMessageBackground: "rgb(199, 219, 82)",
      messageColor: "#FFFFFFFF",
      secondaryColor: "#FFFFFFFF",
      quotedMessageColor: "#e6e6e6",
      doodlesOpacity: 0,
    },
  },
];
