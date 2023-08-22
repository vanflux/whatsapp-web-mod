import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { Icon } from "@page-components/basic/icon";
import { TextInput } from "@page-components/basic/text-input";
import React from "react";
import { CryptographyModule } from "../module";
import { CryptographyConfig } from "../config";
import { createMessage, encrypt, generateKey, readPrivateKey } from "openpgp";
import { WapiMod } from "@page-features/wapi/wapi.mod";

const getRandomPrivateKey = async (config: CryptographyConfig) => {
  if (!config.name) return;
  if (!config.email) return;
  const { privateKey } = await generateKey({ curve: "curve25519", userIDs: [{ name: config.name, email: config.email }], format: "object" });
  return privateKey.armor();
};

const getRandomPublicKey = async (config: CryptographyConfig) => {
  if (!config.privateKey) return;
  const privateKey = await readPrivateKey({ armoredKey: config.privateKey });
  return privateKey.toPublic().armor();
};

const encryptMessage = async (config: CryptographyConfig, message: string) => {
  if (!config.privateKey) return;
  const privateKey = await readPrivateKey({ armoredKey: config.privateKey });
  const encrypted = await encrypt({ message: await createMessage({ text: message }), encryptionKeys: privateKey });
  return String(encrypted);
};

const decryptMessage = async (config: CryptographyConfig, chatId: string, encryptedMessage: string) => {
  if (!config.privateKey) return;
  // const publicKeyStr = config.publicKeys
  // const publicKey = await readPrivateKey({ armoredKey: config.privateKey });
  // const encrypted = await encrypt({ message: await createMessage({ text: encryptedMessage }), encryptionKeys: privateKey });
  // return String(encrypted);
};

export const PGPCryptographyModule: CryptographyModule = {
  name: "PGP",
  apply() {},
  destroy() {},
  async encrypt(config: CryptographyConfig, message: string) {
    return encryptMessage(config, message);
  },
  async decrypt(config, encryptedMessage) {
    return undefined;
  },
  component: ({ config, setConfig }) => {
    const handleRandomPrivateKey = async () => {
      const privateKey = await getRandomPrivateKey(config);
      setConfig({ ...config, privateKey });
    };

    const handleSendPublicKey = async () => {
      const publicKey = await getRandomPublicKey(config);
      const activeChatId = WapiMod.getActiveChatId();
      if (!activeChatId) return;
      const message = `[-PublicKey-start-]${publicKey}[-PublicKey-end-]`;
      WapiMod.sendTextMessage(activeChatId, message);
    };

    return (
      <>
        <TextInput fullWidth value={config.name} onChange={(name) => setConfig({ ...config, name })} placeholder="Name" />
        <TextInput fullWidth value={config.email} onChange={(email) => setConfig({ ...config, email })} placeholder="Email" />
        <Flex gap={8}>
          <TextInput fullWidth value={config.privateKey} onChange={(privateKey) => setConfig({ privateKey })} placeholder="Private key" />
          <Button onClick={handleRandomPrivateKey}>
            <Flex gap={8} align="center">
              <Icon type="save" size={16} />
              <div style={{ whiteSpace: "nowrap" }}>Random Private Key</div>
            </Flex>
          </Button>
        </Flex>
        <Button onClick={handleSendPublicKey}>
          <Flex gap={8} align="center">
            <Icon type="save" size={16} />
            <div style={{ whiteSpace: "nowrap" }}>Send Public Key</div>
          </Flex>
        </Button>
      </>
    );
  },
};
