import React from 'react';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './show-error.module.css';

const ShowError = ({textError}) => {
  return (
    <div className={styles.center}>
      <p className="text text_type_main-medium">
        <InfoIcon type="error" /> {textError}
      </p>
    </div>
  );
};

export default ShowError;