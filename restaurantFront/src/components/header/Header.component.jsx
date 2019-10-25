import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink, withRouter } from 'react-router-dom'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser, selectCurrentRole } from '../../redux/user/user.selectors';
import { signOutStart, CheckUserRoleAsync, unsubcribeAuth } from '../../redux/user/user.actions'
import logo from '../../assets/images/logo.png'
import styles from './Header.module.scss'; 

const Header = ({ currentUser, hidden, signOutStart, selectCurrentRole, CheckUserRoleAsync, unsubcribeAuth, match }) => {

    useEffect(() => {
        CheckUserRoleAsync(); 

        return unsubcribeAuth();
    }, []);    
      
    console.log(selectCurrentRole); 
    console.log(match);

    return (
        <Navbar bg="light" expand="lg" className={styles.navbarMainContainer}>
            <Navbar.Brand href="#home">
                <div className="logo-container">
                    <Link to='/'><img src={logo} style={{width:150, height: 150}} alt="Our logo" /></Link>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/our-dishes" active={ match.path === "/our-dishes" ? true : '' } >
                        Our Dishes
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about-us" active={ match.path === "/about-us" ? true : '' } >About Us</Nav.Link>
                    <Nav.Link as={Link} to="/contact-us" active={ match.path === "/contact-us" ? true : '' }>Contact Us</Nav.Link>
                    {
                        selectCurrentRole === 'moderator' ? (
                            <Nav.Link as={Link} to="/manage-orders" active={ match.path === "/manage-orders" ? true : '' }>Manage Orders</Nav.Link>
                        ) : (null)
                    }
                    {
                        currentUser ? (
                            <Nav.Link as={Link} to="/purchase-history" active={ match.path === "/purchase-history" ? true : '' } >Purchase History</Nav.Link>
                        ) : (
                            null 
                        )
                    }
                    {currentUser ? (
                        <Nav.Link as={Link} to="/signin" onClick={signOutStart}>Sign Out</Nav.Link>
                        // <li onClick={signOutStart}><NavLink to="/signin" activeClassName="resNavLinkActive">Sign Out</NavLink></li>
                    ) : (
                        <Nav.Link as={Link} to="/signin" active={ match.path === "/signin" ? true : '' } >Sign In</Nav.Link>
                    )}
                    <CartIcon />
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                {
                    hidden ? null : <CartDropdown />
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
    selectCurrentRole: selectCurrentRole
  })
  
  const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart()),
    CheckUserRoleAsync: () => dispatch(CheckUserRoleAsync()),
    unsubcribeAuth: () => dispatch(unsubcribeAuth())
  })
  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)); 