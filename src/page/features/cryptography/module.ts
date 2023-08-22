import { FC } from "react";
import { CryptographyConfig } from "./config";

interface Props {
  config: CryptographyConfig;
  setConfig: (config: CryptographyConfig) => void;
}

export interface CryptographyModule {
  component: FC<Props>;
  name: string;
  encrypt: (config: CryptographyConfig, message: string) => Promise<string | undefined>;
  decrypt: (config: CryptographyConfig, encryptedMessage: string) => Promise<string | undefined>;
  apply: () => void;
  destroy: () => void;
}
