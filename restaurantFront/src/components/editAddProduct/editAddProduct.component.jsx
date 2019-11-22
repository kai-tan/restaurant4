import React, { useEffect } from 'react'
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'; 

import { selectFireStoreOrderFood } from '../../redux/shop/shop.selectors'
import ListFoods from '../../components/listfoods/listfood.component'
import styles from './editAddProduct.module.scss'; 

const EditAddProduct = ({ history, selectFireStoreOrderFood, goToCreatePage}) => {

    
    return (
        <div>
            <button style={{margin: '1rem 1rem 1rem auto', display: 'block'}} onClick={goToCreatePage}>Add Product</button>
            <ListFoods selectFoodsForInitFetch={selectFireStoreOrderFood ? selectFireStoreOrderFood : ''} editAddProductPage /> 
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectFireStoreOrderFood: selectFireStoreOrderFood
})

export default withRouter(connect(mapStateToProps)(EditAddProduct)); 

