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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google OAuth Set Up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
