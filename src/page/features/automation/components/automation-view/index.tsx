import { Flex } from "@page-components/basic/flex";
import React from "react";
import { formatDDMMYYYY, formatDDMMYYYYHHMMSS } from "../../../../utils/date";
import styles from "./styles.module.css";
import { Icon } from "@page-components/basic/icon";
import { Button } from "@page-components/basic/button";
import { Automation } from "@page-features/automation/config";
import { useChat } from "@page-features/wapi/hooks/use-chat-id";

interface Props {
  item: Automation;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AutomationView({ item, onEdit, onDelete }: Props) {
  const chat = useChat(item.entrypoint?.action?.chatId);

  return (
    <Flex direction="column" gap={4} className={styles.container}>
      <Flex direction="column" gap={2}>
        {item.entrypoint?.type === "birthday" && (
          <>
            <p>Date of birth: {formatDDMMYYYY(item.entrypoint.dateOfBirth)}</p>
            {item.entrypoint.action?.type === "message" && (
              <>
                <p>Chat: {chat?.formattedTitle ?? "-"}</p>
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
