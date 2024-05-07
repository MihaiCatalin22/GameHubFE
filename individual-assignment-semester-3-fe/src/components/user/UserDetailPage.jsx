import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/UserService';
import { useAuth } from '../../contexts/authContext';
import forumService from '../services/ForumService';
import reviewService from '../services/ReviewService';


const UserDetailPage = () => {
  const { userId } = useParams();
  const { user, hasRole } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    userService.getUserById(userId)
      .then(response => setUserDetails(response.data))
      .catch(error => console.error("Failed to fetch user details:", error));

    forumService.getPostsByUserId(userId)
      .then(response => setPosts(response.data))
      .catch(error => console.error("Failed to fetch posts:", error));

    reviewService.getReviewsByUserId(userId)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Failed to fetch reviews:", error));
  }, [userId]);

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  const profilePictureUrl = userDetails.profilePicture
    ? `http://localhost:8080/images/${userDetails.profilePicture}`
    : 'http://localhost:8080/images/default_image.jpg';

  return (
    <div className="profile-content">
      <h2 className="profile-header">User Profile</h2>
      <img src={profilePictureUrl} alt="Profile" className="profile-picture"/>
      <p className="profile-detail">Username: {userDetails.username}</p>
      {hasRole('ADMINISTRATOR') && <p className="profile-detail">Email: {userDetails.email}</p>}
      <p className="profile-detail">Bio: {userDetails.description}</p>
      <button onClick={() => navigate(`/user/${userId}/posts`)} className="button">View user's posts</button>
      <button onClick={() => navigate(`/user/${userId}/reviews`)} className="button">View user's reviews</button>
    </div>
  );
};

export default UserDetailPage;