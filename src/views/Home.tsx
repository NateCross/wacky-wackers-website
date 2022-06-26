import React, { Component } from 'react'

import '../css/Home.css'

import Carousel from "../components/Home/Carousel"

class Home extends Component {
  render () {
    return (
      <div className="page-home">
        {
          <Carousel />
          // Product showcase
          // News
          // Product Showcase
        }
      </div>
    )
  }
}

export default Home;
