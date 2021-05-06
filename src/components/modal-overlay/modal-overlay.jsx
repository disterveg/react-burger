import React from 'react';
import PropTypes from 'prop-types';
import styles from './modaloverlay.module.css';

const ModalOverlay = (props) => {
  const {onClose} = props;
  return (
    <div className={styles.modaloverlay} onClick={onClose}></div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func
};

export default ModalOverlay;