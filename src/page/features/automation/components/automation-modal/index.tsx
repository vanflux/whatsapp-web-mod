import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@page-components/basic/modal';
import { FormLabel } from '@page-components/basic/form-label';
import { TextInput } from '@page-components/basic/text-input';
import { Button } from '@page-components/basic/button';
import { DateTimePicker } from '@page-components/basic/datetime-picker';
import { Automation, ScheduleTrigger } from '@page-features/automation/config';
import { useChats } from '@page-features/wapi/hooks/use-chats';
import { ScheduleTriggerInput } from '@page-components/basic/schedule-trigger-input';
import { cn } from '../../../../utils/cn';
import { SelectInput } from '@page-components/basic/select-input';
import { useChat } from '@page-features/wapi/hooks/use-chat-id';

interface Props {
  open: boolean;
  item?: Automation;
  onSave?: (item: Automation) => void;
  onRequestClose?: () => void;
}

function ChatOption({ value, label }: { value: string; label: string }) {
  const chat = useChat(value);

  const imgUrl = useMemo(() => chat?.contact?.getProfilePicThumb?.()?.img, [chat]);

  return (
    <div className="flex gap-2 items-center">
      <img className="w-6 h-6 rounded-full" loading="lazy" src={imgUrl} />
      {label}
    </div>
  );
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
    return allChats.filter((item: any) => item?.formattedTitle?.toLowerCase().includes(search ?? ''));
  }, [search, allChats]);

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-center text-lg">Create Automation</p>
        <FormLabel>Message:</FormLabel>
        <TextInput fullWidth value={message} onChange={setMessage} />
        <FormLabel>Trigger:</FormLabel>
        <ScheduleTriggerInput value={trigger} onChange={setTrigger} />
        <FormLabel>Chat list:</FormLabel>
        <SelectInput
          searchable
          multi
          options={chats.map((chat: any) => ({
            value: chat?.id?._serialized,
            label: chat?.formattedTitle,
          }))}
          renderOption={ChatOption}
          value={chatIds}
          onChange={(ids?: string[]) => setChatIds(ids ?? [])}
        />
        <FormLabel>Last execution:</FormLabel>
        <div className="flex justify-between gap-1">
          <DateTimePicker value={lastExecution} onChange={setLastExecution} fullWidth disabled />
          <Button onClick={() => setLastExecution(undefined)}>Reset</Button>
        </div>
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
                type: 'schedule',
                trigger,
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
