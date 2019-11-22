import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import VerticallyCentredModal from '../verticallyCentredModal/verticallyCentredModal.component'; 

import CheckoutItem from '../checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'
import Header from '../../components/header/Header.component'
import { clearCart } from '../../redux/cart/cart.actions'

import { selectCartTotal, selectCartItems } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectIsFetching, selectIsSuccessMessage, selectIsErrorMessage } from '../../redux/payment/payment.selectors'
import { clearSuccessMessage } from '../../redux/payment/payment.actions'
import styles from './checkout.module.scss'


const Checkout = ({ cartItems, total, currentUser, history, selectIsFetching, selectIsSuccessMessage, selectIsErrorMessage, clearSuccessMessage, clearCart }) => {
    
    const checkUserLogin = () => {
        console.log(currentUser)
        if (currentUser) {
            return null; 
        } else {
            alert('Please kindly signin first, in order to puchase. Thank you. ')
            return history.push('/signin')
        }
    }

    // const test = () => {
    //     axios({
    //         url: 'http://localhost:5000/payment',
    //         method: 'POST', 
    //         headers: { 'Content-Type': 'application/json' },
    //         data: JSON.stringify({
    //             amount: 100,
    //             token: {
    //                 id: "tok_1Fc14mKOlOHDNnJ1KAXRohsb"
    //             }
    //         })
    //     }).then((res) => {
    //         console.log(res); 
    //     }).catch((err) => {
    //         console.log(err); 
    //     })
    // }

    return (
        
    <div className={styles.initContainer}>
        {checkUserLogin()}
        <Header />
        <VerticallyCentredModal show={selectIsSuccessMessage || selectIsErrorMessage ? true : false }
            onHide={() => { clearSuccessMessage(); clearCart(); return history.push('/');}}
            message={selectIsErrorMessage || selectIsSuccessMessage } />
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
                    <StripeCheckoutButton price={total} cartItems={cartItems} />
                    {/* <button onClick={test}>Test</button> */}
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
    selectIsFetching: selectIsFetching,
    selectIsSuccessMessage: selectIsSuccessMessage,
    selectIsErrorMessage: selectIsErrorMessage 
})

const mapDispatchToProps = (dispatch) => ({
    clearSuccessMessage: () => dispatch(clearSuccessMessage()),
    clearCart: () => dispatch(clearCart())
  })

export default connect(mapStateToProps, mapDispatchToProps)(Checkout); 