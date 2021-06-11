import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-image.module.css';

const OrderImage = ({url}) => {
  return (
    <div className={`${styles.wrap}`}>
      <img className={`${styles.image}`} src={url} />
    </div>
  );
};

OrderImage.propTypes = {
  url: PropTypes.string.isRequired,
};

export default OrderImage;

