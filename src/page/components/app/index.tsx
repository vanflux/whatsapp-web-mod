import styles from "./styles.module.css";
import React from "react";
import { ThemerContextProvider } from "../../contexts/themer";
import { ConfigsOpenContextProvider } from "../../contexts/configs-open";
import { Windows } from "../windows";

export function App() {
  return (
    <div className={styles.container}>
      <ConfigsOpenContextProvider>
        <ThemerContextProvider>
          <Windows />
        </ThemerContextProvider>
      </ConfigsOpenContextProvider>
    </div>
  );
}
