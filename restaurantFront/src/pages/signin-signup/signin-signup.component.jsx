import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import Header from '../../components/header/Header.component';

import styles from './signin-signup.module.scss';

const SignInAndSignUpPage = () => (
  <div className={styles.initial}>
    <Header />
    <div className={styles.signInAndSignUp}>
      <SignIn />
      <SignUp />
    </div>
  </div>
);

export default SignInAndSignUpPage;
