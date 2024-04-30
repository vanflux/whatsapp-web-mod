import { padZero } from "./pad";

export function formatHHMMSS(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

export function formatDDMMYYYY(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDDMMYYYYHHMMSS(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);
  return `${formatDDMMYYYY(date)} ${formatHHMMSS(date)}`;
}
