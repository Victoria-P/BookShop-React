import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDKj46xLJjYI3HlNLhE_O86cetAIJwOKYw",
  authDomain: "react-shop-2791f.firebaseapp.com",
  databaseURL: "https://react-shop-2791f.firebaseio.com",
  projectId: "react-shop-2791f",
  storageBucket: "react-shop-2791f.appspot.com",
  messagingSenderId: "399632983175",
  appId: "1:399632983175:web:c8d1dbfbfb467c58bf0422",
};

const fire = firebase.initializeApp(config);

export default fire;
