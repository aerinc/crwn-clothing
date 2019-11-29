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

  firebase.initializeApp(config);

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
        console.log('error creating user', error.message);
        }
      }
      return userRef;
  };


  export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
    ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  };

  export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
    const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
      const { title, items } = docSnapshot.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  };


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;