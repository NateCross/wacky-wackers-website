import React, { Component } from 'react';
import {
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

import './css/App.css'

import Header from "./views/Header";

import Home from './views/Home';
import Product from './views/Product';

class App extends Component {
  render() {
    return (
      <>
        <Header />

        <div id="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<Product />}/>
          </Routes>
        </div>
      </>
    )
  }
}

export default App;
