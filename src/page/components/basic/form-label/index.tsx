import React, { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const FormLabel = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};
