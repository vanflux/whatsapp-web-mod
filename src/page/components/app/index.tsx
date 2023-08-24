import styles from "./styles.module.css";
import React from "react";
import { Windows } from "@page-components/windows";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <div className={styles.container}>
      <ToastContainer theme="dark" newestOnTop autoClose={2000} toastClassName={styles.toastContainer} />
      <Windows />
    </div>
  );
}
