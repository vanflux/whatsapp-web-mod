import { ScheduleItem } from '@page-features/automation/config';
import { SelectInput } from '../select-input';
import { TextInput } from '../text-input';
import { Button } from '../button';
import { Icon } from '../icon';
import { useState } from 'react';

interface Props {
  scheduleItem: ScheduleItem;
  onChange: (scheduleItem: ScheduleItem) => void;
  onDelete: () => void;
}

export default function Item({ scheduleItem, onChange, onDelete }: Props) {
  const [type, setType] = useState(scheduleItem.type);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <SelectInput
          className="flex-1"
          options={[{ value: 'custom', label: 'Custom' }]}
          value={type}
          onChange={(type) => type && setType(type)}
        />
        <Button onClick={onDelete}>
          <div className="flex gap-2 items-center">
            <Icon size={16} type="delete" />
          </div>
        </Button>
      </div>
      {type === 'custom' && (
        <TextInput value={scheduleItem.cron ?? ''} onChange={(value) => onChange({ cron: value ?? '', type: 'custom' })} />
      )}
    </div>
  );
}
