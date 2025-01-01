import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "@page-components/basic/modal";
import styles from "./styles.module.css";
import { FormLabel } from "@page-components/basic/form-label";
import { TextInput } from "@page-components/basic/text-input";
import { Button } from "@page-components/basic/button";
import { DateTimePicker } from "@page-components/basic/datetime-picker";
import { Automation, ScheduleTrigger } from "@page-features/automation/config";
import { Flex } from "@page-components/basic/flex";
import { useChats } from "@page-features/wapi/hooks/use-chats";
import { ScheduleTriggerInput } from "@page-components/basic/schedule-trigger-input";

interface Props {
  open: boolean;
  item?: Automation;
  onSave?: (item: Automation) => void;
  onRequestClose?: () => void;
}

export function AutomationModal({ open, item, onSave, onRequestClose }: Props) {
  const [chatIds, setChatIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string>();
  const [search, setSearch] = useState<string>();
  const [trigger, setTrigger] = useState<ScheduleTrigger>();
  const [lastExecution, setLastExecution] = useState<Date>();
  const allChats = useChats();

  useEffect(() => {
    if (!open) return;
    setChatIds(item?.entrypoint?.action?.chatIds ?? []);
    setMessage(item?.entrypoint?.action?.message);
    setTrigger(item?.entrypoint?.trigger);
    setLastExecution(item?.lastExecution ? new Date(item?.lastExecution) : undefined);
  }, [item, open]);

  const chats = useMemo<any[]>(() => {
    return allChats.filter((item: any) => item?.formattedTitle?.toLowerCase().includes(search ?? ""));
  }, [search, allChats]);

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className={styles.container}>
        <FormLabel>Message:</FormLabel>
        <TextInput fullWidth value={message} onChange={setMessage} />
        <FormLabel>Triggers:</FormLabel>
        <ScheduleTriggerInput value={trigger} onChange={setTrigger} />
        <FormLabel>Chat list:</FormLabel>
        <TextInput fullWidth value={search} onChange={setSearch} placeholder="Pesquisa..." />
        <div className={styles.chatList}>
          {chats.map((chat: any) => {
            const id = chat?.id?._serialized;
            const name = chat?.formattedTitle;
            return (
              <Button
                key={id}
                className={`${styles.chatItem} ${chatIds?.includes(id) ? styles.selectedChatItem : ""}`}
                onClick={() => {
                  const already = chatIds.includes(id);
                  if (already) {
                    setChatIds(chatIds.filter((item) => item !== id));
                  } else {
                    setChatIds([...chatIds, id]);
                  }
                }}
              >
                <p>{name}</p>
              </Button>
            );
          })}
        </div>
        <FormLabel>Last execution:</FormLabel>
        <Flex gap={4} justify="between">
          <DateTimePicker value={lastExecution} onChange={setLastExecution} fullWidth disabled />
          <Button onClick={() => setLastExecution(undefined)}>Reset</Button>
        </Flex>
        <Button
          onClick={() => {
            if (!chatIds) return;
            if (!message) return;
            if (!trigger) return;
            const id = item?.id ?? `${Math.floor(Math.random() * 999999999999999)}`;
            const newItem: Automation = {
              id,
              lastExecution: lastExecution?.toISOString(),
              entrypoint: {
                type: "schedule",
                trigger,
                action: {
                  type: "message",
                  chatIds,
                  message,
                },
              },
            };
            onSave?.(newItem);
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}
