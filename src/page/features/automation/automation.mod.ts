import { WapiMod } from "@page-features/wapi/wapi.mod";
import { EventEmitter } from "events";
import { StorageService } from "../../services/storage.service";
import { Automation, AutomationConfig, DEFAULT_AUTOMATION_CONFIG } from "./config";

const CONFIG_STORAGE_KEY = "automation-config";

export class AutomationMod {
  public static displayName = "Automation";
  public static events = new EventEmitter();
  private static config: AutomationConfig;
  private static checking = false;

  public static getConfig() {
    return this.config;
  }

  public static setConfig(config: AutomationConfig) {
    this.config = config;
    StorageService.setItem(CONFIG_STORAGE_KEY, config);
    this.events.emit("change:config", config);
  }

  private static async check(item: Automation) {
    try {
      const lastExecution = item.lastExecution ? new Date(item.lastExecution) : undefined;
      const entrypoint = item.entrypoint;
      if (!entrypoint) return;
      if (!entrypoint.action) return;
      if (entrypoint.type === "birthday") {
        const dateOfBirth = new Date(entrypoint.dateOfBirth);
        const action = entrypoint.action;
        const now = new Date();
        const startDate = new Date(now.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate(), 0, 0, 0, 0);
        const endDate = new Date(now.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate() + 1, 0, 0, 0, 0);
        if (!(Date.now() >= startDate.getTime() && Date.now() < endDate.getTime())) return;
        if (lastExecution && lastExecution.getTime() >= startDate.getTime() && lastExecution.getTime() < endDate.getTime()) return;
        console.log("Executing, item:", item);
        await WapiMod.sendTextMessage(action.chatId, action.message);
        item.lastExecution = new Date().toISOString();
        this.setConfig({ ...this.config });
        console.log("Executed:", item);
      }
    } catch (exc: unknown) {
      console.error("Check failed:", item, exc);
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
    this.config = StorageService.getItem<AutomationConfig>(CONFIG_STORAGE_KEY) ?? DEFAULT_AUTOMATION_CONFIG;
    this.loop();
  }

  public static destroy() {
    this.checking = false;
  }
}
