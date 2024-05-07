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
    userService.getUserById(userId).then(response => setUserDetails(response.data)).catch(error => console.error("Failed to fetch user details:", error));
    forumService.getAllPosts(userId).then(res => setPosts(res.data));
    reviewService.getReviewsByUserId(userId).then(res => setReviews(res.data));
  }, [userId]);

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }
  const profilePictureUrl = userDetails.profilePicture
    ? `http://localhost:8080/images/${userDetails.profilePicture}`
    : 'http://localhost:8080/images/default_image.jpg';

  const handleViewPosts = () => {
    navigate(`/users/${userId}/posts`);
  };
  
  const handleViewReviews = () => {
    navigate(`/users/${userId}/reviews`);
  };  
  return (
    <div>
      <h2>User Profile</h2>
      <img src={profilePictureUrl} alt="Profile" className="profile-picture"/>
      <p>Username: {userDetails.username}</p>
      {hasRole('ADMINISTRATOR') && <p>Email: {user.email}</p>}
      <p>Bio: {userDetails.description}</p>
      <button onClick={handleViewPosts} className="button">View user's posts</button>
      <button onClick={handleViewReviews} className="button">View user's reviews</button>
    </div>
  );
};

export default UserDetailPage;