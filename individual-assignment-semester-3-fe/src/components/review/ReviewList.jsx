import React from 'react';

const ReviewsList = ({ reviews }) => {
  return (
    <div className="reviews-list">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-rating">{`Rating: ${review.rating}`}</div>
            <div className="review-text">{review.text}</div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to write a review!</p>
      )}
    </div>
  );
};
export default ReviewsList;