import React from 'react';
import styles from './modaloverlay.module.css';

const ModalOverlay = (props) => {
  const {onClose} = props;
  return (
    <div className={styles.modaloverlay} onClick={onClose}></div>
  );
}

export default ModalOverlay;