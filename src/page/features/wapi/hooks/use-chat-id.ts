import { useEffect, useState } from "react";
import { WapiMod } from "../wapi.mod";

export function useChat(chatId?: string): any | undefined {
  const [chat, setChat] = useState(() => (chatId ? WapiMod.getChatById(chatId) : undefined));

  useEffect(() => {
    const handler = () => {
      setChat(() => (chatId ? WapiMod.getChatById(chatId) : undefined));
    };
    WapiMod.onReady(handler);
    return () => {
      WapiMod.onReady(handler);
    };
  }, [chatId]);

  return chat;
}
