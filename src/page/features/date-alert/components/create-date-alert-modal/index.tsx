import React, { useMemo, useState } from "react";
import { Modal } from "@page-components/basic/modal";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import styles from "./styles.module.css";
import { FormLabel } from "@page-components/basic/form-label";
import { TextInput } from "@page-components/basic/text-input";
import { Button } from "@page-components/basic/button";
import { DateAlertItem, DateAlertMessageAction } from "@page-features/date-alert/config";
import { DateTimePicker } from "@page-components/basic/datetime-picker";

interface Props {
  open: boolean;
  onCreate?: (item: DateAlertItem) => void;
  onRequestClose?: () => void;
}

export function CreateDateAlertModal({ open, onCreate, onRequestClose }: Props) {
  const [chatId, setChatId] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const chats = useMemo<any[]>(() => {
    if (!open) return [];
    return WapiMod.getAllChats();
  }, [open]);

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className={styles.container}>
        <FormLabel>Message:</FormLabel>
        <TextInput fullWidth value={message} onChange={setMessage} />
        <FormLabel>Start date time:</FormLabel>
        <DateTimePicker value={startDate} onChange={setStartDate} fullWidth />
        <FormLabel>End date time:</FormLabel>
        <DateTimePicker value={endDate} onChange={setEndDate} fullWidth />
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
            if (!startDate) return;
            if (!endDate) return;
            const item: DateAlertItem = {
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
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
