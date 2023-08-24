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
    return window.Store.Chat.toArray();
  }

  public static onAnyMessage(handler: (message: any) => void) {
    return this.events.on("anyMessage", handler);
  }

  public static onActiveChat(handler: (chat: any) => void) {
    return this.events.on("activeChat", handler);
  }

  public static getActiveChatId() {
    return window.Store.Chat.getActive().id.toString();
  }

  public static getChatById(id: string) {
    return window.Store.Chat.get(id);
  }

  public static getAllMessages() {
    return window.Store.Msg.toArray();
  }

  public static getMessageById(id: string) {
    return window.Store.Msg.get(id);
  }

  public static sendTextMessage(id: string, message: string) {
    return this.getChatById(id).sendMessage(message);
  }

  public static async apply() {
    // @ts-ignore
    window.webpackChunkbuild = window.webpackChunkwhatsapp_web_client;
    require("./downloaded/wapi.js");

    this.listen(window.Store.Msg, "add", (message: any) => {
      this.events.emit("anyMessage", message);
    });
    const applyChatHooks = (chat: any) => {
      if (this.listeningChats.has(chat)) return;
      this.listeningChats.add(chat);
      this.listen(chat, "change:active", (chat: any, active: boolean) => {
        if (active) this.events.emit("activeChat", chat);
      });
    };
    this.listen(window.Store.Chat, "add", applyChatHooks);
    this.getAllChats().forEach(applyChatHooks);
  }

  public static destroy() {
    this.listeners.forEach(({ source, name, handler }) => source.off(name, handler));
  }
}
