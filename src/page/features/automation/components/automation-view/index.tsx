import { Flex } from "@page-components/basic/flex";
import { formatDDMMYYYYHHMMSS } from "../../../../utils/date";
import styles from "./styles.module.css";
import { WapiMod } from "@page-features/wapi/wapi.mod";
import { Icon } from "@page-components/basic/icon";
import { Button } from "@page-components/basic/button";
import { Automation } from "@page-features/automation/config";
import React, { useMemo } from "react";

interface Props {
  item: Automation;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AutomationView({ item, onEdit, onDelete }: Props) {
  const names = useMemo(() => {
    if (!item.entrypoint?.action?.chatIds) return;
    const chats = WapiMod.getAllChats();
    const chatIds = item.entrypoint?.action.chatIds ?? [];
    const names = chatIds.map((chatId) => {
      const chat = chats.find((item) => item?.id?._serialized === chatId);
      return chat?.formattedTitle;
    });
    return names.join(", ");
  }, []);

  return (
    <Flex direction="column" gap={4} className={styles.container}>
      <Flex direction="column" gap={2}>
        {item.entrypoint?.type === "schedule" && (
          <>
            <p>Crons: {item.entrypoint.trigger.items.map((item) => item.cron).join(" - ")}</p>
            {item.entrypoint.action?.type === "message" && (
              <>
                <p>Chat: {names ?? "-"}</p>
                <p>Message: {item.entrypoint.action.message}</p>
              </>
            )}
          </>
        )}
        <p>Last execution: {item.lastExecution ? formatDDMMYYYYHHMMSS(item.lastExecution) : "-"}</p>
      </Flex>
      <Flex gap={8}>
        <Button onClick={onEdit} fullWidth>
          <Flex gap={8} align="center">
            <Icon size={16} type="eye" />
            Edit
          </Flex>
        </Button>
        <Button onClick={onDelete} fullWidth>
          <Flex gap={8} align="center">
            <Icon size={16} type="delete" />
            Delete
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
