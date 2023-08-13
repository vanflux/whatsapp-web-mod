import { themerGradients } from "./gradients";

export const DEFAULT_THEMER_CONFIG: ThemerConfig = {
  background: themerGradients.find(({ name }) => name === "Professional")!.value,
  blurContacts: false,
  roundedBorders: true,
  transparency: 0.5,
  uiColor: "0, 0, 0",
  outgoingMessageBackground: "#984DD4FF",
  incomingMessageBackground: "#32659EFF",
  systemMessageBackground: "#1F407F",
  messageColor: "#E9EDEFFF",
  secondaryColor: "#FFFFFFFF",
  quotedMessageColor: "#FFFFFF99",
  doodlesOpacity: 0,
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
  secondaryColor: string;
  quotedMessageColor: string;
  doodlesOpacity: number;
}
