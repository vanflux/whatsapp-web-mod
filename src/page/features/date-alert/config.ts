export const DEFAULT_DATE_ALERT_CONFIG: DateAlertConfig = {
  items: [],
};

export type DateAlertItem = {
  cron: string;
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
