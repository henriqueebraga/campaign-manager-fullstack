import React from 'react';
import styles from './loadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
