import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect'; 
import {
    FacebookShareCount
  } from 'react-share';
  import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    EmailShareButton,
    InstapaperShareButton
  } from 'react-share';
  import {
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
    InstapaperIcon,
    EmailIcon,
  } from 'react-share';

import styles from './singleProduct.module.scss';
import Header from '../../components/header/Header.component';
import { selectIsFetching, selectSingleProduct } from '../../redux/shop/shop.selectors'
import { fetchSingleProductAsync } from '../../redux/shop/shop.actions';
import InlineSpinner from '../../components/inlineSpinner/inlineSpinner.component';
import SimpleBreadcrumbs from '../../components/simpleBreadcrumbs/simpleBreadcrumbs.component';


class SingleProduct extends Component {

    componentDidMount() {

        const { fetchSingleProductAsync, match } = this.props

        fetchSingleProductAsync(match.params.id);
    }

    render() {

        const { selectIsFetching, selectSingleProduct, match } = this.props
        console.log(this.props);
        console.log(selectSingleProduct);
        console.log(match.params.id);

        let product = selectSingleProduct ? selectSingleProduct : ''; 

        return (
            <div className={styles.initial}>
                <Header /> 
                {
                    selectIsFetching === false ? 
                    (
                        <div className={styles.mainContainer}>
                            <div className={styles.leftContainer}>
                                <Carousel style={{maxWidth: '500px', maxHeight: '400px'}}>
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src="https://firebasestorage.googleapis.com/v0/b/restaurant-45eb0.appspot.com/o/drink%202.jpg?alt=media&token=0f7d34e1-c148-4400-b349-beebce9c7fd0"
                                        alt="First slide"
                                        style={{maxWidth: '500px', maxHeight: '400px'}}
                                        />
                                        <Carousel.Caption>
                                        {/* <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src="https://firebasestorage.googleapis.com/v0/b/restaurant-45eb0.appspot.com/o/drink3.jpg?alt=media&token=e13985fc-66a2-45dc-b4c3-401d7cd01154"
                                        alt="Third slide"
                                        style={{maxWidth: '500px', maxHeight: '400px'}}
                                        />
        
                                        <Carousel.Caption>
                                        {/* <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        src="https://firebasestorage.googleapis.com/v0/b/restaurant-45eb0.appspot.com/o/drink4.jpg?alt=media&token=78d0bc60-8d13-448d-a150-06f818f67d44"
                                        alt="Third slide"
                                        style={{maxWidth: '500px', maxHeight: '400px'}}
                                        />
        
                                        <Carousel.Caption>
                                        {/* <h3>Third slide label</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                            <div className={styles.rightContainer}>
                                <div className={styles.innerRightContainer}>
                                    <SimpleBreadcrumbs /> 
                                    <div>Name: {product.name}</div>
                                    <div>Price: {product.price}</div>
                                    <div>Description: {product.description}</div>
                                    <button className="btn btn-success">ADD TO CART</button>
                                    <div>Category: {product.category}</div>
                                    <div style={{display: 'flex'}}>
                                    <FacebookShareButton url="https://www.google.com/" style={{cursor: 'pointer', margin: '0 0.1rem'}} >
                                        <FacebookIcon size={32} round={true}/>
                                    </FacebookShareButton>
                                    <TwitterShareButton style={{cursor: 'pointer', margin: '0 0.1rem'}}>
                                        <TwitterIcon size={32} round={true}/>
                                    </TwitterShareButton>
                                    <PinterestShareButton style={{cursor: 'pointer', margin: '0 0.1rem'}}>
                                        <PinterestIcon size={32} round={true}/>
                                    </PinterestShareButton>
                                    <EmailShareButton style={{cursor: 'pointer', margin: '0 0.1rem'}}>
                                       <EmailIcon size={32} round={true}/>
                                    </EmailShareButton>
                                    <InstapaperShareButton style={{cursor: 'pointer', margin: '0 0.1rem'}}>
                                       <InstapaperIcon size={32} round={true}/>
                                    </InstapaperShareButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : <InlineSpinner />
                }
            </div>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    selectIsFetching: selectIsFetching,
    selectSingleProduct: selectSingleProduct

})

const mapDispatchToProps = dispatch => ({
    fetchSingleProductAsync: (id) => dispatch(fetchSingleProductAsync(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)