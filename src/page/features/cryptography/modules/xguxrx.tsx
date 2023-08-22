import { CryptographyModule } from "../module";

const encryptMessage = (message: string) => {
  return message
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/([aou])/gi, "$1g$1r$1")
    .replace(/([ei])/gi, "$1gu$1r$1");
};

const decryptMessage = (encryptedMessage: string) => {
  let output = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
    const c = encryptedMessage[i];
    if (c.match(/[aou]/i)) {
      i += 4;
    } else if (c.match(/[ei]/i)) {
      i += 5;
    }
    output += c;
  }
  return output;
};

export const AguaraCryptographyModule: CryptographyModule = {
  name: "Xguxrx",
  apply() {},
  destroy() {},
  async encrypt(config, message) {
    return encryptMessage(message);
  },
  async decrypt(config, encryptedMessage) {
    return decryptMessage(encryptedMessage);
  },
  component: () => null,
};
