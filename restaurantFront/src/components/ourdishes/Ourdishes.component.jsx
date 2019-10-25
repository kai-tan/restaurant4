import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import style from './Ourdishes.module.scss'
import Header from '../header/Header.component'
import { selectFoodsForInitFetch, selectIsFetching } from '../../redux/shop/shop.selectors'
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
    }

    handleChange = (foodType) => (event) => {

        const { selectFoodsForInitFetch } = this.props
        console.log(foodType, selectFoodsForInitFetch);

        let filteredResult = null;

        if (foodType === 'main-dishes') {
            filteredResult = selectFoodsForInitFetch.filter((item) => {
               return item.category ===  foodType
            })

            this.setState({filteredResult: filteredResult})
        } else if (foodType === 'all') {
            filteredResult = selectFoodsForInitFetch

            this.setState({filteredResult: filteredResult})
        } else if (foodType === 'side-dishes') {
            filteredResult = selectFoodsForInitFetch.filter((item) => {
                return item.category ===  foodType
             })
 
             this.setState({filteredResult: filteredResult})
        } else if (foodType === 'desserts') {
            filteredResult = selectFoodsForInitFetch.filter((item) => {
                return item.category ===  foodType
             })
 
             this.setState({filteredResult: filteredResult})
        } else if (foodType === 'drinks') {
            filteredResult = selectFoodsForInitFetch.filter((item) => {
                return item.category ===  foodType
             })
 
             this.setState({filteredResult: filteredResult})
        }

    }
    

    render() {
        const { selectFoodsForInitFetch, selectIsFetching } = this.props

        const passingResult = this.state.filteredResult === null ? selectFoodsForInitFetch : this.state.filteredResult
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
    selectFoodsForInitFetch: selectFoodsForInitFetch,
    selectIsFetching: selectIsFetching
})

const mapDispatchToProps = (dispatch) => ({
    fetchFoods: () => dispatch(fetchFoodsStart()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Ourdishes); 