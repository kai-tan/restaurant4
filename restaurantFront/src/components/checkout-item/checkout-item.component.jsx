import React from 'react';
import { connect } from 'react-redux'

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'

import styles from './checkout-item.module.scss'

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    
    const { name, image, price, quantity } = cartItem
    return (<div className={styles.checkoutItem}>
        <div className={styles.imageContainer}>
            <img src={image} alt='item' />
        </div>
        <span className={styles.name}>{name}</span>
        <span className={styles.quantity}>
            <div className={styles.arrow} onClick={() => removeItem(cartItem)}>&#10094;</div>
            <span className={styles.value}>{quantity}</span>
            <div className={styles.arrow} onClick={() => addItem(cartItem)}>&#10095;</div>
        </span>
        <span className={styles.price}>{price}</span>
        <div className={styles.removeButton} onClick={() => clearItem(cartItem)}>&#10005;</div>
    </div>)
}


const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem); 