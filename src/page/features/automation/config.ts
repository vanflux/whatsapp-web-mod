export const DEFAULT_AUTOMATION_CONFIG: AutomationConfig = {
  items: [],
};

// Automation

export type Automation = {
  id: string;
  lastExecution?: string;
  entrypoint?: AutomationEntrypoint;
};

// Automation entrypoints

export type AutomationEntrypoint = ScheduleEntrypoint;

export type ScheduleEntrypoint = {
  type: "schedule";
  trigger: ScheduleTrigger;
  action?: AutomationAction;
};

export type ScheduleTrigger = {
  items: ScheduleTriggerItem[];
};

export type ScheduleTriggerItem = {
  cron: string;
  type: string;
  description?: string;
};

// Automation actions

export type AutomationAction = AutomationMessageAction;

export type AutomationMessageAction = {
  type: "message";
  message: string;
  chatIds: string[];
};

// Automation config

export interface AutomationConfig {
  items: Automation[];
}
