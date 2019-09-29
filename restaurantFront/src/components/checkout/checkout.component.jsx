import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import Header from '../../components/header/Header.component'

import { selectCartTotal, selectCartItems } from '../../redux/cart/cart.selectors'
import styles from './checkout.module.scss'

const checkout = ({ cartItems, total }) => (
    
    <div className={styles.initContainer}>
        <Header />
        <div className={styles.checkoutPage}>
            <div className={styles.checkoutHeader}>
                <div className={styles.headerBlock}>
                    <span>Product</span>
                </div>    
                <div className={styles.headerBlock}>
                    <span>Description</span>
                </div>    
                <div className={styles.headerBlock}>
                    <span>Quantity</span>
                </div>    
                <div className={styles.headerBlock}>
                    <span>Price</span>
                </div>    
                <div className={styles.headerBlock}>
                    <span>Remove</span>
                </div>    
            </div>  
            {
                cartItems.map((cartItem) => {
                return  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                })
            }
            <div className={styles.total}>
                <span>TOTAL: ${total}</span>
            </div>
            <StripeCheckoutButton price={total} />
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(checkout); 