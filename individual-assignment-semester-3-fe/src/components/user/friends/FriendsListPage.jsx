import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../../services/UserService';
import { useAuth } from '../../../contexts/authContext';

const FriendsListPage = () => {
  const { userId: routeUserId } = useParams();
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = routeUserId || (user ? user.id : null);

  useEffect(() => {
    if (userId) {
      userService.getFriends(userId)
        .then(response => {
          console.log('Friends response:', response.data);
          setFriends(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch friends:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="friends-list-page">
      <h2>Friends List</h2>
      {friends.length === 0 ? (
        <p>You have no friends yet.</p>
      ) : (
        <ul className="friends-list">
          {friends.map(friend => (
            <li key={friend.id} className="friend-item">
              {friend.user.id === userId ? friend.friend.username : friend.user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsListPage;
