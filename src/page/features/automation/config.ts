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

export type AutomationEntrypoint = BirthdayEntrypoint;

export type BirthdayEntrypoint = {
  type: "birthday";
  dateOfBirth: string;
  action?: AutomationAction;
};

// Automation actions

export type AutomationAction = AutomationMessageAction;

export type AutomationMessageAction = {
  type: "message";
  message: string;
  chatId: string;
};

// Automation config

export interface AutomationConfig {
  items: Automation[];
}
