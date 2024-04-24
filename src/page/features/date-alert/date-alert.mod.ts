import { WapiMod } from "@page-features/wapi/wapi.mod";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";
import { DateAlertConfig, DateAlertItem, DEFAULT_DATE_ALERT_CONFIG } from "./config";

const CONFIG_STORAGE_KEY = "date-alert-config";

export class DateAlertMod {
  public static displayName = "Date Alert";
  public static events = new EventEmitter();
  private static config: DateAlertConfig;
  private static checking = false;

  public static getConfig() {
    return this.config;
  }

  public static setConfig(config: DateAlertConfig) {
    this.config = config;
    StorageService.setItem(CONFIG_STORAGE_KEY, config);
    this.events.emit("change:config", config);
  }

  private static async check(item: DateAlertItem) {
    try {
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      if (!(Date.now() >= startDate.getTime() && Date.now() < endDate.getTime())) return;
      if (item.lastExecution) {
        const lastExecution = new Date(item.lastExecution);
        if (lastExecution.getTime() >= startDate.getTime() && lastExecution.getTime() < endDate.getTime()) return;
      }
      console.log("Executing:", item);
      const chatId = item.action?.chatId;
      const message = item.action?.message;
      if (!chatId) return;
      if (!message) return;
      WapiMod.sendTextMessage(chatId, message);
      item.lastExecution = new Date().toISOString();
      this.setConfig({ ...this.config });
      console.log("Executed:", item);
    } catch (exc: unknown) {
      console.error("Cron failed to start:", item, exc);
    }
  }

  private static async checkAll() {
    for (const item of this.config.items) {
      await this.check(item);
    }
  }

  private static async loop() {
    this.checking = true;
    while (this.checking) {
      await this.checkAll();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  public static apply() {
    this.config = StorageService.getItem<DateAlertConfig>(CONFIG_STORAGE_KEY) ?? DEFAULT_DATE_ALERT_CONFIG;
    this.loop();
  }

  public static destroy() {
    this.checking = false;
  }
}
