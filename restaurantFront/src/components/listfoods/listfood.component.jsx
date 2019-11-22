import React from 'react'

import Card from '../card/card.component'

const ListFoods = ({ selectFoodsForInitFetch, editAddProductPage }) => {

    return (
        <div className={`container`}>
            <div className="row">
                { selectFoodsForInitFetch ? selectFoodsForInitFetch.map((item) => {return <Card key={item.name} name={item.name} description={item.description} image={item.image} price={item.price} item={item} id={item.id} published={item.published} editAddProductPage={editAddProductPage} /> }) : null }
            </div>
        </div>
    )
}

export default ListFoods; 