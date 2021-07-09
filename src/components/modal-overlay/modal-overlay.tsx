import React from 'react';
import styles from './modaloverlay.module.css';

type ModalOverlayProps = { 
  onClose?: () => void; 
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const { onClose } = props;
  return (
    <div className={styles.modaloverlay} onClick={onClose} />
  );
};

export default ModalOverlay;
