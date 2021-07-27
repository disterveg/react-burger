import React from 'react';
import styles from './order-image.module.css';

const OrderImage = ({url, alt, lastItem}: {url: string, alt: string, lastItem?: number | null}) => {
  let count = null;
  if (lastItem) {
    let className = lastItem > 0 ? `${styles.over} ${styles.active} text_type_digits-default` : styles.over
    count = lastItem > 0 ? ( <span className={className}>+{lastItem}</span> ) : null;
  }
  return (
    <div className={`${styles.wrap}`}>
      {count}
      <img className={`${styles.image}`} src={url} alt={alt} />
    </div>
  );
};

export default OrderImage;

