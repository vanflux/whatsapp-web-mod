declare module "*.css";

declare interface Window {
  destroyVFMod?(): void;
  vfDivSetAttribute?(...args: any): any;
}

declare var VERSION: string;
declare var WAPI_JS_CODE: string;
