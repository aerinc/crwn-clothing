import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBf5yzC-W4j0SRM50u6wyOFiuPtUNCsWJ0",
    authDomain: "crwn-db-eaebf.firebaseapp.com",
    databaseURL: "https://crwn-db-eaebf.firebaseio.com",
    projectId: "crwn-db-eaebf",
    storageBucket: "crwn-db-eaebf.appspot.com",
    messagingSenderId: "17441567201",
    appId: "1:17441567201:web:eb21c5902ce0f163b162a0"
  };


  export const createUserProfileDocument = async (userAuth, additionalData) => {
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
        console.log('error creating user');
        }
      }
      return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: ' ' });
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;