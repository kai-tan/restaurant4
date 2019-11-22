import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect'
import { selectOrders, selectIsFetching } from '../../redux/orders/orders.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { fetchOrdersStartAsync } from '../../redux/orders/orders.actions'

import Header from '../../components/header/Header.component';
import OrderRow from '../../components/orderrow/OrderRow.component';

import styles from './purchase-history.module.scss';

class PurchaseHistory extends Component {     

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    execute = (orders) => {
        const transformObject = Object.values(orders).map((order) => {
            return {
                id: order.id,
                createdAt: order.createdAt,
                products: order.products,
                status: order.status
            }
        })

        return transformObject.map((order) => {
            return <OrderRow key={order.id} id={order.id} createdAt={order.createdAt} products={order.products} status={order.status} /> 
        })
    }   

    componentDidMount() {

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        if (this.props.selectCurrentUser) {
            const currentUser = this.props.selectCurrentUser
            this.props.fetchOrdersStartAsync(currentUser.id); 
        }
      
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    render() {
        
        
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        const orders = this.props.selectOrders ? this.props.selectOrders : '';
        console.log(orders);
        return (
            <div className={styles.initial}>
                <Header /> 
                {this.state.width < 992 ? <h2 className={styles.header}>Purchase History</h2> : ''}
                { this.props.selectIsFetching === false ? 
                (<div className={styles.purchaseHistory}>
                    <div className={`row ${styles.mainHeader}`}>
                        <div className={`col-sm-2 ${styles.itemHeader}`}>
                        Order ID 
                        </div>
                        <div className={`col-sm-2 ${styles.itemHeader}`}>
                        Created At
                        </div>
                        <div className={`col-sm-8 ${styles.itemHeader}`}>
                        Products
                        </div>
                    </div>
                    { orders ? ( !isEmpty(orders) ? this.execute(orders) : <p className={styles.emptyPurchaseHistory}>Your purchase history is empty now. Visit <Link to="/">shop page</Link> to add some items.</p> ) : <p className={styles.emptyPurchaseHistory}>Your purchase history is empty now. Visit <Link to="/">shop page</Link> to add some items.</p>}
                </div>) : (<div className={styles.ldsRing} style={{margin: '100px auto', display: 'block'}}><div></div><div></div><div></div><div></div></div>)
                }
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