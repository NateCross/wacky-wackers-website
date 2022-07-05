import React, { useState, Component, FormEvent, FormEventHandler, MouseEvent, MouseEventHandler, ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { Button, FormButton } from "../Buttons";
import { Modal } from "../Modal";

const ReviewsDbURL = 'http://localhost:5000/reviews/fetchRandom/3';
const ReviewsDbAddURL = 'http://localhost:5000/reviews/add';

interface ReviewType {
  userName: string,
  reviewName: string,
  text: string,
  address: string,
  mail: string,
  tempRating: number,
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
  onSubmitClose: Function,
}

const ModalHeader = {
  text: "Leave A Review",
  className: "modal-review-header",
}

const ModalBody = {
  text: "",
  className: "modal-review-body",
}

function ReviewForm({ onClose, onSubmitClose }: ReviewFormType) {
  const [reviewData, setReviewData] = useState<ReviewType>({
    userName: "",
    text: "",
    reviewName: "",
    address: "",
    mail: "",
    tempRating: 5,
    rating: 5,
  });

  const handleFormFieldChange = (value: Partial<ReviewType>) => {
    return setReviewData((prev) => {
      return { ...prev, ...value}
    });
  };

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();

    // Easy way to get exclude the tempRating property
    const { tempRating, ...review } = reviewData;

    for (const value of Object.values(review)) {
      if (!value) {
        // TODO: Insert error toast here
        return;

      }
    }

    await fetch(ReviewsDbAddURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    onSubmitClose();
  }

  const setTempRatingStars = (rating: number = reviewData.rating) => {
    setReviewData((prev) => {
      return {...prev, tempRating: rating }
    });
  };

  const getRatingStars = (rating: number = reviewData.tempRating): ReactElement[] => {
    const ratingStars: ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratingStars.push(
          <FontAwesomeIcon
            icon={faStar}
            className="review-rating-star rating-star-filled"
            key={i}
            onMouseEnter={() => setTempRatingStars(i)}
            onMouseLeave={() => setTempRatingStars()}
            onClick={() => handleReviewStarClick(i)}
          />
        );
      } else {
        ratingStars.push(
          <FontAwesomeIcon
            icon={faStar}
            className="review-rating-star rating-star-empty"
            key={i}
            onMouseEnter={() => setTempRatingStars(i)}
            onMouseLeave={() => setTempRatingStars()}
            onClick={() => handleReviewStarClick(i)}
          />
        );
      }
    }
    return ratingStars;
  }

  const handleReviewStarClick = (rating: number) => {
    setReviewData((prev) => {
      return { ...prev, rating }
    });
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <div className="modal-review-fields">
        <div className="modal-review-text-content-container">
          <div className="modal-review-field-container">
            <label htmlFor="modal-review-title">
              Title<sup>*</sup>
            </label>
            <input
              type="text"
              className="modal-review-title"
              id="modal-review-title"
              onChange={(e) => handleFormFieldChange({ reviewName: e.target.value })}
            />
          </div>
          <div className="modal-review-field-container">
            <label htmlFor="modal-review-text">
              Review<sup>*</sup>
            </label>
            <textarea
              id="modal-review-text"
              cols={40}
              rows={10}
              onChange={(e) => handleFormFieldChange({ text: e.target.value })}
            />
          </div>
          <div className="modal-review-star-rating-container">
            <>
            <label>Rating<sup>*</sup></label>
            {getRatingStars()}
            </>
          </div>
        </div>
        <div className="modal-review-details-container">
          <div className="modal-review-field-container">
            <label htmlFor="modal-review-name">Name<sup>*</sup></label>
            <input
              type="text"
              className="modal-review-name"
              id="modal-review-name"
              onChange={(e) => handleFormFieldChange({ userName: e.target.value })}
            />
          </div>
          <div className="modal-review-field-container">
            <label htmlFor="modal-review-mail">Email<sup>*</sup></label>
            <input
              type="text"
              className="modal-review-mail"
              id="modal-review-mail"
              onChange={(e) => handleFormFieldChange({ mail: e.target.value })}
            />
          </div>
          <div className="modal-review-field-container">
            <label htmlFor="modal-review-address">Address<sup>*</sup></label>
            <input
              type="text"
              className="modal-review-address"
              id="modal-review-address"
              onChange={(e) => handleFormFieldChange({ address: e.target.value })}
            />
          </div>
        </div>
      </div>
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
              onClose={this.handleModalClose}
              onSubmitClose={this.handleModalClose}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default Reviews;
