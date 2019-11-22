import React, { useState, useEffect } from 'react'; 
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'; 
import { createStructuredSelector } from 'reselect'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './card.module.scss'
import { addItem } from '../../redux/cart/cart.actions'
import { selectSingleEditScreenId } from '../../redux/shop/shop.selectors'
import { goToSingleEditScreen, removeSingleProductId, deleteSingleProductAsync, updatePublishedStateAsync } from '../../redux/shop/shop.actions'

const Card = ({name, description, image, price, addItem, item, published, id, editAddProductPage, goToSingleEditScreen, removeSingleProductId, deleteSingleProductAsync, updatePublishedStateAsync}) => {

    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        checkedA: published
      });

    console.log(published)

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
        updatePublishedStateAsync(id, event.target.checked);
    };
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteHandler = (id) => {
        console.log(id); 

        deleteSingleProductAsync(id); 
    }

    const starRating = () => {
        return (<React.Fragment><div style={{position: 'relative'}}><fieldset className={styles.rating}>
            <input type="radio" id="star5" name="rating" value="5" /><label className={styles.full} for="star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className={styles.half} for="star4half" title="Pretty good - 4.5 stars"></label>
            <input type="radio" id="star4" name="rating" value="4" /><label className ={styles.full} for="star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className={styles.half} for="star3half" title="Meh - 3.5 stars"></label>
            <input type="radio" id="star3" name="rating" value="3" /><label className ={styles.full} for="star3" title="Meh - 3 stars"></label>
            <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className={styles.half} for="star2half" title="Kinda bad - 2.5 stars"></label>
            <input type="radio" id="star2" name="rating" value="2" /><label className ={styles.full} for="star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className={styles.half} for="star1half" title="Meh - 1.5 stars"></label>
            <input type="radio" id="star1" name="rating" value="1" /><label className ={styles.full} for="star1" title="Sucks big time - 1 star"></label>
            <input type="radio" id="starhalf" name="rating" value="half" /><label className={styles.half} for="starhalf" title="Sucks big time - 0.5 stars"></label>
        </fieldset><span className={styles.ratingNumber}>(3)</span></div></React.Fragment>)
    }



    return (
        <div className="col-sm-12 col-md-6 col-lg-4 mb-5">
            <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this product?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once deleted, this product will be permanently deleted and unable to restore anymore. 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => deleteHandler(id)} color='secondary' autoFocus>
                    I want to delete this product
                </Button>
                </DialogActions>
            </Dialog>
            </div>
            <div className={`card mx-auto ${styles.imgContainer}`} >
                <img src={image} className={`card-img-top ${styles.cardImage}`}  alt="This is a burger" />
                { editAddProductPage ? 
                    (
                    <div className={styles.switchContainer}>
                    <Tooltip title="Published? ">
                     <Switch
                     checked={state.checkedA}
                     onChange={handleChange('checkedA')}
                     value='checkedA'
                     color="primary"
                     inputProps={{ 'aria-label': 'primary checkbox' }}
                     />
                     </Tooltip>
                    </div>
                    ) : null}
                <div className="card-body">
                    {/* <p className={styles.itemStatus}>Most Popular</p> */}
                    <span className={`${styles.itemPrice} ${styles.tag}`}>RM {parseFloat(Math.round(price * 100) / 100).toFixed(2)}</span>
                    <h5 className={`card-title ${styles.itemHeader}`}>{name}</h5>
                    <p className={`card-text ${styles.itemDescription}`}>{description}</p>
                    {/* {starRating()} */}
                    <div style={{display: 'block'}}>
                        {
                            editAddProductPage ? 
                            (
                            <div style={{ display: 'flex',
                                justifyContent: 'space-between' }}>   
                                <div className={styles.btnContainer}>
                                    <button onClick={() => goToSingleEditScreen(id) } className="btn btn-info">Edit product</button>
                                    {/* <Link to={`/single-product/${id}`}><p className={styles.moreInfo} >More Info..</p></Link> */}
                                </div>
                                <div className={styles.btnContainer}>
                                    <button onClick={handleClickOpen} className="btn btn-danger">Delete product</button>
                                    {/* <Link to={`/single-product/${id}`}><p className={styles.moreInfo} >More Info..</p></Link> */}
                                </div>
                            </div> 
                            ) :
                            (<div className={styles.btnContainer}>
                                <button onClick={() => addItem(item)} className="btn btn-success">Add to Cart</button>
                                {/* <Link to={`/single-product/${id}`}><p className={styles.moreInfo} >More Info..</p></Link> */}
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectSingleEditScreenId: selectSingleEditScreenId
})

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    goToSingleEditScreen: id => dispatch(goToSingleEditScreen(id)),
    removeSingleProductId: () => dispatch(removeSingleProductId()),
    deleteSingleProductAsync: (id) => dispatch(deleteSingleProductAsync(id)),
    updatePublishedStateAsync: (id, state) => dispatch(updatePublishedStateAsync(id, state))
  })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Card)); 