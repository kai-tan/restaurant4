import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart, facebookSignInStart, setErrorToNull } from '../../redux/user/user.actions'; 
import { selectIsError } from '../../redux/user/user.selectors'; 

import styles from './sign-in.module.scss';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { emailSignInStart } = this.props
    const { email, password } = this.state
    
    emailSignInStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });

    // this.props.setErrorToNull(); 
  };

  render() {
    const { googleSignInStart, facebookSignInStart, selectIsError } = this.props

    return (
      <div className={styles.signin}>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <Link to="/lost-password"  className={styles.link}><p style={{marginBottom: '20px'}} className={styles.lostPassword}>Lost your password?</p></Link>
          {
            selectIsError && <p style={{color: 'red'}}>{selectIsError}</p>
          }
          <div className={styles.buttons} style={{marginTop: '25px'}}>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
            <CustomButton type='button' onClick={facebookSignInStart} isFacebookSignIn>
              Sign in with Facebook
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectIsError: selectIsError
})

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()), 
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
  facebookSignInStart: () => dispatch(facebookSignInStart()),
  setErrorToNull: () => dispatch(setErrorToNull())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
