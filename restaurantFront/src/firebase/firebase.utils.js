import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDgc5xhNZYV7kiFVUjC2bOc_-ZyQe12Esw",
    authDomain: "restaurant-45eb0.firebaseapp.com",
    databaseURL: "https://restaurant-45eb0.firebaseio.com",
    projectId: "restaurant-45eb0",
    storageBucket: "restaurant-45eb0.appspot.com",
    messagingSenderId: "1019933584778",
    appId: "1:1019933584778:web:7903f68a3c6c455e38ec73",
    measurementId: "G-RP9XP6X1F6"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log(userAuth); 
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);
  
//   const batch = firestore.batch()
//   objectsToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj)
//   })

//   return await batch.commit()
// }

export const convertCollectionsSnapshotToMapFood = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { category, description, image, name, price, quantity } = doc.data()

    return {
      id: doc.id,
      category, 
      description,
      image, 
      name,
      price,
      quantity
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection
    return accumulator;
  }, {})
}

export const convertCollectionsSnapshotToMapOrder = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { username, userId, products, createdAt } = doc.data()

    return {
      id: doc.id,
      username, 
      userId,
      products, 
      createdAt
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.id.toLowerCase()] = collection
    return accumulator;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;

