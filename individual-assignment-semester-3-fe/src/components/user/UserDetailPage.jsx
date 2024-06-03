import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/UserService';
import { useAuth } from '../../contexts/authContext';
import AddFriendButton from './friends/FriendRequest';
import default_image from '../../icons/default_image.jpg';

const UserDetailPage = () => {
  const { userId } = useParams();
  const { user, hasRole } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();

  const checkFriendStatus = async () => {
    try {
      const friendsResponse = await userService.getFriends(user.id);
      const friends = friendsResponse.data;
      const isAlreadyFriend = friends.some(friend =>
        (friend.user.id === parseInt(userId) && friend.status === 'ACCEPTED') ||
        (friend.friend.id === parseInt(userId) && friend.status === 'ACCEPTED')
      );
      setIsFriend(isAlreadyFriend);

      const pendingRequestsResponse = await userService.getPendingRequests(user.id);
      const pendingRequests = pendingRequestsResponse.data;
      const requestAlreadySent = pendingRequests.some(request => request.user.id === parseInt(userId));
      setRequestSent(requestAlreadySent);
    } catch (error) {
      console.error("Failed to check friend status or pending requests:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userService.getUserById(userId);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
    checkFriendStatus();
  }, [userId, user.id]);

  if (!userDetails) {
    return <div>Loading user details...</div>;
  }

  const profilePictureUrl = userDetails.profilePicture
    ? `http://localhost:8080/images/${userDetails.profilePicture}`
    : default_image;

    return (
      <div className="profile-content">
        <h2 className="profile-header">User Profile</h2>
        <img src={profilePictureUrl} alt="Profile" className="profile-picture"/>
        <p className="profile-detail">Username: {userDetails.username}</p>
        {hasRole('ADMINISTRATOR') && <p className="profile-detail">Email: {userDetails.email}</p>}
        <p className="profile-detail">Bio: {userDetails.description}</p>
        <div className="button-group">
          <button onClick={() => navigate(`/user/${userId}/posts`)} className="button">View user's posts</button>
          <button onClick={() => navigate(`/user/${userId}/reviews`)} className="button">View user's reviews</button>
          <button onClick={() => navigate(`/user/${userId}/library`)} className="button">View user's games</button>
          {user?.id !== parseInt(userId) && !isFriend && <AddFriendButton targetUserId={parseInt(userId)} />}
        </div>
        {user?.id !== parseInt(userId) && isFriend && <p>You are already friends</p>}
      </div>
    );
};

export default UserDetailPage;