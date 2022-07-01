import React, { Component } from 'react'

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

class Reviews extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div className="reviews">
        <p>Hello World!</p>
        <ReviewCard />
      </div>
    );
  }
}

export default Reviews;
