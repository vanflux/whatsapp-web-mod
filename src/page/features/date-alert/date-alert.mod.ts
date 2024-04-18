import { WapiMod } from "@page-features/wapi/wapi.mod";
import { Cron } from "croner";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";
import { DateAlertConfig, DateAlertItem, DEFAULT_DATE_ALERT_CONFIG } from "./config";

const CONFIG_STORAGE_KEY = "date-alert-config";

export class DateAlertMod {
  public static displayName = "Date Alert";
  public static events = new EventEmitter();
  private static config: DateAlertConfig;
  private static crons = new Map<DateAlertItem, Cron>();

  public static getConfig() {
    return this.config;
  }

  public static setConfig(config: DateAlertConfig) {
    this.config = config;
    StorageService.setItem(CONFIG_STORAGE_KEY, config);
    this.events.emit("change:config", config);
    this.reinitializeCrons();
  }

  private static reinitializeCrons() {
    this.destroyCrons();
    this.initializeCrons();
  }

  private static initializeCrons() {
    for (const item of this.config.items) {
      try {
        console.log("Initializing cron of", item);
        const cron = new Cron(item.cron, () => {
          console.log("Cron executed!", item);
          const chatId = item.action?.chatId;
          const message = item.action?.message;
          if (!chatId) return;
          if (!message) return;
          WapiMod.sendTextMessage(chatId, message);
          this.setConfig({
            ...this.config,
            items: this.config.items.filter((i) => i !== item),
          });
        });
        this.crons.set(item, cron);
      } catch (exc: unknown) {
        console.error("Cron failed to start:", item, exc);
      }
    }
  }

  private static destroyCrons() {
    for (const [item, cron] of this.crons.entries()) {
      console.log("Destroying cron of", item);
      cron.stop();
    }
    this.crons.clear();
  }

  public static apply() {
    this.config = StorageService.getItem<DateAlertConfig>(CONFIG_STORAGE_KEY) ?? DEFAULT_DATE_ALERT_CONFIG;
    this.initializeCrons();
  }

  public static destroy() {
    this.destroyCrons();
  }
}
