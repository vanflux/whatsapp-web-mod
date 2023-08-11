import React, { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
}

export const Button = ({ children, onClick, fullWidth, style, className }: Props) => {
  return (
    <button style={{ width: fullWidth ? "100%" : undefined, ...style }} onClick={onClick} className={`${styles.container} ${className ?? ""}`}>
      {children}
    </button>
  );
};
