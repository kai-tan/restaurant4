import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux'; 
import { createStructuredSelector } from 'reselect'; 
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'react-bootstrap/Button'
import { firestoreConnect } from 'react-redux-firebase'

import { updateSingleProductAsync } from '../../redux/shop/shop.actions'
import { selectFoods, selectFireStoreFood, selectSuccessMessage } from '../../redux/shop/shop.selectors'
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { uploadImage, removeSingleProductId, removeMessage } from '../../redux/shop/shop.actions';
import DialogComponent from '../../components/dialog/dialog.component'
import styles from './single-edit-product.module.scss'; 


class SingleEditProduct extends Component {

    state = {
        title: null, 
        description: null,
        price: null, 
        category: null,
        categoriesType: [
            'main-dishes',
            'side-dishes',
            'desserts',
            'drinks'
        ],
        open: false
    }


    handleClose = () => {
        this.setState({ open: false});
        this.props.removeMessage();
    };

    
    componentDidUpdate(prevProps) {

        if (prevProps.selectSuccessMessage === false && this.props.selectSuccessMessage) {
            this.setState({ open: true })
        }
    }

    handleChange = (e, type) => {

        console.log(e.target.value, type )
        if ( type === 'title' ) {
            this.setState({ title: e.target.value })
        }

        if ( type === 'description' ) {
            this.setState({ description: e.target.value })
        }

        if ( type === 'price' ) {
            this.setState({ price: e.target.value })
        }

        if ( type === 'categories' ) {
            this.setState({ category: e.target.value })
        }
    }

    util = () => {
        const { selectFoods, match} = this.props
        let item = []; 
        let key; 
        for (key in selectFoods) {
            if ( selectFoods[key].id === this.props.id) {
                item.push(selectFoods[key])
            }
        }
        return item; 
    }

    handleSubmit = (e) => {
        const item = this.util(); 
        console.log(item);
        e.preventDefault();
        const title = this.state.title || item[0].name 
        const description = this.state.description || item[0].description
        const price = this.state.price || item[0].price
        const category = this.state.category || item[0].category
        const allChangesDetails = {
            title,
            description,
            price, 
            category,
            id: this.props.id
        }

        console.log(allChangesDetails); 
        this.props.updateSingleProductAsync(allChangesDetails); 
        

    }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    // const formData = new FormData();
    // formData.append('image', image, image.name);
    // formData.append('id', this.props.match.params.id);
    this.props.uploadImage(image, this.props.id);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  
  render() {
    const { match, selectFoods, selectFireStoreFood} = this.props
    console.log(this.props.id, selectFoods, selectFireStoreFood)

    let items = []; 
    let keys; 
    for (keys in selectFireStoreFood) {
        if ( keys === this.props.id) {
            items.push(selectFireStoreFood[keys])
        }
    }
    console.log(items)
    console.log(selectSuccessMessage); 


    // let item = []; 
    // let key; 
    // for (key in selectFoods) {
    //     if ( selectFoods[key].id === match.params.id) {
    //         item.push(selectFoods[key])
    //     }
    // }
    console.log(this.props.history);


        return (<div className={styles.container}>
                <DialogComponent open={this.state.open} handleClose={this.handleClose} message='Product has been updated' >
                    <Button onClick={this.handleClose} color="primary">
                        Okay
                    </Button>
                </DialogComponent>
                <button onClick={() => this.props.removeSingleProductId() } >Go back</button>
                <img src={items[0] ? items[0].image : ''} alt="profile" className={styles.profileImage} />
                <input
                    type="file"
                    id="imageInput"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                />
                { console.log('it runs!')}
                <button
                    tip="Edit profile picture"
                    onClick={this.handleEditPicture}
                >
                    <EditIcon color="primary" />
                </button>
                <form className={styles.formContainer} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                        id="title"
                        className={styles.textField}
                        label="Title"
                        margin="normal"
                        value={ this.state.title !== null ? this.state.title : (items[0] ? items[0].name : '') }
                        onChange={(e) => this.handleChange(e, 'title')}
                        />
                    </div>
                    <div>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows="4"
                            className={styles.textField}
                            margin="normal"
                            value={this.state.description !== null ? this.state.description : (items[0] ? items[0].description : '') }
                            onChange={(e) => this.handleChange(e, 'description')}
                        />
                    </div>
                    <div>
                        <TextField
                            id="price"
                            className={styles.textField}
                            label="Price"
                            margin="normal"
                            value={this.state.price !== null ? this.state.price : (items[0] ? items[0].price : '')}
                            onChange={(e) => this.handleChange(e, 'price')}
                        />
                    </div>
                    { console.log('it runs 2 !')}
                    <div>
                        <TextField
                            id="category"
                            select
                            label="Select category"
                            className={styles.textField}
                            value={this.state.category !== null ? this.state.category : (items[0] ? items[0].category : '')}
                            onChange={(e) => this.handleChange(e, 'categories')}
                            helperText="Please select your category"
                            margin="normal"
                            >
                            {this.state.categoriesType.map(option => (
                                <MenuItem key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        { console.log('it runs 3 !') }

                    </div>
                    <Button variant="success" type="submit">
                            Save Changes
                    </Button>
                </form>
        </div>);
  }
}

const mapStateToProps = createStructuredSelector({
    selectFoods: selectFoods,
    selectFireStoreFood: selectFireStoreFood,
    selectSuccessMessage: selectSuccessMessage
})


const mapDispatchToProps = (dispatch) => ({
    uploadImage: (image, id) => dispatch(uploadImage(image, id)),
    updateSingleProductAsync: (item) => dispatch(updateSingleProductAsync(item)),
    removeSingleProductId: () => dispatch(removeSingleProductId()),
    removeMessage: () => dispatch(removeMessage())
})


export default withRouter(compose(firestoreConnect(() => ['food']), connect( mapStateToProps, mapDispatchToProps ))(SingleEditProduct));
