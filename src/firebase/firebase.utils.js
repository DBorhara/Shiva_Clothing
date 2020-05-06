import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAXTQswd0ME4N2QvsQNWhTX5tvCnjYxi9o',
  authDomain: 'shivaclothingecommerce.firebaseapp.com',
  databaseURL: 'https://shivaclothingecommerce.firebaseio.com',
  projectId: 'shivaclothingecommerce',
  storageBucket: 'shivaclothingecommerce.appspot.com',
  messagingSenderId: '689512415343',
  appId: '1:689512415343:web:c69929455c7fea8e294d9a',
  measurementId: 'G-R6ZYH5ZX7Q',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error);
    }
  }
  return userRef;
};

//Make db call to populate with db with shop collection items(in App.js componentDidMount)
export const addCollectionandDocuments = async (collectionKey, dataToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  dataToAdd.forEach((object) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, object);
  });

  return await batch.commit();
};

//Collections data from DB transformed into usable object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((docObj) => {
    const { title, items } = docObj.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docObj.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google OAuth Set Up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
