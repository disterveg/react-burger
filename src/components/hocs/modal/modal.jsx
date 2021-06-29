import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from "react-router-dom";
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

const Modal = (props) => {
  const { children, header, number, onClose } = props;
  const history = useHistory();
  let back;
  if (onClose) {
    back = onClose;
  } else {
    back = e => {
      history.goBack();
    };
  }
  
  useEffect(() => {
    const closeByEsc = (e) => {
      if (e.keyCode === 27) {
        back();
      }
    };

    window.addEventListener('keydown', closeByEsc);
    return () => window.removeEventListener('keydown', closeByEsc);
  }, [back]);

  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.wrapper}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h2 className="text text_type_main-large mt-3">{header}</h2>
              <h2 className={`${styles.number} text text_type_digits-default mt-3`}>{number}</h2>
              <button type="button" className={`${styles.close} mt-3`} onClick={back}>
                <CloseIcon />
              </button>
            </div>
            <div className={styles.body}>{children}</div>
            <div className={styles.footer} />
          </div>
        </div>
        <ModalOverlay onClose={back} />
      </>
    ),
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
