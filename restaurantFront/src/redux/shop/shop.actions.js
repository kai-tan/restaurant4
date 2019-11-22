import ShopActionTypes from './shop.types'

import { firestore, convertCollectionsSnapshotToMapFood, storage } from '../../firebase/firebase.utils'



export const fetchFoodsStart = () => ({
    type: ShopActionTypes.FETCH_FOODS_START
})

export const fetchFoodsSuccess = foodsMap => ({
    type: ShopActionTypes.FETCH_FOODS_SUCCESS,
    payload: foodsMap
})

export const fetchFoodsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_FOODS_SUCCESS,
    payload: errorMessage
})

export const fetchFoodsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections'); 
        dispatch(fetchFoodsStart());

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMapFood(snapshot)
            dispatch(fetchFoodsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchFoodsFailure(error.message)))
    }
}


export const fetchSingleProductStart = () => ({
    type: ShopActionTypes.FETCH_SINGLE_PRODUCT_START
})

export const fetchSingleProductSuccess = food => ({
    type: ShopActionTypes.FETCH_SINGLE_PRODUCT_SUCCESS,
    payload: food
})

export const fetchSingleProductFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_SINGLE_PRODUCT_FAILURE,
    payload: errorMessage
})

export const fetchSingleProductAsync = (foodId) => {
    return dispatch => {
        const collectionRef = firestore.collection('food'); 
        dispatch(fetchSingleProductStart());

        collectionRef.doc(foodId).get().then(snapshot => {
            console.log(snapshot);
            dispatch(fetchSingleProductSuccess(snapshot.data())) 
        }).catch(error => dispatch(fetchSingleProductFailure(error.message)))
    }
}

export const updateSingleProductStart = () => ({
    type: ShopActionTypes.UPDATE_SINGLE_PRODUCT_START
})

export const updateSingleProductSuccess = food => ({
    type: ShopActionTypes.UPDATE_SINGLE_PRODUCT_SUCCESS,
    payload: food
})

export const updateSingleProductFailure = errorMessage => ({
    type: ShopActionTypes.UPDATE_SINGLE_PRODUCT_FAILURE,
    payload: errorMessage
})

export const updateSingleProductAsync = (item) => {
    return dispatch => {

        const { title,
            description,
            price, 
            category,
            id } = item

        const collectionRef = firestore.collection('food'); 
        dispatch(updateSingleProductStart());

        collectionRef.doc(id).update({
            name: title,
            description,
            price,
            category
        }).then(snapshot => {
            console.log(snapshot);
            dispatch(updateSingleProductSuccess(snapshot)) 
        }).catch(error => dispatch(updateSingleProductFailure(error.message)))
    }
}


export const updateSingleImageStart = () => ({
    type: ShopActionTypes.UPDATE_SINGLE_IMAGE_START
})

export const updateSingleImageSuccess = image => ({
    type: ShopActionTypes.UPDATE_SINGLE_IMAGE_SUCCESS,
    payload: image
})

export const updateSingleImageFailure = errorMessage => ({
    type: ShopActionTypes.UPDATE_SINGLE_IMAGE_FAILURE,
    payload: errorMessage
})

export const uploadImage = (image, id) => (dispatch) => {

    // axios
    //   .put('https://asia-east2-restaurant-45eb0.cloudfunctions.net/api/editImage', formData )
    //   .then((res) => {
    //     console.log(res); 
    // })
    //   .catch((err) => console.log(err));
      dispatch(updateSingleImageStart())
      const uploadTask = storage.ref(`products/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
        dispatch(updateSingleImageFailure(error.message))
      }, 
    () => {
        // complete function ....
        storage.ref('products').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            // this.setState({url});
            console.log(id); 
            return firestore.doc(`/food/${id}`).update({ image: url })
        }).then((snapshot) => {
            console.log(snapshot); 
            dispatch(updateSingleImageSuccess()); 
        }).catch((error) => {

            dispatch(updateSingleImageFailure(error.message))
        })
    });
};

export const updateSingleCreateImageSuccess = image => ({
    type: ShopActionTypes.UPDATE_SINGLE_CREATE_IMAGE_SUCCESS,
    payload: image
})

export const updateSingleCreateImageFailure = errorMessage => ({
    type: ShopActionTypes.UPDATE_SINGLE_CREATE_IMAGE_FAILURE,
    payload: errorMessage
})

export const uploadImageForCreateProduct = (image) => (dispatch) => {

    // axios
    //   .put('https://asia-east2-restaurant-45eb0.cloudfunctions.net/api/editImage', formData )
    //   .then((res) => {
    //     console.log(res); 
    // })
    //   .catch((err) => console.log(err));
      dispatch(updateSingleImageStart())
      const uploadTask = storage.ref(`products/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
        dispatch(updateSingleCreateImageFailure(error.message))
      }, 
    () => {
        // complete function ....
        storage.ref('products').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            // this.setState({url});
            dispatch(updateSingleCreateImageSuccess(url))

        }).catch((error) => {

            dispatch(updateSingleCreateImageFailure(error.message))
        })
    });
};

