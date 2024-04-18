import React, { useMemo, useState } from "react";
import { Modal } from "@page-components/basic/modal";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import styles from "./styles.module.css";
import { FormLabel } from "@page-components/basic/form-label";
import { TextInput } from "@page-components/basic/text-input";
import { Button } from "@page-components/basic/button";
import { DateAlertItem, DateAlertMessageAction } from "@page-features/date-alert/config";

interface Props {
  open: boolean;
  onCreate?: (item: DateAlertItem) => void;
  onRequestClose?: () => void;
}

export function CreateDateAlertModal({ open, onCreate, onRequestClose }: Props) {
  const [chatId, setChatId] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [date, setDate] = useState<Date>();

  const chats = useMemo<any[]>(() => {
    if (!open) return [];
    return WapiMod.getAllChats();
  }, [open]);

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className={styles.container}>
        <FormLabel>Message:</FormLabel>
        <TextInput fullWidth value={message} onChange={setMessage} />
        <FormLabel>Date time:</FormLabel>
        <input
          value={date?.toISOString()?.match(/^\d{4}\-\d{1,2}\-\d{1,2}T\d{1,2}:\d{1,2}/) ?? ""}
          onChange={(e) => {
            console.log(e.target.value);
            const date = new Date(e.target.value);
            console.log(date);
            if (!isNaN(date.getTime())) {
              setDate(date);
            } else {
              setDate(undefined);
            }
          }}
          type="datetime-local"
        />
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
        <Button
          onClick={() => {
            if (!chatId) return;
            if (!message) return;
            if (!date) return;
            const cron = `0 ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
            const item: DateAlertItem = {
              cron,
              action: {
                chatId,
                message,
                type: "message",
              },
            };
            onCreate?.(item);
          }}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
}
