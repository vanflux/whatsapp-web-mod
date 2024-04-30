import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { Automation } from "@page-features/automation/config";
import { useAutomationConfig } from "@page-features/automation/hooks/use-automation-config";
import React, { useState } from "react";
import { AutomationModal } from "../automation-modal";
import { AutomationView } from "../automation-view";
import styles from "./styles.module.css";

export function AutomationMenu() {
  const { config, setConfig } = useAutomationConfig();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Automation>();

  return (
    <Flex direction="column" gap={8} className={styles.container}>
      <AutomationModal
        open={open}
        item={editing}
        onSave={(newItem) => {
          const index = config.items.findIndex((item) => item.id === newItem.id);
          if (index >= 0) {
            const items = [...config.items];
            items.splice(index, 1, newItem);
            setConfig({ ...config, items });
          } else {
            const items = [...(config.items ?? []), newItem];
            setConfig({ ...config, items });
          }
          setOpen(false);
        }}
        onRequestClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>Create Automation</Button>
      <Flex direction="column" gap={4}>
        {config.items.map((item, i) => (
          <AutomationView
            key={i}
            item={item}
            onEdit={() => {
              setEditing(item);
              setOpen(true);
            }}
            onDelete={() => {
              const items = [...config.items];
              items.splice(i, 1);
              setConfig({ ...config, items });
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
}
