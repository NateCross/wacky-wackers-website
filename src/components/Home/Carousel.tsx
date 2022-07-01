import React, { Component, MouseEventHandler, ReactElement } from 'react'

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const maxCarouselItems = 5;
const CarouselDbURL = 'http://localhost:5000/carousel/';

interface CarouselType {
  currentActiveItem: number,
  prevActiveItem?: number,
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
  isPrevActive: boolean,
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
  isPrevActive,
  imageLink = '#',
  }: CarouselItemType): ReactElement {
  let carouselClasses = `carousel-item `;
  let imageClasses = 'carousel-item-image ';
  if (isActive)
    carouselClasses += 'carousel-item-active ';
  if (isPrevActive) {
    carouselClasses += 'carousel-image-animation-prev ';
  }
  return (
    <li className={carouselClasses}>
      <a href={imageLink} className="carousel-image-container">
        <img className={imageClasses} src={image} alt={title} />
      </a>
      <div className='carousel-item-text'>
        <h3 className="carousel-item-title">{title}</h3>
        <p className="carousel-item-description">{description}</p>
      </div>
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
      currentActiveItem: 0,
      maxCarouselItems,
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
    const { currentActiveItem: activeItem } = this.state;
    const newActiveItemIndex = (
      activeItem === 0 ? maxCarouselItems - 1 : activeItem - 1
    );

    this.setState({
      ...this.state,
      currentActiveItem: newActiveItemIndex,
      prevActiveItem: activeItem,
    });
  }

  handleGoRight() {
    const { currentActiveItem: activeItem } = this.state;
    const newActiveItemIndex = (
      activeItem === maxCarouselItems - 1 ? 0 : activeItem + 1
    );
    this.setState({
      ...this.state,
      currentActiveItem: newActiveItemIndex,
      prevActiveItem: activeItem,
    });
  }

  handleNavCircleClick(index: number): MouseEventHandler {
    return() => {
      this.setState({
        currentActiveItem: index,
        prevActiveItem: this.state.currentActiveItem,
      });
    }
  }

  createCarouselCircles(): ReactElement[] {
    const carouselCircles: ReactElement[] = [];
    const { currentActiveItem: activeItem } = this.state;

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

  render() {
    const { currentActiveItem, prevActiveItem } = this.state;

    return (
      <div className='carousel'>
        <ul className="carousel-container">
          {
            this.state.items?.map(({title, description, image, imageLink}, index) => {
              return (
                <CarouselItem
                  title={title}
                  description={description}
                  image={image}
                  imageLink={imageLink}
                  key={index}
                  isActive={index === currentActiveItem ? true : false}
                  isPrevActive={index === prevActiveItem ? true : false}
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