export const goToSingleEditScreen = id => ({
    type: ShopActionTypes.GO_TO_SINGLE_EDIT_SCREEN,
    payload: id
})

export const removeSingleProductId = () => ({
    type: ShopActionTypes.REMOVE_SINGLE_PRODUCT_ID
})

    export const createSingleProductStart = () => ({
        type: ShopActionTypes.CREATE_SINGLE_PRODUCT_START
    })
    
    export const createSingleProductSuccess = product => ({
        type: ShopActionTypes.CREATE_SINGLE_PRODUCT_SUCCESS,
        payload: product
    })
    
    export const createSingleProductFailure = errorMessage => ({
        type: ShopActionTypes.CREATE_SINGLE_PRODUCT_FAILURE,
        payload: errorMessage
    })

    export const createSingleProductAsync = (item) => {
        return dispatch => {
    
            const { title,
                description,
                price, 
                category,
                image
                 } = item

            dispatch(createSingleProductStart())
    
            const collectionRef = firestore.collection('food'); 
    
            collectionRef.add({
                name: title,
                description,
                price,
                category,
                image, 
                published: false
            }).then(snapshot => {
                console.log(snapshot);
                dispatch(createSingleProductSuccess(snapshot)) 
            }).catch(error => dispatch(createSingleProductFailure(error.message)))
        }
    }

     
    export const removeCreateImage = () => ({
        type: ShopActionTypes.REMOVE_CREATE_IMAGE
    })


    export const deleteSingleProductStart = () => ({
        type: ShopActionTypes.DELETE_SINGLE_PRODUCT_START
    })
    
    export const deleteSingleProductSuccess = () => ({
        type: ShopActionTypes.DELETE_SINGLE_PRODUCT_SUCCESS
    })
    
    export const deleteSingleProductFailure = errorMessage => ({
        type: ShopActionTypes.DELETE_SINGLE_PRODUCT_FAILURE,
        payload: errorMessage
    })

    export const deleteSingleProductAsync = (id) => {
        return dispatch => {
    
            const collectionRef = firestore.collection('food'); 
            
            dispatch(deleteSingleProductStart())
            console.log(id); 
            collectionRef.doc(id).delete().then(function() {
                console.log("Document successfully deleted!");

                dispatch(deleteSingleProductSuccess())
            }).catch(function(error) {
                console.error("Error removing document: ", error);
                
                dispatch(deleteSingleProductFailure(error.message))

            });
            
        }
    }

    export const removeMessage = () => ({
        type: ShopActionTypes.REMOVE_MESSAGE
    })
   


    export const updatePublishedStateStart = () => ({
        type: ShopActionTypes.UPDATE_PUBLISHED_STATE_START
    })
    
    export const updatePublishedStateSuccess = () => ({
        type: ShopActionTypes.UPDATE_PUBLISHED_STATE_SUCCESS
    })
    
    export const updatePublishedStateFailure = errorMessage => ({
        type: ShopActionTypes.UPDATE_PUBLISHED_STATE_FAILURE,
        payload: errorMessage
    })

    export const updatePublishedStateAsync = (id, publishedState) => {
        return dispatch => {
            
            dispatch(updatePublishedStateStart())

            firestore.doc(`/food/${id}`).update({ published: publishedState }).then(function() {
                console.log("Document successfully deleted!");

                dispatch(updatePublishedStateSuccess())
            }).catch(function(error) {
                console.error(error);
                
                dispatch(updatePublishedStateFailure(error.message))

            });
            
        }
    }