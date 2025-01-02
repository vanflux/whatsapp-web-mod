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
  type: 'schedule';
  schedule: Schedule;
  action?: AutomationAction;
};

export type Schedule = {
  items: ScheduleItem[];
};

export type ScheduleItem = {
  cron: string;
  type: string;
  description?: string;
};

// Automation actions

export type AutomationAction = AutomationMessageAction;

export type AutomationMessageAction = {
  type: 'message';
  message: string;
  chatIds: string[];
};

// Automation config

export interface AutomationConfig {
  items: Automation[];
}
