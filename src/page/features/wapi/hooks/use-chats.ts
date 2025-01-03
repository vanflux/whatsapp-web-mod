import { useEffect, useState } from 'react';
import { WapiMod } from '../wapi.mod';

export function useChats(): any | undefined {
  const [chats, setChats] = useState(() => WapiMod.getAllChats());

  useEffect(() => {
    const handler = () => {
      setChats(() => WapiMod.getAllChats());
    };
    const destroy = WapiMod.onChatsChange(handler);
    return () => {
      destroy();
    };
  }, []);

  return chats;
}
