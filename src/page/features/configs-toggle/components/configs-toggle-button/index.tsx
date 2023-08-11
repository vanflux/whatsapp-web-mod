import { Icon } from "@page-components/basic/icon";
import { toggleConfigs } from "@page-contexts/configs-open";
import React from "react";
import styles from "./styles.module.css";

export const ConfigsToggleButton = () => {
  return (
    <div className={styles.container} onClick={toggleConfigs}>
      <Icon type="logo" size={32} />
    </div>
  );
};
