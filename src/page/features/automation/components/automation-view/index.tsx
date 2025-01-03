import { Icon } from '@page-components/basic/icon';
import { Button } from '@page-components/basic/button';
import { Automation } from '@page-features/automation/config';
import { useChats } from '@page-features/wapi/hooks/use-chats';
import React, { useMemo } from 'react';
import { formatDDMMYYYYHHMMSS } from '../../../../utils/date';

interface Props {
  item: Automation;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AutomationView({ item, onEdit, onDelete }: Props) {
  const chats = useChats();

  const names = useMemo(() => {
    if (!item.entrypoint?.action?.chatIds) return;
    const chatIds = item.entrypoint?.action.chatIds ?? [];
    const names = chatIds.map((chatId) => {
      const chat = chats.find((item: any) => item?.id?._serialized === chatId);
      return chat?.formattedTitle;
    });
    return names.join(', ');
  }, [item, chats]);

  return (
    <div className="flex flex-col gap-1 p-1 rounded border border-gray-300/40">
      <div className="flex flex-col gap-0.5">
        {item.entrypoint?.type === 'schedule' && (
          <>
            <p>Crons: {item.entrypoint.trigger.items.map((item) => item.cron).join(' - ')}</p>
            {item.entrypoint.action?.type === 'message' && (
              <>
                <p>Chat: {names ?? '-'}</p>
                <p>Message: {item.entrypoint.action.message}</p>
              </>
            )}
          </>
        )}
        <p>Last execution: {item.lastExecution ? formatDDMMYYYYHHMMSS(item.lastExecution) : '-'}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onEdit} fullWidth>
          <div className="flex gap-2 items-center">
            <Icon size={16} type="eye" />
            Edit
          </div>
        </Button>
        <Button onClick={onDelete} fullWidth>
          <div className="flex gap-2 items-center">
            <Icon size={16} type="delete" />
            Delete
          </div>
        </Button>
      </div>
    </div>
  );
}
