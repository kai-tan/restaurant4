import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Homepage from '../src/components/homepage/Homepage.component'
import Ourdishes from './components/ourdishes/Ourdishes.component'
import AboutUs from './components/aboutus/aboutus.component'
import ContactUs from './components/contactus/contactus.component'
import Checkout from './components/checkout/checkout.component'
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component'
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends React.Component {

  
  render() {
      return (
        <Switch>
          <div className="app">
            <Route path="/" exact component={Homepage} />  
            <Route path="/our-dishes" component={Ourdishes} />  
            <Route path="/about-us" component={AboutUs} />  
            <Route path="/contact-us" component={ContactUs} />  
            <Route path='/checkout' component={Checkout} />
            <Route path='/signin' exact render={() => 
              this.props.currentUser ? (
                <Redirect to='/our-dishes' />
              ) : (
                <SignInAndSignUpPage />
              )}/>
          </div>
        </Switch>
      )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(App);
