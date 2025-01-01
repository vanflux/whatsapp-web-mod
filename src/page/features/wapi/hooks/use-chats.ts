import { useEffect, useState } from "react";
import { WapiMod } from "../wapi.mod";

export function useChats(): any | undefined {
  const [chats, setChats] = useState(() => WapiMod.getAllChats());

  useEffect(() => {
    const handler = () => {
      setChats(() => WapiMod.getAllChats());
    };
    WapiMod.onReady(handler);
    return () => {
      WapiMod.onReady(handler);
    };
  }, []);

  return chats;
}
