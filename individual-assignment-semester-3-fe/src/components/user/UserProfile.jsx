import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>No user selected</div>;
  }

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleViewPosts = () => {
    navigate(`/user/${user.id}/posts`);
  };

  const handleViewReviews = () => {
    navigate(`/user/${user.id}/reviews`);
  };

  const handleViewPurchases = () => {
    navigate(`/user/${user.id}/purchases`);
  };

  const handleViewLibrary = () => {
    navigate(`/user/${user.id}/library`);
  };

  const handleViewPendingRequests = () => {
    navigate(`/pending-requests`);
  };

  const handleViewFriendsList = () => {
    navigate(`/friends`);
  };

  return (
    <div className="profile-content">
      <h2 className="profile-header">Your Profile</h2>
      <img src={user.profilePicture ? `http://localhost:8080/images/${user.profilePicture}` : 'http://localhost:8080/images/default_image.jpg'} alt="Profile" className="profile-picture"/>
      <p className="profile-detail">Username: {user.username}</p>
      <p className="profile-detail">Email: {user.email}</p>
      <p className="profile-detail">Bio: {user.description}</p>
      <button onClick={handleEditProfile} className="button">Edit Profile</button>
      <button onClick={handleViewPosts} className="button">Your Posts</button>
      <button onClick={handleViewReviews} className="button">Your Reviews</button>
      <button onClick={handleViewPurchases} className="button">Your Purchases</button>
      <button onClick={handleViewLibrary} className="button">Game Library</button>
      <button onClick={handleViewPendingRequests} className="button">Pending Requests</button>
      <button onClick={handleViewFriendsList} className="button">Friends List</button>
    </div>
  );
};

export default UserProfile;