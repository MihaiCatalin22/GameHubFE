import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import reviewService from '../api/ReviewService';

const UserReviews = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      reviewService.getReviewsByUserId(userId)
        .then(response => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching reviews:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews found.</p>;

  return (
    <div className="user-reviews-page">
      <h2>User's Reviews</h2>
      <ul className="posts-list">
        {reviews.map(review => (
          <li key={review.id} className="review-item">
            {review.gameId ? (
              <Link to={`/games/${review.gameId}`} className="review-link">{review.content}</Link>
            ) : (
              <p>Review for deleted or unavailable game</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserReviews;
