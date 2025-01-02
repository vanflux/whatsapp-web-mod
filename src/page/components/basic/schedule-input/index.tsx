import { Schedule } from '@page-features/automation/config';
import Item from './item';
import { Button } from '../button';

interface Props {
  value?: Schedule;
  onChange?: (value: Schedule) => void;
}

export function ScheduleInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {value?.items.map((item, i) => (
        <Item
          scheduleItem={item}
          onChange={(scheduleItem) => {
            onChange?.({ ...value, items: value.items.map((item2, i2) => (i === i2 ? scheduleItem : item2)) });
          }}
          onDelete={() => {
            onChange?.({ ...value, items: value.items.filter((_, i2) => i !== i2) });
          }}
        />
      ))}
      <Button
        onClick={() => {
          onChange?.({ ...value, items: [...(value?.items ?? []), { cron: '', type: 'custom' }] });
        }}
      >
        Add
      </Button>
    </div>
  );
}
