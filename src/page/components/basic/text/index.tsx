import React, { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const Text = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};
