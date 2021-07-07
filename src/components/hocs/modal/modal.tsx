import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from "react-router-dom";
import styles from './modal.module.css';

const modalRoot: Element | null = document.getElementById('react-modals');

type ModalProps = { 
  children: React.ReactNode; 
  header?: string; 
  onClose?: () => void; 
};

const Modal: React.FC<ModalProps> = (props) => {
  const { children, header, onClose } = props;
  const history = useHistory();
  let back: () => void;
  if (onClose) {
    back = onClose;
  } else {
    back = (): void => {
      history.goBack();
    };
  }
  
  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      back();
    };

    window.addEventListener('keydown', closeByEscape);
    return () => window.removeEventListener('keydown', closeByEscape);
  }, [back]);

  return modalRoot && ReactDOM.createPortal(
    (
      <>
        <div className={styles.wrapper}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h2 className="text text_type_main-large mt-3">{header}</h2>
              <button type="button" className={`${styles.close} mt-3`} onClick={back}>
                <CloseIcon type='primary' />
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

export default Modal;
