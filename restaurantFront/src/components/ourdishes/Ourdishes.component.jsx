import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import firebase from '../../firebase/firebase.utils'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import style from './Ourdishes.module.scss'
import Header from '../header/Header.component'
import { selectFireStoreOrderFoodPublished, selectIsFetching } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner.component'
import ListFood from '../listfoods/listfood.component'

import { fetchFoodsStart } from '../../redux/shop/shop.actions'

const ListFoodWithSpinner = WithSpinner(ListFood)

class Ourdishes extends React.Component {


    state = {
        inputfield: '',
        error: null,
        ref: React.createRef(),
        filteredResult: null
    }

    componentDidMount() {
        this.state.ref.current.focus();

        const { fetchFoods } = this.props
        fetchFoods()

        var user = firebase.auth().currentUser;
        console.log(user); 
        if (!user) {
            return;
        }
        // console.log(user.getPhotoUrl().toString()); 
    }


    handleChange = (foodType) => (event) => {

        const { selectFireStoreOrderFoodPublished } = this.props
        console.log(foodType, selectFireStoreOrderFoodPublished);

        let filteredResult = null;

        if (foodType === 'main-dishes') {
            filteredResult = selectFireStoreOrderFoodPublished.filter((item) => {
               return item.category ===  foodType
            })

            this.setState({filteredResult: filteredResult})
        } else if (foodType === 'all') {
            filteredResult = selectFireStoreOrderFoodPublished

            this.setState({filteredResult: filteredResult})
        } else if (foodType === 'side-dishes') {
            filteredResult = selectFireStoreOrderFoodPublished.filter((item) => {
                return item.category ===  foodType
             })
 
             this.setState({filteredResult: filteredResult})
        } else if (foodType === 'desserts') {
            filteredResult = selectFireStoreOrderFoodPublished.filter((item) => {
                return item.category ===  foodType
             })
 
             this.setState({filteredResult: filteredResult})
        } else if (foodType === 'drinks') {
            filteredResult = selectFireStoreOrderFoodPublished.filter((item) => {
                return item.category ===  foodType
             })
 
             this.setState({filteredResult: filteredResult})
        }

    }
    

    render() {
        const { selectFireStoreOrderFoodPublished, selectIsFetching } = this.props
        console.log(selectFireStoreOrderFoodPublished)
        const passingResult = this.state.filteredResult === null ? selectFireStoreOrderFoodPublished : this.state.filteredResult
        console.log(this.props);
        return (
            <div className={style.ourdishes}>
                <Header />
                <div className={style.category}>
                    <button className={`${style.testButton} resCentreVerAndHor`} ref={this.state.ref} onClick={this.handleChange('all')}>All</button>
                    <button className={`${style.testButton} resCentreVerAndHor`} onClick={this.handleChange('main-dishes')}>Main Dishes</button>
                    <button className={`${style.testButton} resCentreVerAndHor`} onClick={this.handleChange('side-dishes')}>Side Dishes</button>
                    <button className={`${style.testButton} resCentreVerAndHor`} onClick={this.handleChange('desserts')}>Desserts</button>
                    <button className={`${style.testButton} resCentreVerAndHor`} onClick={this.handleChange('drinks')}>Drinks</button>
                </div>
                <ListFoodWithSpinner isLoading={selectIsFetching} selectFoodsForInitFetch={passingResult}/>
            </div>
            )
        }
}

const mapStateToProps = createStructuredSelector({
    selectFireStoreOrderFoodPublished: selectFireStoreOrderFoodPublished,
    selectIsFetching: selectIsFetching
})

const mapDispatchToProps = (dispatch) => ({
    fetchFoods: () => dispatch(fetchFoodsStart()) 
})

export default compose(
    firestoreConnect(() => ['food']), // or { collection: 'todos' }
    connect(mapStateToProps, mapDispatchToProps)
   )(Ourdishes)