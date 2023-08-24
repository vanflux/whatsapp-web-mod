import { CryptographyModule } from "./module";
import { PGPCryptographyModule } from "./modules/pgp";
import { AguaraCryptographyModule } from "./modules/xguxrx";
import { hookFn } from "../../utils/hook-fn";
import { CryptographyConfig, DEFAULT_CRYPTOGRAPHY_CONFIG } from "./config";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";

const CONFIG_STORAGE_KEY = "cryptography-config";

export class CryptographyMod {
  public static displayName = "Cryptography";
  public static events = new EventEmitter();
  private static config: CryptographyConfig;
  private static modules: CryptographyModule[] = [
    //PGPCryptographyModule,
    AguaraCryptographyModule,
  ];
  private static destroySetAttributeHook: () => void;

  public static getModules() {
    return this.modules;
  }

  public static getConfig() {
    return this.config;
  }

  public static setConfig(config: CryptographyConfig) {
    this.config = config;
    StorageService.setItem(CONFIG_STORAGE_KEY, config);
    this.events.emit("change:config", config);
  }

  public static apply() {
    const self = this;
    this.config = StorageService.getItem<CryptographyConfig>(CONFIG_STORAGE_KEY) ?? DEFAULT_CRYPTOGRAPHY_CONFIG;
    const processMessage = async (messageModel: any) => {
      if (!messageModel) return;
      const received = messageModel.body;
      if (!received) return;
      const senderId = messageModel.senderObj?.id?._serialized;
      if (!senderId) return;
      const matches = received.match(/\[\-(\w+)\-\]([^\[]+)\[/);
      if (matches?.length) {
        const [_, moduleName, encryptedMessage] = matches;
        const module = self.modules.find((module) => module.name === moduleName);
        if (module) {
          const message = await module.decrypt(self.config, senderId, encryptedMessage);
          if (message) messageModel.body = `[Decrypted-${moduleName}] ${message}\n\n[Encrypted-${moduleName}] ${encryptedMessage}`;
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
