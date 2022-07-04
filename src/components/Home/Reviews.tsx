import React, { Component, FormEvent, FormEventHandler, MouseEventHandler, ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Button, FormButton } from "../Buttons";
import { Modal } from "../Modal";

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
  modalIsVisible: boolean,
}

interface ReviewFormType {
  onClose: MouseEventHandler,
  onSubmit: FormEventHandler,
}

const ModalHeader = {
  text: "Leave A Review",
  className: "modal-review-header",
}

const ModalBody = {
  text: "",
  className: "modal-review-body",
}

function ReviewForm({ onSubmit, onClose }: ReviewFormType) {
  return (
    <form onSubmit={onSubmit}>
      <div className="modal-review-buttons">
        <FormButton
          type="submit"
          value="Submit Review"
        />
        <Button
          onClick={onClose}
          text="Cancel"
        />
      </div>
    </form>

  );
}


function ReviewCard({ review, index }: ReviewCardType) {
  function getStarsFromRating(rating: number): ReactElement[] {
    const stars: ReactElement[] = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} />
      );
    }
    return stars;
  }

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
        <h4 className="review-card-review-username">
          {review.userName}
        </h4>
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
      modalIsVisible: false,
    };
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

  handleLeaveReviewClick = () => {
    this.setState({
      modalIsVisible: true,
    });
  }

  handleModalClose = () => {
    this.setState({
      modalIsVisible: false,
    });
  }

  handleSubmitReview = (e: FormEvent) => {
    // TODO: Make review form
    e.preventDefault();
    console.log("Review submitted");
  }

  render() {
    const { reviews, modalIsVisible } = this.state;

    return (
      <div className="reviews">
        <ul className="reviews-container">
          {
            /* TODO: Move this into own function/component */
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
          <Button
            onClick={this.handleLeaveReviewClick}
            text="Leave A Review"
          />
        </div>
        <div className="review-modal">
          <Modal
            isVisible={modalIsVisible}
            header={ModalHeader}
            body={ModalBody}
            onClose={this.handleModalClose}
            containerClassName="modal-review-container"
          >
            <ReviewForm
              onSubmit={this.handleSubmitReview}
              onClose={this.handleModalClose}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Reviews;
