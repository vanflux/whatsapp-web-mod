import { useEffect, useState } from 'react';
import { WapiMod } from '../wapi.mod';

export function useActiveChatID(): string | undefined {
  const [chatId, setChatId] = useState(() => WapiMod.getActiveChatId());

  useEffect(() => {
    const handler = (chat: any) => setChatId(chat?.id?.toString());
    const destroy = WapiMod.onActiveChat(handler);
    return () => {
      destroy();
    };
  }, []);

  return chatId;
}
