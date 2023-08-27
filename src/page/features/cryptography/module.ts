import { FC } from "react";
import { CryptographyConfig } from "./config";

interface Props {
  config: CryptographyConfig;
  setConfig: (config: CryptographyConfig) => void;
}

export interface CryptographyModule {
  component: FC<Props>;
  name: string;
  canSend: (chatId: string) => boolean;
  encrypt: (chatId: string, message: string) => Promise<string | undefined>;
  decrypt: (chatId: string, encryptedMessage: string) => Promise<string | undefined>;
  apply: () => void;
  destroy: () => void;
}
