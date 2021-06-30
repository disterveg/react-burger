import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-image.module.css';

const OrderImage = ({url, alt, lastItem}) => {
  let className = lastItem > 0 ? `${styles.over} ${styles.active}` : styles.over
  const count = lastItem > 0 ? ( <span className={className}>+{lastItem}</span> ) : null;
  return (
    <div className={`${styles.wrap}`}>
      {count}
      <img className={`${styles.image}`} src={url} alt={alt} />
    </div>
  );
};

OrderImage.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};

export default OrderImage;

