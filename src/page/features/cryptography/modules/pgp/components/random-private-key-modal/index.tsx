import { Button } from '@page-components/basic/button';
import { Modal } from '@page-components/basic/modal';
import { Text } from '@page-components/basic/text';
import React from 'react';

interface Props {
  open: boolean;
  onRequestClose?: () => void;
  onConfirm?: () => void;
}

export const PGPRandomPrivateKeyModal = ({ open, onRequestClose, onConfirm }: Props) => {
  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <div className="flex flex-col gap-4 max-w-[400px]">
        <div className="flex justify-center">
          <Text size={18} bold>
            Are you sure?
          </Text>
        </div>
        <Text size={14}>
          IMPORTANT: If you want to be able to decrypt messages from PGP again you will need to re-send your public key for each person.
        </Text>
        <div className="flex gap-2">
          <Button onClick={onRequestClose} fullWidth>
            Close
          </Button>
          <Button onClick={onConfirm} fullWidth>
            I'm sure, regenerate!
          </Button>
        </div>
      </div>
    </Modal>
  );
};
