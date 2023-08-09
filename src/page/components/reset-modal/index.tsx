import React from "react";
import { useThemer } from "../../contexts/themer";
import { DEFAULT_THEMER_CONFIG } from "../../mods/themer";
import { Button } from "../basic/button";
import { Flex } from "../basic/flex";
import { Modal } from "../basic/modal";

interface Props {
  open: boolean;
  onRequestClose?: () => void;
}

export const ResetModal = ({
  open,
  onRequestClose,
}: Props) => {
  const { setConfig } = useThemer();

  const handleReset = () => {
    setConfig(DEFAULT_THEMER_CONFIG);
    onRequestClose?.();
  };

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <Flex direction='column' gap={8}>
        Are you sure?
        <Button onClick={handleReset} fullWidth>Reset</Button>
      </Flex>
    </Modal>
  );
};
