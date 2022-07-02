import React, { Component } from 'react'

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
}

interface ReviewComponentType {
  reviews: ReviewType[],
}

function ReviewCard({ review }: ReviewCardType) {
  return (
    <li className="review-card">
      <h3 className="review-card-review-name">
        {review.reviewName}
      </h3>
      <h5 className="review-card-review-username">
        {review.userName}
      </h5>
      <p className="review-card-text">
        {review.text}
      </p>
      <p className="review-card-address">
        {review.address}
      </p>
      <p className="review-card-mail">
        {review.mail}
      </p>
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
                  key={index}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Reviews;
