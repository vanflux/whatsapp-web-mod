import styles from "./styles.module.css";
import React from "react";
import { ConfigsOpenContextProvider } from "@page-contexts/configs-open";
import { ThemerConfigContextProvider } from "@page-contexts/themer-config";
import { Windows } from "@page-components/windows";
import { ThemerThemesContextProvider } from "@page-contexts/themer-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <div className={styles.container}>
      <ConfigsOpenContextProvider>
        <ThemerConfigContextProvider>
          <ThemerThemesContextProvider>
            <ToastContainer theme="dark" newestOnTop autoClose={2000} toastClassName={styles.toastContainer} />
            <Windows />
          </ThemerThemesContextProvider>
        </ThemerConfigContextProvider>
      </ConfigsOpenContextProvider>
    </div>
  );
}
