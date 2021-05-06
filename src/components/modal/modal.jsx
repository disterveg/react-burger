import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, header, onClose } = props;
  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.wrapper}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h2 className='text text_type_main-large mt-3'>{header}</h2>
              <button type="button" className={`${styles.close} mt-3`} onClick={onClose}><CloseIcon /></button>
            </div>
            <div className={styles.body}>{children}</div>
            <div className={styles.footer}></div>
          </div>
        </div>
        <ModalOverlay onClose={onClose} />
      </>
    ), 
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default Modal;