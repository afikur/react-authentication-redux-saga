import React from 'react';
import {Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Login from "./login";
import Signup from "./signup";
import Widgets from "./widgets"

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Welcome to Widget Reactory</h2>
      </div>
      <section className="App-body">
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/widgets" component={Widgets}/>
      </section>
    </div>
  );
}

export default App;
