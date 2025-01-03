import { useMemo } from 'react';
import { useChats } from './use-chats';

export function useChat(chatId?: string): any | undefined {
  const chats = useChats();
  const chat = useMemo(() => chats.find((item: any) => item?.id?._serialized === chatId), [chats, chatId]);
  return chat;
}
