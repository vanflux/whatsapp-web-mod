import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { useDateAlertConfig } from "@page-features/date-alert/hooks/use-date-alert-config";
import React, { useState } from "react";
import { CreateDateAlertModal } from "../create-date-alert-modal";
import { DateAlertItemView } from "../date-alert-item-view";
import styles from "./styles.module.css";

export function DateAlertMenu() {
  const { config, setConfig } = useDateAlertConfig();
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" gap={8} className={styles.container}>
      <CreateDateAlertModal
        open={open}
        onCreate={(item) => {
          console.log("item", item);
          setConfig({ ...config, items: [...(config.items ?? []), item] });
        }}
        onRequestClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>Create Date Alert</Button>
      <Flex direction="column" gap={4}>
        {config.items.map((item, i) => (
          <DateAlertItemView key={i} item={item} />
        ))}
      </Flex>
    </Flex>
  );
}
