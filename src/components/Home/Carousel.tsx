import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { ObjectId } from "mongodb";


const maxCarouselItems = 5;

interface CarouselType {
  activeItem: number,
  maxCarouselItems: number,
  items?: CarouselItemType[],
}

interface CarouselItemType {
  id: number,
  title: string,
  description: string,
  image?: string,
}

function CarouselItem({title, description, image}: CarouselItemType): React.ReactElement {
  return (
    <li className='carousel-item'>
      <div className='carousel-item-text'>
        <h3 className="carousel-item-title">{title}</h3>
        <p className="carousel-item-description">{description}</p>
      </div>
      <img className='carousel-item-image' src={image} alt={`${title} Image`} />
    </li>
  );
}

class Carousel extends Component<{}, CarouselType> {
  constructor(props: CarouselType) {
    super(props);
    this.state = {
      activeItem: 0,
      maxCarouselItems: maxCarouselItems,
      items: [],
    };
  }

  componentDidMount() {
    this.fetchCarouselItems();
  }

  async fetchCarouselItems() {
    const response = await fetch('http://localhost:5000/carousel/');

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const carousel = await response.json();
    this.setState({
      ...this.state,
      items: carousel,
    });
  }

  render () {
    return (
      <div className='carousel'>
        <ul className="carousel-container">
          {this.state.items?.map(({title, description, image}, index) => {
            return (
              <CarouselItem
                title={title}
                description={description}
                image={image}
                id={index}
              />
            )
          })}
        </ul>
        <button id="carousel-left"><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button id="carousel-right"><FontAwesomeIcon icon={faChevronRight} /></button>
      </div>
    )
  }
}

export default Carousel;
