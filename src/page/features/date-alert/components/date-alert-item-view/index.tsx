import { Flex } from "@page-components/basic/flex";
import React, { useMemo } from "react";
import { formatDDMMYYYYHHMMSS } from "../../../../utils/date";
import { DateAlertItem } from "@page-features/date-alert/config";
import styles from "./styles.module.css";
import { WapiMod } from "@page-features/wapi/wapi.mod";

interface Props {
  item: DateAlertItem;
}

export function DateAlertItemView({ item }: Props) {
  const chat = useMemo(() => {
    if (!item.action?.chatId) return;
    return WapiMod.getChatById(item.action.chatId);
  }, [item.action?.chatId]);

  return (
    <Flex direction="column" className={styles.container}>
      <p>Start date: {formatDDMMYYYYHHMMSS(item.startDate)}</p>
      <p>End date: {formatDDMMYYYYHHMMSS(item.endDate)}</p>
      <p>Last execution: {item.lastExecution ? formatDDMMYYYYHHMMSS(item.lastExecution) : "-"}</p>
      {item.action?.type === "message" && (
        <>
          <p>Chat: {chat?.formattedTitle ?? "-"}</p>
          <p>Message: {item.action.message}</p>
        </>
      )}
    </Flex>
  );
}
