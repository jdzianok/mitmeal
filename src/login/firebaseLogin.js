import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBRW9vYIP_3gEaobxcQvbLrrFnODSROb28",
  authDomain: "react-app-fbd60.firebaseapp.com",
  databaseURL: "https://react-app-fbd60.firebaseio.com",
  projectId: "react-app-fbd60",
  storageBucket: "react-app-fbd60.appspot.com",
  messagingSenderId: "24060154443",
  appId: "1:24060154443:web:5fa4303d22b7621f6473ce",
  measurementId: "G-322W2Y82C1"
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
