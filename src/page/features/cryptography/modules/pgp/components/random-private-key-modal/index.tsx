import { Button } from "@page-components/basic/button";
import { Flex } from "@page-components/basic/flex";
import { Modal } from "@page-components/basic/modal";
import { Text } from "@page-components/basic/text";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  open: boolean;
  onRequestClose?: () => void;
  onConfirm?: () => void;
}

export const PGPRandomPrivateKeyModal = ({ open, onRequestClose, onConfirm }: Props) => {
  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <Flex direction="column" gap={16} className={styles.container}>
        <Flex justify="center">
          <Text size={18} bold>
            Are you sure?
          </Text>
        </Flex>
        <Text size={14}>
          IMPORTANT: If you want to be able to decrypt messages from PGP again you will need to re-send your public key for each person.
        </Text>
        <Flex gap={8}>
          <Button onClick={onRequestClose} fullWidth>
            Close
          </Button>
          <Button onClick={onConfirm} fullWidth>
            I'm sure, regenerate!
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
