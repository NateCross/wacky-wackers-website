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
import UserPage from "./views/User";

import User from "./types/User";

import { LoginData } from "./components/Navbar";

const DbLoginUrl = "http://localhost:5000/login";

interface AppState {
  user?: User,
}

class App extends Component {
  state = {
    user: undefined,
  }

  handleUserLogin = async (loginData: LoginData) => {
    const response = await fetch(DbLoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }).catch((error) => {
      window.alert(error);
    });

    if (!response?.ok) {
      throw "Incorrect account details.";
    }

    const accountDetails = await response.json();

    this.setState({
      ...this.state, user: accountDetails,
    });
  };

  handleUserLogout = () => {
    this.setState({
      ...this.state, user: undefined,
    });
  };

  render() {
    const { user } = this.state;

    return (
      <>
        <Header
          onLogin={this.handleUserLogin}
          onLogout={this.handleUserLogout}
          user={user}
        />

        <div id="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/menu" element={<Menu />}/>
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </div>

        <Footer />
      </>
    )
  }
}

export default App;
