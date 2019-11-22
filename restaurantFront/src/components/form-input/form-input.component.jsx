import React from 'react';

import styles from './form-input.module.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className={styles.group} style={{marginBottom: '0px'}}>
    <input className={styles.formInput} style={{marginBottom: '8px'}} onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? styles.shrink : ''
        } ${styles.formInputLabel}`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
