import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reviewService from '../services/ReviewService';
import { useAuth } from '../../contexts/authContext';

const UserReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      reviewService.getReviewsByUserId(user.id)
        .then(response => {
          console.log('Reviews fetched:', response.data);
          setReviews(response.data);
          setLoading(false);  // Set loading to false after data is fetched
        })
        .catch(error => {
          console.error("Error fetching reviews:", error);
          setError('Failed to load reviews.');  // Set a user-friendly error message
          setLoading(false);  // Ensure loading is set to false even when there is an error
        });
    } else {
      setLoading(false); // Set loading to false if there is no user id
      setError('User not identified.'); // Optional: set an error if no user id is found
    }
  }, [user?.id]);
  
  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews found.</p>;
  return (
    <div>
      <h2>User's Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <Link to={`/games/${review.game.id}`}>{review.content}</Link>
        </div>
      ))}
    </div>
  );
};

export default UserReviews;