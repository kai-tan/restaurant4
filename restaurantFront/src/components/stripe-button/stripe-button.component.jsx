import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'; 
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { clearCart } from '../../redux/cart/cart.actions'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { paymentStart, paymentSuccess, paymentFailure } from '../../redux/payment/payment.actions'

const StripeCheckoutButton = ({ price, cartItems, currentUser, history, clearCart, paymentStart, paymentSuccess, paymentFailure }) => {
    const priceForStripe = price * 100 
    const publishableKey = 'pk_test_ucXaV8Mq4mZAZBBut0t9MiMX00TlYsFBPJ'

    console.log(cartItems);
    
    console.log(history);
    const onToken = token => {

        const order = {
            products: cartItems,
            userId: currentUser.id, 
            username: currentUser.displayName
        }   

        paymentStart();

        axios({
            url: 'payment',
            method: 'post', 
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            console.log(response); 
            const token = localStorage.getItem('token');
            console.log(token);
            axios({ 
                method: 'post', 
                url: 'http://localhost:5001/restaurant-45eb0/europe-west1/api/order', 
                data: JSON.stringify(order),
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    console.log(res.data)
                    paymentSuccess()
                    clearCart();
                    return history.push('/our-dishes');
                })
                .catch((err) => {
                    paymentFailure();
                    console.log(err.response)
                })

        }).catch( error => {
            paymentFailure();
            console.log('Payment error: ', error);
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card'
            )
        })
    }


    return (
        <StripeCheckout
            label='Pay Now'
            name='Restaurant'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart()),
    paymentFailure: () => dispatch(paymentFailure()),
    paymentStart: () => dispatch(paymentStart()),
    paymentSuccess: () => dispatch(paymentSuccess())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton));






