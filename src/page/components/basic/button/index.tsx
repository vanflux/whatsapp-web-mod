import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  onClick,
  fullWidth,
}: Props) => {
  return (
    <button style={{ width: fullWidth ? '100%' : undefined }} onClick={onClick} className={styles.container}>
      {children}
    </button>
  )
};
