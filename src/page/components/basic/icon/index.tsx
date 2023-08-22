import React from "react";
import { ConfigIcon } from "./icons/config";
import { ConfirmIcon } from "./icons/confirm";
import { DeleteIcon } from "./icons/delete";
import { ExportIcon } from "./icons/export";
import { EyeIcon } from "./icons/eye";
import { EyeSlashIcon } from "./icons/eye-slash";
import { ImportIcon } from "./icons/import";
import { LockIcon } from "./icons/lock";
import { LogoIcon } from "./icons/logo";
import { PaintIcon } from "./icons/paint";
import { PaintRollerIcon } from "./icons/paint-roller";
import { SaveIcon } from "./icons/save";

interface Props {
  type: IconType;
  size: number;
  color?: string;
  onClick?: () => void;
}

const icons = {
  config: ConfigIcon,
  confirm: ConfirmIcon,
  delete: DeleteIcon,
  export: ExportIcon,
  import: ImportIcon,
  logo: LogoIcon,
  paintRoller: PaintRollerIcon,
  paint: PaintIcon,
  save: SaveIcon,
  lock: LockIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
} as const;

export type IconType = keyof typeof icons;

export const Icon = ({ type, size, color, onClick }: Props) => {
  const Component = icons[type];
  return (
    <div onClick={onClick} style={{ color, width: size, height: size, minWidth: size, minHeight: size, maxWidth: size, maxHeight: size }}>
      <Component />
    </div>
  );
};
