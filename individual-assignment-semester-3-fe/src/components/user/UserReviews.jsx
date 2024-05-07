import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reviewService from '../services/ReviewService';
import { useAuth } from '../../contexts/authContext';

const UserReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      reviewService.getReviewsByUserId(user.id)
        .then(response => {
          console.log('Full Response:', response);
          console.log('Reviews fetched:', response.data);
          response.data.forEach(review => {
            console.log(`Review ID: ${review.id}, Game ID: ${review.gameId ? review.gameId : 'No game associated'}`);
          });
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
  }, [user?.id]);

  if (loading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews found.</p>;

  return (
    <div>
      <h2>User's Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          {/* Check for the existence of gameId before rendering the Link */}
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
