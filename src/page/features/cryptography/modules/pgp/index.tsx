import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { Icon } from "@page-components/basic/icon";
import { TextInput } from "@page-components/basic/text-input";
import React, { useState } from "react";
import { createMessage, decrypt, encrypt, generateKey, readKey, readMessage, readPrivateKey } from "openpgp";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import { CryptographyModule } from "@page-features/cryptography/module";
import { CryptographyMod } from "@page-features/cryptography/cryptography.mod";
import { PGPRandomPrivateKeyModal } from "./components/random-private-key-modal";

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
      if (!matches?.length) return;
      const [_, publicKeyString] = matches;
      const config = CryptographyMod.getConfig();
      CryptographyMod.setConfig({
        ...config,
        pgp: {
          ...config.pgp,
          publicKeys: {
            ...config.pgp?.publicKeys,
            [senderId]: publicKeyString,
          },
        },
      });
    });
  },
  destroy() {},
  canSend(chatId: string) {
    const config = CryptographyMod.getConfig();
    if (!config.pgp) return false;
    if (!config.pgp.privateKey) return false;
    if (!config.pgp.publicKeys?.[chatId]) return false;
    return true;
  },
  async encrypt(chatId, message) {
    const config = CryptographyMod.getConfig();
    if (!config.pgp?.privateKey) return;
    const publicKeyStr = config.pgp.publicKeys?.[chatId];
    if (!publicKeyStr) return;
    const publicKey = await readKey({ armoredKey: publicKeyStr });
    const encrypted = await encrypt({ message: await createMessage({ text: message }), encryptionKeys: publicKey });
    return String(encrypted);
  },
  async decrypt(_, encryptedMessage) {
    const config = CryptographyMod.getConfig();
    if (!config.pgp?.privateKey) return;
    try {
      const privateKey = await readPrivateKey({ armoredKey: config.pgp.privateKey });
      const decrypted = await decrypt({ message: await readMessage({ armoredMessage: encryptedMessage }), decryptionKeys: privateKey });
      return String(decrypted.data);
    } catch (exc) {
      console.log("Failed to decrypt", encryptedMessage);
    }
  },
  component: ({ config, setConfig }) => {
    const [randomPrivateKeyModalOpen, setRandomPrivateKeyModalOpen] = useState(false);
    const canSendPublicKey = !!config.pgp?.privateKey;

    const handleRandomPrivateKey = async (confirmed: boolean) => {
      if (config.pgp?.privateKey && !confirmed) {
        setRandomPrivateKeyModalOpen(true);
      } else {
        const { privateKey: privateKeyModel } = await generateKey({
          curve: "curve25519",
          userIDs: [],
          format: "object",
        });
        const privateKey = privateKeyModel.armor();
        setConfig({ ...config, pgp: { ...config.pgp, privateKey } });
      }
    };

    const handleSendPublicKey = async () => {
      if (!config.pgp?.privateKey) return;
      const privateKey = await readPrivateKey({ armoredKey: config.pgp.privateKey });
      const publicKey = privateKey.toPublic().armor();
      const activeChatId = WapiMod.getActiveChatId();
      if (!activeChatId) return;
      const message = `[-PublicKey-start-]${publicKey}[-PublicKey-end-]`;
      WapiMod.sendTextMessage(activeChatId, message);
    };

    return (
      <>
        <PGPRandomPrivateKeyModal
          open={randomPrivateKeyModalOpen}
          onConfirm={() => {
            handleRandomPrivateKey(true);
            setRandomPrivateKeyModalOpen(false);
          }}
          onRequestClose={() => setRandomPrivateKeyModalOpen(false)}
        />
        <Flex gap={8}>
          <TextInput
            fullWidth
            value={config.pgp?.privateKey}
            onChange={(privateKey) => setConfig({ ...config, pgp: { ...config.pgp, privateKey } })}
            placeholder="Private key"
          />
          <Button onClick={() => handleRandomPrivateKey(false)}>
            <Flex gap={8} align="center">
              <Icon type="reload" size={16} />
              <div style={{ whiteSpace: "nowrap" }}>Random Private Key</div>
            </Flex>
          </Button>
        </Flex>
        <Button disabled={!canSendPublicKey} onClick={handleSendPublicKey}>
          <Flex gap={8} align="center">
            <Icon type="send" size={16} />
            <div style={{ whiteSpace: "nowrap" }}>Send Public Key</div>
          </Flex>
        </Button>
      </>
    );
  },
};
