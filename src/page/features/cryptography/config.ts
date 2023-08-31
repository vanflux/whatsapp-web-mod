export const DEFAULT_CRYPTOGRAPHY_CONFIG: CryptographyConfig = {};

export interface CryptographyConfig {
  selectedModuleName?: string;
  pgp?: {
    privateKey?: string;
    publicKeys?: Record<string, string>;
  };
  autoDecrypt?: boolean;
  hideEncryptedBody?: boolean;
}
