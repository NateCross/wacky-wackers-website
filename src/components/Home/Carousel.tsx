import React, { Component, MouseEventHandler, ReactElement } from 'react'

import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const maxCarouselItems = 5;
const CarouselDbURL = 'http://localhost:5000/carousel/';

interface CarouselType {
  activeItem: number,
  maxCarouselItems: number,
  items?: CarouselItemType[],
}

interface CarouselItemType {
  id?: number,
  title: string,
  description: string,
  image?: string,
  imageLink?: string,
  isActive: boolean,
}

interface CarouselCircleType {
  isActive: boolean,
  onClick: MouseEventHandler,
}

function CarouselItem({
  title,
  description,
  image,
  isActive,
  }: CarouselItemType): ReactElement {
  const carouselIsActiveClass = `carousel-item ${isActive ? 'carousel-item-active' : ''}`;
  return (
    <li className={carouselIsActiveClass}>
      <div className='carousel-item-text'>
        <h3 className="carousel-item-title">{title}</h3>
        <p className="carousel-item-description">{description}</p>
      </div>
      <img className='carousel-item-image' src={image} alt={`${title} Image`} />
    </li>
  );
}

function CarouselNavCircle({isActive, onClick}: CarouselCircleType) {
  const circleIsActive = `carousel-nav-circle ${isActive ? 'carousel-nav-circle-active' : ''}`;
  return (
    <li className={circleIsActive}>
      <button className="carousel-nav-circle-button" onClick={onClick}></button>
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
    const response = await fetch(CarouselDbURL);

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

  handleGoLeft() {
    const { activeItem } = this.state;
    const newActiveItemIndex = (
      activeItem === 0 ? maxCarouselItems - 1 : activeItem - 1
    );

    this.setState({
      ...this.state,
      activeItem: newActiveItemIndex,
    });
  }

  handleGoRight() {
    const { activeItem } = this.state;
    const newActiveItemIndex = (
      activeItem === maxCarouselItems - 1 ? 0 : activeItem + 1
    );
    this.setState({
      ...this.state,
      activeItem: newActiveItemIndex,
    });
  }

  handleNavCircleClick(index: number): MouseEventHandler {
    return () => {
      this.setState({
        activeItem: index,
      });
    }
  }

  createCarouselCircles(): ReactElement[] {
    const carouselCircles: ReactElement[] = [];
    const { activeItem } = this.state;

    for (let i = 0; i < maxCarouselItems; i++) {
      carouselCircles.push(
        <CarouselNavCircle
          key={i}
          isActive={i === activeItem ? true : false}
          onClick={this.handleNavCircleClick(i)}
        />
      );
    }

    return carouselCircles;
  }

  render () {
    const { activeItem } = this.state;

    return (
      <div className='carousel'>
        <ul className="carousel-container">
          {
            this.state.items?.map(({title, description, image}, index) => {
              return (
                <CarouselItem
                  title={title}
                  description={description}
                  image={image}
                  key={index}
                  isActive={index === activeItem ? true : false}
                />
              );
            })
          }
        </ul>

        <ul className="carousel-nav">
          { this.createCarouselCircles() }
        </ul>

        <button
          id="carousel-left"
          onClick={this.handleGoLeft.bind(this)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          id="carousel-right"
          onClick={this.handleGoRight.bind(this)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    )
  }
}

export default Carousel;
