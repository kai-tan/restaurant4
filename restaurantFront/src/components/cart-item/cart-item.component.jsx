import React from 'react'; 

import styles from './cart-item.module.scss'

const CartItem = ({ item: { image, price, name, quantity } }) => (
    <div className={styles.cartItem}>
        <img src={image} alt='item' />
        <div className={styles.itemDetails}>
            <span className={styles.name}>{name}</span>
            <span className={styles.price}>
                {quantity} x RM {parseFloat(Math.round(price * 100) / 100).toFixed(2)}
            </span>
        </div>
    </div>
)

export default CartItem; 