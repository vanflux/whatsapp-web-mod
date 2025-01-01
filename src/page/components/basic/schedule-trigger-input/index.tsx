import { ScheduleTrigger } from "@page-features/automation/config";
import { TextInput } from "../text-input";
import React from "react";

interface Props {
  value?: ScheduleTrigger;
  onChange?: (value: ScheduleTrigger) => void;
}

export function ScheduleTriggerInput({ value, onChange }: Props) {
  return (
    <TextInput value={value?.items[0]?.cron ?? ""} onChange={(value) => onChange?.({ items: value ? [{ cron: value, type: "custom" }] : [] })} />
  );
}
