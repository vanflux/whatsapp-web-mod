import { EventEmitter } from "events";

declare global {
  interface Window {
    Store: any;
  }
}

export class WapiMod {
  private static events = new EventEmitter();
  private static listeningChats = new Set();

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

    window.Store.Msg.on("add", (message: any) => {
      this.events.emit("anyMessage", message);
    });
    const applyChatHooks = (chat: any) => {
      if (this.listeningChats.has(chat)) return;
      this.listeningChats.add(chat);
      chat.on("change:active", (chat: any, active: boolean) => {
        if (active) this.events.emit("activeChat", chat);
      });
    };
    window.Store.Chat.on("add", (chat: any) => {
      applyChatHooks(chat);
    });
    window.Store.Chat.on("remove", (chat: any) => {
      chat.removeAllListeners();
    });
    this.getAllChats().forEach(applyChatHooks);
  }

  public static destroy() {
    window.Store.Msg.removeAllListeners();
    window.Store.Chat.removeAllListeners();
    this.getAllChats().forEach((chat: any) => chat.removeAllListeners());
  }
}
