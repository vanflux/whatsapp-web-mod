declare module "*.css";

declare interface Window {
  destroyVFMod?(): void;
  vfDivSetAttribute?(...args: any): any;
}
