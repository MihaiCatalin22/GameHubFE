import React, { useState } from 'react';

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReviewSubmit({ rating, text: reviewText });
    setRating(0);
    setReviewText('');
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="rating-container">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`star ${rating > index ? 'filled' : ''}`}
            onClick={() => setRating(index + 1)}
          >
            ☆
          </button>
        ))}
      </div>
      <textarea
        className="review-text"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Your review"
        required
      />
      <input type="submit" value="Submit Review" />
    </form>
  );
};

export default ReviewForm;