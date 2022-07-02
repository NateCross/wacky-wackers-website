import React, { Component, ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewsDbURL = 'http://localhost:5000/reviews/fetchRandom/3';

interface ReviewType {
  userName: string,
  reviewName: string,
  text: string,
  address: string,
  mail: string,
  rating: number,
}

interface ReviewCardType {
  review: ReviewType,
  index?: number,
}

interface ReviewComponentType {
  reviews: ReviewType[],
}

function getStarsFromRating(rating: number): ReactElement[] {
  const stars: ReactElement[] = [];
  for (let i = 1; i <= rating; i++) {
    stars.push(
      <FontAwesomeIcon icon={faStar} key={i} />
    );
  }
  return stars;
}

function ReviewCard({ review, index }: ReviewCardType) {
  return (
    <li className="review-card" key={index}>
      <div className="review-card-header">
        <div className="review-card-star-rating">
          {
            getStarsFromRating(5)
          }
        </div>
        <h3 className="review-card-review-name">
          {review.reviewName}
        </h3>
        <h5 className="review-card-review-username">
          {review.userName}
        </h5>
      </div>
      <hr />
      <div className="review-card-body">
        <p className="review-card-text">
          {review.text}
        </p>
      </div>
      <div className="review-card-footer">
        <p className="review-card-address">
          {review.address}
        </p>
        <p className="review-card-mail">
          {review.mail}
        </p>
      </div>
    </li>
  )
}

class Reviews extends Component<{}, ReviewComponentType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      reviews: [],
    }
  }

  componentDidMount() {
    this.fetchReviews();
  }

  async fetchReviews() {
    const response = await fetch(ReviewsDbURL);

    if (!response.ok) {
      const message = `
        An error occurred: ${response.statusText}
      `;
      window.alert(message);
      return;
    }

    const reviews = await response.json();
    this.setState({
      reviews,
    });
  }

  render() {
    const { reviews } = this.state;

    return (
      <div className="reviews">
        <ul className="reviews-container">
          {
            reviews.map((review, index) => {
              return (
                <ReviewCard
                  review={review}
                  index={index}
                  key={index}
                />
              )
            })
          }
        </ul>
        <div className="review-buttons">
          <button
            className="review-create"
          >
            Leave A Review
          </button>
        </div>
      </div>
    );
  }
}

export default Reviews;
