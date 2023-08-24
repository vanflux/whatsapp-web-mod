export class StorageService {
  private static prefix = "vf:";

  public static setItem<T>(key: string, value: T) {
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }

  public static getItem<T>(key: string) {
    const item = localStorage.getItem(`${this.prefix}${key}`);
    if (!item) return;
    try {
      return JSON.parse(item) as T;
    } catch {}
  }
}
