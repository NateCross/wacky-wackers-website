import React, { Component } from 'react';
import {
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

import './css/App.css'

import Header from "./views/Header";
import Footer from "./views/Footer";

import Home from './views/Home';
import Product from './views/Product';
import Menu from './views/Menu';

class App extends Component {
  render() {
    return (
      <>
        <Header />

        <div id="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/menu" element={<Menu />}/>
          </Routes>
        </div>

        <Footer />
      </>
    )
  }
}

export default App;
