import React, { useState } from 'react'

import moment from 'moment'

const OrderRow = ({ id, createdAt, products }) => {

    let transformedDate = moment(createdAt).fromNow()

    const [InitProducts, setInitProducts] = useState([]);

    const displayProducts = (InitProducts) => {
        const displayProduct = products ? products : InitProducts;

        return displayProduct.map((product) => {
            return (
                <div className="card" style={{'flex': '1 1 200px'}}>
                    <img src={product.image} className="card-img-top" style={{'height': '200px'}}/>
                    <div className="card-body">
                        <p class="card-text">{product.name}</p>
                        <p class="card-text">{product.description}</p>
                    </div>
                </div>
            )
        })
    }

    return (
            <div class="row">
                <div class="col-sm-2" style={{'overflow-wrap': 'break-word'}}>
                {id}
                </div>
                <div class="col-sm-2">
                {transformedDate}
                </div>
                <div class="col-sm d-flex justify-content-center">
                {displayProducts(InitProducts)}
                </div>
            </div>
    )
}

export default OrderRow;