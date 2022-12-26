import React from 'react';
import styles from './CustomButton.module.css';

const CustomButton = ({ label, type, disabled = false, handleClick, data }) => {
  return (
    <button
      className={styles.custom_button}
      onClick={() => handleClick(data)}
      type={type}
      disabled={disabled}>
      {label}
    </button>
  );
};

export default CustomButton;
