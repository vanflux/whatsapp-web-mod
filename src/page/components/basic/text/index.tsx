import React, { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  size?: number;
  bold?: boolean;
  children?: ReactNode;
}

export const Text = ({ size, bold, children }: Props) => {
  return (
    <div style={{ fontSize: size, fontWeight: bold ? "bold" : undefined }} className={styles.container}>
      {children}
    </div>
  );
};
