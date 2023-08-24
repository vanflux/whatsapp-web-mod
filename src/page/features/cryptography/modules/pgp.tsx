import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { Icon } from "@page-components/basic/icon";
import { TextInput } from "@page-components/basic/text-input";
import React from "react";
import { CryptographyModule } from "../module";
import { CryptographyConfig } from "../config";
import { createMessage, decrypt, encrypt, generateKey, readKey, readMessage, readPrivateKey } from "openpgp";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import { CryptographyMod } from "../cryptography.mod";

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

const encryptMessage = async (config: CryptographyConfig, chatId: string, message: string) => {
  if (!config.privateKey) return;
  const publicKeyStr = config.publicKeys?.[chatId];
  if (!publicKeyStr) return;
  const publicKey = await readKey({ armoredKey: publicKeyStr });
  const encrypted = await encrypt({ message: await createMessage({ text: message }), encryptionKeys: publicKey });
  return String(encrypted);
};

const decryptMessage = async (config: CryptographyConfig, encryptedMessage: string) => {
  if (!config.privateKey) return;
  try {
    const privateKey = await readPrivateKey({ armoredKey: config.privateKey });
    const decrypted = await decrypt({ message: await readMessage({ armoredMessage: encryptedMessage }), decryptionKeys: privateKey });
    return String(decrypted.data);
  } catch (exc) {
    console.log("Failed to decrypt", encryptedMessage);
  }
};

export const PGPCryptographyModule: CryptographyModule = {
  name: "PGPBeta",
  apply() {
    WapiMod.onAnyMessage(async (messageModel) => {
      if (!messageModel) return;
      const received = messageModel.body;
      if (!received) return;
      const senderId = messageModel.senderObj?.id?._serialized;
      if (!senderId) return;
      const matches = received.match(/\[\-PublicKey\-start\-\]([^\[]+)\[/);
      if (matches?.length) {
        const [_, publicKeyString] = matches;
        const config = CryptographyMod.getConfig();
        CryptographyMod.setConfig({
          ...config,
          publicKeys: {
            ...config.publicKeys,
            [senderId]: publicKeyString,
          },
        });
      }
    });
  },
  destroy() {},
  async encrypt(config, chatId, message) {
    return encryptMessage(config, chatId, message);
  },
  async decrypt(config, chatId, encryptedMessage) {
    return decryptMessage(config, encryptedMessage);
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
              <Icon type="reload" size={16} />
              <div style={{ whiteSpace: "nowrap" }}>Random Private Key</div>
            </Flex>
          </Button>
        </Flex>
        <Button onClick={handleSendPublicKey}>
          <Flex gap={8} align="center">
            <Icon type="send" size={16} />
            <div style={{ whiteSpace: "nowrap" }}>Send Public Key</div>
          </Flex>
        </Button>
      </>
    );
  },
};
