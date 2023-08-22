import { CryptographyModule } from "./module";
import { PGPCryptographyModule } from "./modules/pgp";
import { AguaraCryptographyModule } from "./modules/xguxrx";
import { hookFn } from "../../utils/hook-fn";
import { CryptographyConfig } from "./config";
import { WapiMod } from "@page-features/wapi/wapi.mod";

export class CryptographyMod {
  private static config: CryptographyConfig;
  private static modules: CryptographyModule[] = [PGPCryptographyModule, AguaraCryptographyModule];
  private static destroySetAttributeHook: () => void;

  public static getModules() {
    return this.modules;
  }

  public static setConfig(config: CryptographyConfig) {
    this.config = config;
  }

  public static apply() {
    const self = this;
    const processMessage = async (messageModel: any) => {
      const received = messageModel.body;
      if (!received) return;
      const matches = received.match(/\[\-(\w+)\-\]([^\[]+)\[/);
      if (matches?.length) {
        const [_, moduleName, encryptedMessage] = matches;
        const module = self.modules.find((module) => module.name === moduleName);
        if (module) {
          const message = await module.decrypt(self.config, encryptedMessage);
          if (message) messageModel.body = `[Encrypted-${moduleName}] ${encryptedMessage}\n\n[Decrypted-${moduleName}] ${message}`;
        }
      }
    };
    this.modules.forEach((module) => module.apply());
    WapiMod.getAllMessages().forEach(processMessage);
    WapiMod.onAnyMessage(processMessage);
    this.destroySetAttributeHook = hookFn(HTMLDivElement.prototype, "setAttribute", async function (this: HTMLElement, key, value) {
      if (key === "data-id") {
        const message = WapiMod.getMessageById(value);
        if (!message) return;
        processMessage(message);
      }
    });
  }

  public static destroy() {
    this.modules.forEach((module) => module.destroy());
    this.destroySetAttributeHook();
  }
}
