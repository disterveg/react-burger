import React from 'react';
import styles from './loader.module.css';

const Loader = props => {
  return (
    <div className={styles.center}>
      <div className={styles.loader}>
        <div />
        <div className={styles.first} />
        <div className={styles.second} />
        <div className={styles.third} />
      </div>
    </div>
  );
};

export default Loader;