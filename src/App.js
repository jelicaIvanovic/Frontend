import React, {Component} from 'react';
import {Router, Route, Switch} from "react-router-dom";
import Home from './Components/Home.jsx';
import './Assets/dist/style.css';
require('dotenv').config();
class App extends Component {
  componentDidMount() {
  }
  render() {

    return (
        <div>
          <Home />
        </div>

    );
  }
}

export default App;
