import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from 'react-bootstrap/Button'
import DialogComponent from '../../components/dialog/dialog.component'

import { uploadImageForCreateProduct, createSingleProductAsync, removeCreateImage, removeMessage } from '../../redux/shop/shop.actions'
import { selectCreateImage, selectSuccessMessage } from '../../redux/shop/shop.selectors'
import styles from './create-product.module.scss'

const CreateProduct = ({ selectCreateImage, uploadImageForCreateProduct, createSingleProductAsync, removeCreateImage, goToPreviousPage, removeMessage, selectSuccessMessage }) => {

    const [form, setForm] = useState({
        title: '', 
        description: '',
        price: '', 
        category: '',
        categoriesType: [
            'main-dishes',
            'side-dishes',
            'desserts',
            'drinks'
        ]
    })

    const [open, setOpen] = useState(false);


    const handleClose = () => {
        setOpen(false);
        removeMessage();
    };



    useEffect(() => {
        if (selectSuccessMessage) {
            setOpen(true)
        }

        return () => {
            removeCreateImage(); 
        }
    }, [selectSuccessMessage])


    const handleChange = (e, type) => {

        console.log(e.target.value, type )
        if ( type === 'title' ) {
            setForm({ ...form, title: e.target.value })
        }

        if ( type === 'description' ) {
            setForm({ ...form, description: e.target.value })
        }

        if ( type === 'price' ) {
            setForm({ ...form, price: e.target.value })
        }

        if ( type === 'categories' ) {
            setForm({ ...form, category: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const title = form.title 
        const description = form.description 
        const price = form.price
        const category = form.category
        const allChangesDetails = {
            title,
            description,
            price, 
            category,
            image: selectCreateImage ? selectCreateImage : 'https://via.placeholder.com/400x300'
        }

        console.log(allChangesDetails); 
        createSingleProductAsync(allChangesDetails); 
        setForm({
            ...form,
            title: '', 
            description: '',
            price: '', 
            category: ''
        })
        
    }

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        // const formData = new FormData();
        // formData.append('image', image, image.name);
        // formData.append('id', this.props.match.params.id);
        uploadImageForCreateProduct(image);
      };
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };


    return (
        <div className={styles.container}>
            <DialogComponent open={open} handleClose={handleClose} message='Product has been created' >
                <Button onClick={handleClose} color="primary">
                    Okay
                </Button>
            </DialogComponent>
              <button onClick={ goToPreviousPage }>Go back</button>
              <img src={`${ selectCreateImage || 'https://via.placeholder.com/400x300'}`} alt="profile" className={styles.profileImage} />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={handleImageChange}
              />
              <button
                tip="Edit profile picture"
                onClick={handleEditPicture}
              >
                <EditIcon color="primary" />
              </button>
              <form className={styles.formContainer} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <TextField
                    id="title"
                    className={styles.textField}
                    label="Title"
                    margin="normal"
                    value={ form.title }
                    onChange={(e) => handleChange(e, 'title')}
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
                        value={ form.description }
                        onChange={(e) => handleChange(e, 'description')}
                    />
                </div>
                <div>
                    <TextField
                        id="price"
                        className={styles.textField}
                        label="Price"
                        margin="normal"
                        value={ form.price }
                        onChange={(e) => handleChange(e, 'price')}
                    />
                </div>
                <div>
                    <TextField
                        id="category"
                        select
                        label="Select category"
                        className={styles.textField}
                        value={ form.category }
                        onChange={(e) => handleChange(e, 'categories')}
                        helperText="Please select your category"
                        margin="normal"
                        >
                        {form.categoriesType.map(option => (
                            <MenuItem key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button variant="success" type="submit">
                        Save Changes
                </Button>
            </form>
            </div>
    )
}


const mapStateToProps = createStructuredSelector({
    selectCreateImage: selectCreateImage,
    selectSuccessMessage: selectSuccessMessage
})

const mapDispatchToProps = (dispatch) => ({
    uploadImageForCreateProduct: (image) => dispatch(uploadImageForCreateProduct(image)),
    createSingleProductAsync: (item) => dispatch(createSingleProductAsync(item)),
    removeCreateImage: () => dispatch(removeCreateImage()),
    removeMessage: () => dispatch(removeMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct); 