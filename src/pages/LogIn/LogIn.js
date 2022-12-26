import React, { useState } from 'react';

import styles from './LogIn.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthService from '../../service/AuthService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features';

function LogIn() {
  // React States

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let resultRegistration;

  const register = async (name, email, pass) => {
    await AuthService.registration(name, email, pass)
      .then((res) => (resultRegistration = res.data))
      .catch((error) => alert(error.response.data.message));
  };
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { name, email, pass } = document.forms[0];
    await register(name.value, email.value, pass.value);
    setIsSubmitted(true);
    dispatch(setUser(resultRegistration));
  };

  // JSX code for login form
  const renderForm = (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label>Name </label>
          <input type="text" name="name" required minLength={6} />
        </div>
        <div className={styles.input_container}>
          <label>Email </label>
          <input type="email" name="email" required />
        </div>
        <div className={styles.input_container}>
          <label>Password </label>
          <input type="password" name="pass" required minLength={6} />
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
          <h2>Log In</h2>
        </div>
        {isSubmitted ? navigate('/authoriztion') : renderForm}
      </div>
    </div>
  );
}

export default LogIn;
