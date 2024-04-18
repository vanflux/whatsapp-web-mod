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
  private static modules: CryptographyModule[] = [PGPCryptographyModule, AguaraCryptographyModule];
  private static destroySetAttributeHook: () => void;

  public static getModules() {
    return this.modules;
  }

  public static getConfig() {
    return this.config;
  }

  public static setConfig(config: CryptographyConfig) {
    const oldConfig = this.config;
    this.config = config;
    StorageService.setItem(CONFIG_STORAGE_KEY, config);
    this.events.emit("change:config", config);
    if (oldConfig?.autoDecrypt !== config?.autoDecrypt || oldConfig?.hideEncryptedBody !== config?.hideEncryptedBody) this.updateAllMessages();
  }

  private static async updateMessage(messageModel: any, isNew: boolean) {
    if (!messageModel) return;
    if (messageModel.__vfOriginalBody == null) messageModel.__vfOriginalBody = messageModel.body;
    const originalBody = messageModel.__vfOriginalBody;
    if (!originalBody) return;
    if (this.config.autoDecrypt) {
      const senderId = messageModel.senderObj?.id?._serialized;
      if (!senderId) return;
      const matches = originalBody.match(/\[\-(\w+)\-\]([^\[]+)\[/);
      if (!matches?.length) return;
      const [_, moduleName, encryptedMessage] = matches;
      const module = this.modules.find((module) => module.name === moduleName);
      if (!module) return;
      if (messageModel.__vfDecryptedBody == null) messageModel.__vfDecryptedBody = await module.decrypt(senderId, encryptedMessage);
      const message = messageModel.__vfDecryptedBody;
      if (isNew) {
        while (messageModel.ack < 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      if (this.config.hideEncryptedBody) {
        if (message) messageModel.body = message;
      } else {
        if (message) messageModel.body = `[Decrypted-${moduleName}] ${message}\n\n[Encrypted-${moduleName}] ${encryptedMessage}`;
      }
    } else {
      messageModel.body = originalBody;
    }
  }

  private static updateAllMessages() {
    WapiMod.getAllMessages().forEach((message: any) => this.updateMessage(message, false));
  }

  private static applyMessageHooks() {
    WapiMod.onAnyMessage((message: any) => this.updateMessage(message, true));
    this.destroySetAttributeHook = hookFn(HTMLDivElement.prototype, "setAttribute", async (key, value) => {
      if (key === "data-id") {
        const message = WapiMod.getMessageById(value);
        if (!message) return;
        this.updateMessage(message, true);
      }
    });
  }

  public static apply() {
    this.config = StorageService.getItem<CryptographyConfig>(CONFIG_STORAGE_KEY) ?? DEFAULT_CRYPTOGRAPHY_CONFIG;
    this.modules.forEach((module) => module.apply());
    this.updateAllMessages();
    this.applyMessageHooks();
  }

  public static destroy() {
    this.modules.forEach((module) => module.destroy());
    this.destroySetAttributeHook();
  }
}
