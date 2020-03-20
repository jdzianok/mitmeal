import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, HashRouter as Router } from "react-router-dom";
import LoginComponent from "./login/login";
import SignupComponent from "./signup/signup";
import DashboardComponent from "./dashboard/dashboard";

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyBRW9vYIP_3gEaobxcQvbLrrFnODSROb28",
  authDomain: "react-app-fbd60.firebaseapp.com",
  databaseURL: "https://react-app-fbd60.firebaseio.com",
  projectId: "react-app-fbd60",
  storageBucket: "react-app-fbd60.appspot.com",
  messagingSenderId: "24060154443",
  appId: "1:24060154443:web:5fa4303d22b7621f6473ce",
  measurementId: "G-322W2Y82C1"
});

const routing = (
  <Router>
    <div id="routing-container">
      <Route path="/" exact component={LoginComponent}></Route>
      <Route path="/signup" component={SignupComponent}></Route>
      <Route path="/dashboard" component={DashboardComponent}></Route>
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
