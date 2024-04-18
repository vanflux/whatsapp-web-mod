import { EventEmitter } from "events";

declare global {
  interface Window {
    Store: any;
  }
}

type EventHandler = (...args: any) => any;
type EventEmitterSource = {
  on: (name: string, handler: EventHandler) => void;
  off: (name: string, handler: EventHandler) => void;
};

export class WapiMod {
  public static displayName = "Wapi";
  private static events = new EventEmitter();
  private static listeningChats = new Set();
  private static listeners: { source: EventEmitterSource; name: string; handler: EventHandler }[] = [];

  private static listen(source: EventEmitterSource, name: string, handler: EventHandler) {
    this.listeners.push({ source, handler, name });
    source.on(name, handler);
  }

  public static getAllChats() {
    return window?.Store?.Chat?.toArray() as any[];
  }

  public static onAnyMessage(handler: (message: any) => void) {
    return this.events.on("anyMessage", handler);
  }

  public static onActiveChat(handler: (chat: any) => void) {
    return this.events.on("activeChat", handler);
  }

  public static offActiveChat(handler: (chat: any) => void) {
    return this.events.off("activeChat", handler);
  }

  public static getActiveChatId() {
    return window?.Store?.Chat?.getActive()?.id?.toString();
  }

  public static getChatById(id: string) {
    return window?.Store?.Chat?.get(id);
  }

  public static getAllMessages() {
    return window?.Store?.Msg?.toArray();
  }

  public static getMessageById(id: string) {
    return window?.Store?.Msg?.get(id);
  }

  public static sendTextMessage(id: string, message: string) {
    return this.getChatById(id).sendMessage(message);
  }

  private static async inject() {
    const start = Date.now();
    while (Date.now() - start < 10000) {
      try {
        if (
          // @ts-ignore
          window.Debug?.VERSION != undefined &&
          // @ts-ignore
          window.require?.("__debug").modulesMap["WAWebLoadMainBundleFileDefinitions"] &&
          this.tryInjectWapi()
        )
          return;
      } catch (exc: unknown) {
        console.log("Waiting modules to load:", exc);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error("Wait modules failed");
  }

  private static tryInjectWapi() {
    try {
      (() => {
        WAPI_JS_CODE; // This seams random yeah, but code is injected here
      })();
      if (window?.Store.Msg && window?.Store.Chat) return true;
    } catch (exc: unknown) {
      console.log("wapi.js code injection failure:", exc);
    }
    return false;
  }

  private static async hook() {
    this.listen(window?.Store?.Msg, "add", (message: any) => {
      this.events.emit("anyMessage", message);
    });
    const applyChatHooks = (chat: any) => {
      if (this.listeningChats.has(chat)) return;
      this.listeningChats.add(chat);
      this.listen(chat, "change:active", (chat: any, active: boolean) => {
        if (active) this.events.emit("activeChat", chat);
      });
    };
    this.listen(window?.Store?.Chat, "add", applyChatHooks);
    this.getAllChats().forEach(applyChatHooks);
  }

  public static async apply() {
    await this.inject();
    await this.hook();
  }

  public static destroy() {
    this.listeners.forEach(({ source, name, handler }) => source.off(name, handler));
  }
}
