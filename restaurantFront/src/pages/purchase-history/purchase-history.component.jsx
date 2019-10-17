import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect'
import { selectOrders, selectIsFetching } from '../../redux/orders/orders.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { fetchOrdersStartAsync } from '../../redux/orders/orders.actions'

import Header from '../../components/header/Header.component';
import OrderRow from '../../components/orderrow/OrderRow.component';

import styles from './purchase-history.module.scss';

class PurchaseHistory extends Component {     

    execute = (orders) => {
        const transformObject = Object.values(orders).map((order) => {
            return {
                id: order.id,
                createdAt: order.createdAt,
                products: order.products,
            }
        })

        return transformObject.map((order) => {
            return <OrderRow key={order.id} id={order.id} createdAt={order.createdAt} products={order.products} /> 
        })
    }   

    componentDidMount() {
        if (this.props.selectCurrentUser) {
            const currentUser = this.props.selectCurrentUser
            console.log(this.props);
            this.props.fetchOrdersStartAsync(currentUser.id); 
        }
      
    }

    render() {
        const orders = this.props.selectOrders ? this.props.selectOrders : '';
        return (
            <div className={styles.initial}>
                <Header /> 
                <div className={styles.purchaseHistory}>
                    Purchase History
                    <br />
                    <div className="row">
                        <div class="col-sm-2">
                        Order ID 
                        </div>
                        <div class="col-sm-2">
                        CreatedAt
                        </div>
                        <div class="col-sm-8">
                        Products
                        </div>
                    </div>
                    {this.execute(orders)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    selectOrders: selectOrders,
    selectIsFetching: selectIsFetching,
    selectCurrentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    fetchOrdersStartAsync: (userId) => dispatch(fetchOrdersStartAsync(userId))
})
  


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseHistory); 