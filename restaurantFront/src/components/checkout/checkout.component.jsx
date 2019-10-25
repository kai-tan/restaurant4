import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import Header from '../../components/header/Header.component'

import { selectCartTotal, selectCartItems } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectIsFetching } from '../../redux/payment/payment.selectors'
import styles from './checkout.module.scss'

const checkout = ({ cartItems, total, currentUser, history, selectIsFetching }) => {
    

    const checkUserLogin = () => {
        console.log(currentUser)
        if (currentUser) {
            return null; 
        } else {
            alert('Please kindly signin first, in order to puchase. Thank you. ')
            return history.push('/signin')
        }
    }

    return (
        
    <div className={styles.initContainer}>
        {checkUserLogin()}
        <Header />
        {
            selectIsFetching === false ? 
            (
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
            ) : 
            (<div className={styles.ldsRing} style={{margin: '100px auto', display: 'block'}}><div></div><div></div><div></div><div></div></div>)
        }
        
    </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser,
    selectIsFetching: selectIsFetching
})

export default connect(mapStateToProps)(checkout); 