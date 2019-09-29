import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import styles from './cart-dropdown.module.scss'

const CartDropdown = ({ cartItems, ...otherprops }) => {
    
    const { history, dispatch } = otherprops
    return (<div className={styles.cartDropdown}>
        <div className={styles.cartItems}>
            {

                cartItems.length ? (
                cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} item={cartItem} />
                })) :
                (<span className={styles.emptyMessage}>Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden());
        }} checkoutButton>GO TO CHECKOUT</CustomButton>
    </div>)
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})


export default withRouter(connect(mapStateToProps)(CartDropdown))