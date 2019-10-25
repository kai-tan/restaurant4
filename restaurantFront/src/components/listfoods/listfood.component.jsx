import React from 'react'

import Card from '../card/card.component'

const ListFoods = ({ selectFoodsForInitFetch }) => {

    console.log(selectFoodsForInitFetch);
    return (
        <div className={`container`}>
            <div className="row">
                { Object.values(selectFoodsForInitFetch).filter((item) => {return item !== false}).map((item) => {return <Card key={item.name} name={item.name} description={item.description} image={item.image} price={item.price} item={item} id={item.id} /> }) }
            </div>
        </div>
    )
}

export default ListFoods; 