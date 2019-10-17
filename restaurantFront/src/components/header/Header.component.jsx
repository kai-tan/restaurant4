import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions'

import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import styles from './Header.module.scss'; 

const Header = ({ currentUser, hidden, signOutStart }) => {

    return (
        <header className={`${styles.headerclass} `}>
            <div className="logo-container">
                <Link to='/'><img src={logo} style={{width:150, height: 150}} alt="Our logo" /></Link>
            </div>
            <nav className={styles.navContainer}>

                <ul>
                    <li><NavLink to="/our-dishes" activeClassName="resNavLinkActive">Our Dishes</NavLink></li>
                    <li><NavLink to="/about-us" activeClassName="resNavLinkActive">About Us</NavLink></li>
                    <li><NavLink to="/contact-us" activeClassName="resNavLinkActive">Contact Us</NavLink></li>
                    {
                        currentUser ? (
                            <li><NavLink to="/purchase-history" activeClassName="resNavLinkActive">Purchase History</NavLink></li>
                        ) : (
                            null 
                        )
                    }
                    {currentUser ? (
                        <li onClick={signOutStart}><NavLink to="/signin" activeClassName="resNavLinkActive">Sign Out</NavLink></li>
                    ) : (
                        <li><NavLink to="/signin" activeClassName="resNavLinkActive">Sign In</NavLink></li>
                    )}
                    <CartIcon />
                </ul>
                {
                    hidden ? null : <CartDropdown />
                }
            </nav>
        </header>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
  })
  
  const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
  })
  

export default connect(mapStateToProps, mapDispatchToProps)(Header); 