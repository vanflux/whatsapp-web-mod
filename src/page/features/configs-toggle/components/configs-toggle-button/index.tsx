import { Icon } from "@page-components/basic/icon";
import { useConfigsToggle } from "@page-features/configs-toggle/use-configs-toggle";
import React from "react";
import styles from "./styles.module.css";

export const ConfigsToggleButton = () => {
  const { toggle } = useConfigsToggle();

  return (
    <div className={styles.container} onClick={toggle}>
      <Icon type="logo" size={32} />
    </div>
  );
};
