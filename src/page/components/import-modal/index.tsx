import React, { useEffect, useState } from "react";
import { useThemer } from "../../contexts/themer";
import { ThemerConfig } from "../../mods/themer";
import { Button } from "../basic/button";
import { Flex } from "../basic/flex";
import { Modal } from "../basic/modal";
import { TextInput } from "../basic/text-input";

interface Props {
  open: boolean;
  onRequestClose?: () => void;
}

export const ImportModal = ({ open, onRequestClose }: Props) => {
  const [value, setValue] = useState<string>();
  const { setConfig } = useThemer();

  useEffect(() => {
    if (!open) setValue(undefined);
  }, [open]);

  const handleImport = () => {
    if (!value) return;
    try {
      const config: ThemerConfig = JSON.parse(atob(value));
      setConfig(config);
      onRequestClose?.();
    } catch {
      alert("Invalid data!");
    }
  };

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <Flex direction="column" gap={8}>
        <TextInput
          placeholder="Data here..."
          value={value}
          fullWidth
          onChange={setValue}
        />
        <Button onClick={handleImport} fullWidth>
          Import
        </Button>
      </Flex>
    </Modal>
  );
};
