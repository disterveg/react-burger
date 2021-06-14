import React from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './show-error.module.css';

const ShowError = ({ textError }) => (
  <div className={styles.center}>
    <p className="text text_type_main-medium">
      <InfoIcon type="error" />
      {' '}
      {textError}
    </p>
  </div>
);

ShowError.propTypes = {
  textError: PropTypes.string.isRequired,
};

export default ShowError;
