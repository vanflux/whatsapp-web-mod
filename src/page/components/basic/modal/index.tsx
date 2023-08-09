import React, { ReactNode } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('#app');

const customStyles: ReactModal.Styles = {
  overlay: {
    zIndex: 999999999,
    background: 'transparent'
  },
  content: {
    background: '#00000088',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 40%)',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
};

interface Props {
  open: boolean;
  label?: string;
  children?: ReactNode;
  onRequestClose?: () => void;
}

export const Modal = ({
  open,
  label,
  children,
  onRequestClose,
}: Props) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={label}
      shouldCloseOnOverlayClick
    >
      {children}
    </ReactModal>
  );
};
