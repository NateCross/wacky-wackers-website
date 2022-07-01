import React, { Component } from 'react'

import '../css/Home.css'

import Carousel from "../components/Home/Carousel"
import Reviews from "../components/Home/Reviews"

class Home extends Component {
  render() {
    return (
      <div className="page-home">
          <Carousel />
          <Reviews />
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
