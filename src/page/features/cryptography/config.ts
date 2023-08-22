export const DEFAULT_CRYPTOGRAPHY_CONFIG: CryptographyConfig = {};

export interface CryptographyConfig {
  selectedModuleName?: string;
  privateKey?: string;
  publicKeys?: Record<string, string>;
  name?: string;
  email?: string;
}
