import styles from "./styles.module.css";
import React from "react";
import { ConfigsOpenContextProvider } from "@page-contexts/configs-open";
import { ThemerConfigContextProvider } from "@page-contexts/themer-config";
import { Windows } from "@page-components/windows";
import { ThemerThemesContextProvider } from "@page-contexts/themer-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CryptographyConfigContextProvider } from "@page-contexts/cryptography-config";

export function App() {
  return (
    <div className={styles.container}>
      <ConfigsOpenContextProvider>
        <ThemerConfigContextProvider>
          <ThemerThemesContextProvider>
            <CryptographyConfigContextProvider>
              <ToastContainer theme="dark" newestOnTop autoClose={2000} toastClassName={styles.toastContainer} />
              <Windows />
            </CryptographyConfigContextProvider>
          </ThemerThemesContextProvider>
        </ThemerConfigContextProvider>
      </ConfigsOpenContextProvider>
    </div>
  );
}
