import React, { Component } from 'react'
import Header from '../../components/header/Header.component'
import { connect } from 'react-redux'; 
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'; 
import { firestoreConnect } from 'react-redux-firebase'

import { selectPendingOrders, selectIsFetching, selectFirebasePendingOrders } from '../../redux/orders/orders.selectors'
import { fetchAdminPendingOrdersAsync } from '../../redux/orders/orders.actions'
import { selectSingleEditScreenId } from '../../redux/shop/shop.selectors'
import OrderRow from '../orderrow/OrderRow.component';
import AddAdminInput from '../addAdminInput/addAdminInput.component'; 
import PendingOrders from '../pendingorders/PendingOrders.component'; 
import CompletedOrders from '../completedorders/CompletedOrders.component'; 
import EditAddProduct from '../editAddProduct/editAddProduct.component'; 
import SingleEditProduct from '../../pages/single-edit-product/single-edit-product.component'
import CreateSingleProduct from '../../pages/create-product/create-product.component'

import styles from './adminOrder.module.scss';

class adminOrder extends Component {

    state = {
        orderStatusType: ['Pending', 'Completed'],
        rightMainContent: <PendingOrders />
    }
    
    // componentDidMount() {
    //     this.props.fetchAdminPendingOrdersAsync(); 
    // }


    execute = (orders) => {
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


    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.selectSingleEditScreenId != this.props.selectSingleEditScreenId) {
    //         console.log('ComponentDidUpdate runs');
    //         let addEditPage = document.getElementById('addEditPage'); 
    //         addEditPage.click(); 
    //     }
    // }

    handleClick = (status, rightSideContent) => {
        console.log(status);

        switch(status) {
            case 'pendingorders':
                this.setState({ rightMainContent: <PendingOrders /> })
                break; 
            case 'completedorders':
                this.setState({ rightMainContent: <CompletedOrders /> })
                break; 
            case 'addadmin':
                this.setState({ rightMainContent: <AddAdminInput /> })
                break; 
            case 'editAddProduct':
                this.setState({ rightMainContent: rightSideContent })
                break; 
            default: 
                return;
        }
    }

    goToPreviousPage = () => {
        this.setState({ rightMainContent: <EditAddProduct goToCreatePage={this.goToCreatePage} /> })
    }

    goToCreatePage = () => {
        this.setState({ rightMainContent: <CreateSingleProduct goToPreviousPage={this.goToPreviousPage} /> })
    }
    

    render() {
        let rightSideContent = <EditAddProduct goToCreatePage={this.goToCreatePage} />
        console.log(this.props.selectSingleEditScreenId); 
        if (this.props.selectSingleEditScreenId) {
            rightSideContent = <SingleEditProduct id={this.props.selectSingleEditScreenId}/>

        } 
        console.log(this.props.selectFirebasePendingOrders);

        const pendingOrders = this.props.selectFirebasePendingOrders ? this.props.selectFirebasePendingOrders : '';
        console.log(pendingOrders);
        return (
            <div className={styles.initial}>
                <Header /> 
                <div className={styles.main}>
                    <div className={styles.sidebar}>
                        <div className={styles.tab} onClick={() => this.handleClick('pendingorders')}>Pending Orders</div>
                        <div className={styles.tab} onClick={() => this.handleClick('completedorders')}>Completed Orders</div> 
                        <div className={styles.tab} onClick={() => this.handleClick('addadmin')}>Add Admin</div> 
                        <div className={styles.tab} id='addEditPage' onClick={() => this.handleClick('editAddProduct', rightSideContent)}>Edit/add Product</div> 
                    </div>
                    {this.props.selectSingleEditScreenId ? <SingleEditProduct id={this.props.selectSingleEditScreenId} /> : this.state.rightMainContent }
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    selectPendingOrders: selectPendingOrders,
    selectIsFetching: selectIsFetching,
    selectFirebasePendingOrders: selectFirebasePendingOrders,
    selectSingleEditScreenId: selectSingleEditScreenId
})

const mapDispatchToProps = dispatch => ({
    fetchAdminPendingOrdersAsync: () => dispatch(fetchAdminPendingOrdersAsync())
})


export default compose(
    firestoreConnect(() => ['orders', 'food']), // or { collection: 'todos' }
    connect(mapStateToProps, mapDispatchToProps)
   )(adminOrder)


// export default connect(mapStateToProps, mapDispatchToProps)(adminOrder);