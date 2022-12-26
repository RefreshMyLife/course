import React, { useState } from 'react';

import styles from './Sign.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthService from './../../service/AuthService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features';
function SignIn() {
  const dispatch = useDispatch();
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const errors = {
    email: 'invalid email',
    pass: 'invalid password',
  };
  let result;

  const loginUser = async (email, pass) => {
    await AuthService.login(email, pass).then((obj) => (result = obj.data));
  };

  const handleSubmit = async (event) => {
    //Prevent page reload

    event.preventDefault();

    var { email, pass } = document.forms[0];
    await loginUser(email.value, pass.value);
    dispatch(setUser(result));
    localStorage.setItem('email', result.email);
    localStorage.setItem('id', result.id);
    localStorage.setItem('password', result.password);
    // Compare user info
    if (result) {
      if (result.email !== email.value) {
        // Invalid password
        setErrorMessages({ name: 'email', message: errors.email });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: 'pass', message: errors.pass });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && <div className={styles.error}>{errorMessages.message}</div>;

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Email </label>
          <input type="email" name="email" required />
          {renderErrorMessage('email')}
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage('pass')}
        </div>
        <div className={styles.button_container}>
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className={styles.app}>
      <div className={styles.login_form}>
        <div className="title">
          <h2>Sign In</h2>
        </div>
        {isSubmitted ? navigate('/notes', { state: 'notes' }) : renderForm}
      </div>
    </div>
  );
}

export default SignIn;
