import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { createStructuredSelector } from 'reselect'

import { SetOrderStatusAsync, AdminDeleteOrderAsync } from '../../redux/orders/orders.actions'
import { selectIsFetching } from '../../redux/orders/orders.selectors'
import { selectUserDetails } from '../../redux/user/user.selectors'
import InlineSpinner from '../inlineSpinner/inlineSpinner.component';
import styles from './OrderRow.module.scss'

const OrderRow = ({ id, createdAt, products, status, SetOrderStatusAsync, AdminDeleteOrderAsync, selectIsFetching, selectUserDetails }) => {

    let transformedDate = moment(createdAt).fromNow()

    const [InitProducts, setInitProducts] = useState([]);
    const [OrderStatus, setOrderStatus] = useState(status);
    const [ScreenSize, setScreenSize] = useState({ width: 0, height: 0})

    const iProducts = products ? products : InitProducts;

    useEffect(() => {
        updateWindowDimensions();
        window.addEventListener('resize', updateWindowDimensions);

        return () => window.removeEventListener('resize', updateWindowDimensions);
    }, []);

    
    const updateWindowDimensions = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }

    const calculateTotalPrice = (iProducts) => {
        const totalPrice = iProducts.reduce((acc, product) => {
            
            const sum = product.quantity * product.price

            return acc + sum; 
        }, 0)

        return totalPrice
    }

    const displayProducts = (InitProducts) => {
        const displayProduct = products ? products : InitProducts;

        return displayProduct.map((product) => {
            return (
                <div className="card" key={product.id} style={{'flex': '0 1 200px'}}>
                    <img src={product.image} className="card-img-top" style={{'height': '200px'}}/>
                    <div className="card-body">
                        <p className="card-text">Title: {product.name}</p>
                        <p className="card-text">Unit Price: RM {product.price}</p>
                        <p className="card-text">Qty: {product.quantity}</p>
                    </div>
                </div>
            )
        })
    }


    const handleChange = (e) => {
        const orderStatusType = e.target.value; 
        console.log(orderStatusType);
        setOrderStatus(orderStatusType, () => {
            console.log(OrderStatus)
        });
        SetOrderStatusAsync(id, orderStatusType);
    }

    const handleCancelChange = (e, id) => {
        console.log(e);
        AdminDeleteOrderAsync(id); 
        
    }

    return (
            <div className={`row ${styles.row}`} style={{flexDirection: 'column!important', borderBottom: 'dotted 1px #000', marginBottom: '10px'}}>
                <div className={styles.rowOneContainer}>
                    <div className={`col-sm-2 ${styles.firstColumn}`} style={{overflowWrap: 'break-word'}}>
                        <div className={styles.id}>{`${ScreenSize.width < 576 ? 'Order ID: ' : ''}${id}`}</div>
                        
                    </div>
                    <div className={`col-sm-2 ${styles.secondColumn}`}>
                    {`${ScreenSize.width < 576 ? 'Created At : ' : ''}${transformedDate}`}
                    </div>
                    <div className={`col-sm d-flex ${styles.displayProduct}`}>
                        {displayProducts(InitProducts)}
                        {   
                            selectIsFetching === false ? 
                            ( selectUserDetails === 'moderator' ? (<div className={styles.FontTimesContainer} id={id} onClick={(e) => {
                            

                                return handleCancelChange(e, id)}}>

                                <div style={{position: 'sticky'}}>
                                <FontAwesomeIcon icon={faTimes} size="lg" color="white" />
                                </div>
                            </div>) : null ) :  
                            <InlineSpinner />
                        }
                    </div>
                </div>
                <div className={styles.rowSecondContainer}> 
                    <div className={styles.totalPrice}>Total: RM {calculateTotalPrice(iProducts)}</div>
                    {
                        selectUserDetails === 'moderator' ? 
                        (<select name="orderStatus" value={OrderStatus} onChange={handleChange}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>) : null
                    }
                    {
                        selectUserDetails === 'user' ?  
                        (<div className={`${styles.status} ${status === 'Completed' ? styles.completed : ''}`}>{status}</div>) : null
                    } 
                </div>
            </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectIsFetching: selectIsFetching,
    selectUserDetails: selectUserDetails
})

const mapDispatchToProps = dispatch => ({
    SetOrderStatusAsync: (orderId, orderStatus) => dispatch(SetOrderStatusAsync(orderId, orderStatus)),
    AdminDeleteOrderAsync: (id) => dispatch(AdminDeleteOrderAsync(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(OrderRow);