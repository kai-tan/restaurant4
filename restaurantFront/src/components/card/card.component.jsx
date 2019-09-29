import React from 'react'; 
import { connect } from 'react-redux'

import styles from './card.module.scss'
import { addItem } from '../../redux/cart/cart.actions'

const Card = ({name, description, image, price, addItem, item}) => {

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-5">
            <div className={`card mx-auto ${styles.imgContainer}`} >
                <img src={image} className={`card-img-top ${styles.cardImage}`}  alt="This is a burger" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">RM {parseFloat(Math.round(price * 100) / 100).toFixed(2)}</p>
                    <button onClick={() => addItem(item)} className="btn btn-success">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
  })

export default connect(null, mapDispatchToProps)(Card); 