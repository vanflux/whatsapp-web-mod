import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@page-components/basic/modal';
import { FormLabel } from '@page-components/basic/form-label';
import { TextInput } from '@page-components/basic/text-input';
import { Button } from '@page-components/basic/button';
import { DateTimePicker } from '@page-components/basic/datetime-picker';
import { Automation, Schedule } from '@page-features/automation/config';
import { useChats } from '@page-features/wapi/hooks/use-chats';
import { cn } from '../../../../utils/cn';
import { ScheduleInput } from '@page-components/basic/schedule-input';

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
  const [schedule, setSchedule] = useState<Schedule>();
  const [lastExecution, setLastExecution] = useState<Date>();
  const allChats = useChats();

  useEffect(() => {
    if (!open) return;
    setChatIds(item?.entrypoint?.action?.chatIds ?? []);
    setMessage(item?.entrypoint?.action?.message);
    setSchedule(item?.entrypoint?.schedule);
    setLastExecution(item?.lastExecution ? new Date(item?.lastExecution) : undefined);
  }, [item, open]);

  const chats = useMemo<any[]>(() => {
    return allChats.filter((item: any) => item?.formattedTitle?.toLowerCase().includes(search ?? ''));
  }, [search, allChats]);

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-center text-lg">Create Automation</p>
        <FormLabel>Message:</FormLabel>
        <TextInput fullWidth value={message} onChange={setMessage} />
        <FormLabel>Schedule:</FormLabel>
        <ScheduleInput value={schedule} onChange={setSchedule} />
        <FormLabel>Chat list:</FormLabel>
        <TextInput fullWidth value={search} onChange={setSearch} placeholder="Pesquisa..." />
        <div className="flex flex-col gap-1 overflow-auto max-h-[200px]">
          {chats.map((chat: any) => {
            const id = chat?.id?._serialized;
            const name = chat?.formattedTitle;
            return (
              <Button
                key={id}
                className={cn('border border-white/10 hover:bg-white/40', chatIds?.includes(id) && 'bg-white/20 hover:bg-white/30')}
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
        <div className="flex justify-between gap-1">
          <DateTimePicker value={lastExecution} onChange={setLastExecution} fullWidth disabled />
          <Button onClick={() => setLastExecution(undefined)}>Reset</Button>
        </div>
        <Button
          onClick={() => {
            if (!chatIds) return;
            if (!message) return;
            if (!schedule) return;
            const id = item?.id ?? `${Math.floor(Math.random() * 999999999999999)}`;
            const newItem: Automation = {
              id,
              lastExecution: lastExecution?.toISOString(),
              entrypoint: {
                type: 'schedule',
                schedule,
                action: {
                  type: 'message',
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
