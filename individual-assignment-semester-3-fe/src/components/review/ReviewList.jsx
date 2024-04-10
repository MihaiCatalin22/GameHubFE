import React from 'react';

const ReviewsList = ({ reviews }) => {
  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="review-rating">{`Rating: ${review.rating}`}</div>
          <div className="review-text">{review.text}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;