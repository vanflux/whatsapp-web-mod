import React from "react";
import { toggleConfigs } from "../../contexts/configs-open";
import { Logo } from "../icons/logo";
import styles from './styles.module.css';

export const ConfigsButton = () => {
  return <div className={styles.container} onClick={toggleConfigs}>
    <Logo />
  </div>
};
