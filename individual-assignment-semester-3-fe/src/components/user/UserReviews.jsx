import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import reviewService from '../services/ReviewService';

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
    <div>
      <h2>User's Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          {review.gameId ?
            <Link to={`/games/${review.gameId}`}>{review.content}</Link> :
            <p>Review for deleted or unavailable game</p>
          }
        </div>
      ))}
    </div>
  );
};
export default UserReviews;
