import React from 'react';
import './CustomInput.module.css';

const CustomInput = ({ placeholder, handleChange, value, fieldName, type }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={(e) => handleChange(e, fieldName)}
      value={value}
      name={fieldName}
      type={type}
    />
  );
};

export default CustomInput;
