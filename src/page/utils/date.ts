import { padZero } from "./pad";

export function formatDDMMYYYYHHMMSS(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
