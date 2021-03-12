import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyDLQS4K332aGyX0Ex3bF-0haVsKTDuj-4A",
  authDomain: "getcloud.firebaseapp.com",
  databaseURL: "https://getcloud-default-rtdb.firebaseio.com",
  projectId: "getcloud",
  storageBucket: "getcloud.appspot.com",
  messagingSenderId: "481268351772",
  appId: "1:481268351772:web:8f7a307072a91d525db0d9",
  measurementId: "G-8SD3QDZ57G"
};

  const okapp = firebase.initializeApp(firebaseConfig)
  const firestore = okapp.firestore()
  export const database ={
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc => {
      return {id: doc.id, ...doc.data()}
    },
    getCurrrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
  }

  export const auth = okapp.auth()

  export const storage = okapp.storage()

  export default okapp



// import firebase from "firebase/app"
// import "firebase/auth"

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

// export const auth = app.auth()
// export default app