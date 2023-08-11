import { DEFAULT_THEMER_CONFIG, ThemerConfig } from "./config";

export interface Theme {
  name: string;
  config: ThemerConfig;
}

export const serializeThemerTheme = (theme: Theme) => {
  return btoa(JSON.stringify(theme));
};

export const deserializeThemerTheme = (value: string) => {
  return JSON.parse(atob(value)) as Theme;
};

export const DEFAULT_THEMES: Theme[] = [
  {
    name: "Default",
    config: DEFAULT_THEMER_CONFIG,
  },
  // Fire
  deserializeThemerTheme(
    "eyJuYW1lIjoiRmlyZSIsImNvbmZpZyI6eyJiYWNrZ3JvdW5kIjoibGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2IoMTQyLCAxNCwgMCksIHJnYigzMSwgMjgsIDI0KSkiLCJibHVyQ29udGFjdHMiOmZhbHNlLCJyb3VuZGVkQm9yZGVycyI6dHJ1ZSwidHJhbnNwYXJlbmN5IjowLjI3LCJ1aUNvbG9yIjoiNDUsIDIzLCA5Iiwib3V0Z29pbmdNZXNzYWdlQmFja2dyb3VuZCI6IiM4MTdjMzMiLCJpbmNvbWluZ01lc3NhZ2VCYWNrZ3JvdW5kIjoiIzkyM2IzYiIsInN5c3RlbU1lc3NhZ2VCYWNrZ3JvdW5kIjoiIzk0MjQyNCIsIm1lc3NhZ2VDb2xvciI6IiNmZmZmZmYiLCJxdW90ZWRNZXNzYWdlQ29sb3IiOiIjZTZlNmU2In19",
  ),
];
