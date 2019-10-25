import React from 'react'; 
import { connect } from 'react-redux'; 
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'; 
import { firestoreConnect } from 'react-redux-firebase'

import styles from './CompletedOrders.module.scss'; 
import OrderRow from '../../components/orderrow/OrderRow.component';
import { selectIsFetching, selectFirebaseCompletedOrders } from '../../redux/orders/orders.selectors'
import { fetchAdminPendingOrdersAsync } from '../../redux/orders/orders.actions'

const CompletedOrders = ({ selectIsFetching, selectFirebaseCompletedOrders}) => {
    

    const execute = (orders) => {
        console.log(orders);
        const transformObject = Object.values(orders).map((order) => {
            return {
                id: order.id,
                createdAt: order.createdAt,
                products: order.products,
                status: order.status
            }
        })

        console.log(transformObject);

        return transformObject.map((order) => {
            return <OrderRow key={order.id} id={order.id} createdAt={order.createdAt} products={order.products} status={order.status} /> 
        })
    }   
    
    console.log(selectFirebaseCompletedOrders);

    const pendingOrders = selectFirebaseCompletedOrders ? selectFirebaseCompletedOrders : '';
    console.log(pendingOrders);


    return (
        <div className={styles.mainContent}>
            <div className={styles.mainTab}><p>ORDERS</p></div>
            <div className={styles.mainTab}>
                
                { selectIsFetching === false ? 
                (<div className={styles.purchaseHistory}>
                    <div className={`row ${styles.mainHeader}`}>
                        <div className={`col-sm-2 ${styles.itemHeader}`}>
                        Order ID 
                        </div>
                        <div className={`col-sm-2 ${styles.itemHeader}`}>
                        CreatedAt
                        </div>
                        <div className={`col-sm-8 ${styles.itemHeader}`}>
                        Products
                        </div>
                    </div>
                    {execute(pendingOrders)}
                </div>) : (<div className={styles.ldsRing} style={{margin: '100px auto', display: 'block'}}><div></div><div></div><div></div><div></div></div>)
                }
            </div>
        </div> 
    )
}


const mapStateToProps = createStructuredSelector({
    selectIsFetching: selectIsFetching,
    selectFirebaseCompletedOrders: selectFirebaseCompletedOrders
})

const mapDispatchToProps = dispatch => ({
    fetchAdminPendingOrdersAsync: () => dispatch(fetchAdminPendingOrdersAsync())
})


export default compose(
    firestoreConnect(() => ['orders']), // or { collection: 'todos' }
    connect(mapStateToProps, mapDispatchToProps)
   )(CompletedOrders)

