import React from 'react';

const ReviewsList = ({ reviews }) => {
  if (!reviews) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="reviews-list">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <span className="review-username">{review.user?.username}</span>
              <div className="review-rating">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < review.rating ? `rating-${review.rating}` : ''}`}>★</span>
                ))}
              </div>
            </div>
            <div className="review-text">{review.content || 'No comment provided.'}</div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to write a review!</p>
      )}
    </div>
  );
};
export default ReviewsList;