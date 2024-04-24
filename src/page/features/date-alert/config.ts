export const DEFAULT_DATE_ALERT_CONFIG: DateAlertConfig = {
  items: [],
};

export type DateAlertItem = {
  startDate: string;
  endDate: string;
  lastExecution?: string;
  action?: DateAlertAction;
};

export type DateAlertAction = DateAlertMessageAction;

export type DateAlertMessageAction = {
  type: "message";
  message: string;
  chatId: string;
};

export interface DateAlertConfig {
  items: DateAlertItem[];
}
