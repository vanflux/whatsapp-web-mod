import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "@page-components/basic/modal";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import styles from "./styles.module.css";
import { FormLabel } from "@page-components/basic/form-label";
import { TextInput } from "@page-components/basic/text-input";
import { Button } from "@page-components/basic/button";
import { DateTimePicker } from "@page-components/basic/datetime-picker";
import { Automation } from "@page-features/automation/config";
import { Flex } from "@page-components/basic/flex";

interface Props {
  open: boolean;
  item?: Automation;
  onSave?: (item: Automation) => void;
  onRequestClose?: () => void;
}

export function AutomationModal({ open, item, onSave, onRequestClose }: Props) {
  const [chatId, setChatId] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [lastExecution, setLastExecution] = useState<Date>();

  useEffect(() => {
    if (!open) return;
    setChatId(item?.entrypoint?.action?.chatId);
    setMessage(item?.entrypoint?.action?.message);
    setDateOfBirth(item?.entrypoint?.dateOfBirth ? new Date(item?.entrypoint?.dateOfBirth) : undefined);
    setLastExecution(item?.lastExecution ? new Date(item?.lastExecution) : undefined);
  }, [item, open]);

  const chats = useMemo<any[]>(() => {
    if (!open) return [];
    return WapiMod.getAllChats();
  }, [open]);

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className={styles.container}>
        <FormLabel>Message:</FormLabel>
        <TextInput fullWidth value={message} onChange={setMessage} />
        <FormLabel>Date of birth:</FormLabel>
        <DateTimePicker value={dateOfBirth} onChange={setDateOfBirth} fullWidth onlyDate />
        <FormLabel>Chat list:</FormLabel>
        <div className={styles.chatList}>
          {chats.map((chat) => {
            const id = chat?.id?._serialized;
            const name = chat?.formattedTitle;
            return (
              <Button key={id} className={`${styles.chatItem} ${id === chatId ? styles.selectedChatItem : ""}`} onClick={() => setChatId(id)}>
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
            if (!chatId) return;
            if (!message) return;
            if (!dateOfBirth) return;
            const id = item?.id ?? `${Math.floor(Math.random() * 999999999999999)}`;
            const newItem: Automation = {
              id,
              lastExecution: lastExecution?.toISOString(),
              entrypoint: {
                type: "birthday",
                dateOfBirth: dateOfBirth.toISOString(),
                action: {
                  type: "message",
                  chatId,
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
