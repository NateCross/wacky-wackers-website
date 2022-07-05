import React, { Component } from 'react'

import '../css/Home.css'

import Carousel from "../components/Home/Carousel";
import Reviews from "../components/Home/Reviews";
import { Hiring } from "../components/Home/Hiring";

class Home extends Component {
  render() {
    return (
      <div className="page-home">
          <Carousel />
          <Reviews />
          <Hiring />
        {
          // Product showcase
          // News
          // Product Showcase
        }
      </div>
    )
  }
}

export default Home;
