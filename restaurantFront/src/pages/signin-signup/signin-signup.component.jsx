import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsFetching } from '../../redux/user/user.selectors'

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import Header from '../../components/header/Header.component';

import styles from './signin-signup.module.scss';

const SignInAndSignUpPage = ({ isFetching }) => {
  
  console.log(isFetching);
  return (
    <div className={styles.initial}>
      <Header />
        {
          isFetching === false ? (<div className={styles.signInAndSignUp}><SignIn /><SignUp /></div>) : null
        }
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching
})

export default connect(mapStateToProps)(SignInAndSignUpPage);
