import { ScheduleTrigger } from '@page-features/automation/config';
import { TextInput } from '../text-input';
import React from 'react';
import { SelectInput } from '../select-input';

interface Props {
  value?: ScheduleTrigger;
  onChange?: (value: ScheduleTrigger) => void;
}

export function ScheduleTriggerInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <SelectInput options={[{ value: 'custom', label: 'Custom' }]} />
      <TextInput
        value={value?.items[0]?.cron ?? ''}
        onChange={(value) => onChange?.({ items: value ? [{ cron: value, type: 'custom' }] : [] })}
      />
    </div>
  );
}
