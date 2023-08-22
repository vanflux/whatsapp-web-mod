import React, { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
  selected?: boolean;
}

export const Button = ({ children, onClick, fullWidth, style, className, selected }: Props) => {
  return (
    <button
      style={{ width: fullWidth ? "100%" : undefined, border: selected ? "1px solid white" : "", ...style }}
      onClick={onClick}
      className={`${styles.container} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};
