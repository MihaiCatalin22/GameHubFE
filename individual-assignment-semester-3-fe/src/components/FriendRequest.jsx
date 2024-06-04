import React, {useState, useEffect} from 'react';
import userService from '../api/UserService';
import { useAuth } from '../contexts/authContext';
import Modal from './Modal';

const AddFriendButton = ({ targetUserId }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const friendsResponse = await userService.getFriends(user.id);
        const friends = friendsResponse.data;
        const isAlreadyFriend = friends.some(friend =>
          (friend.user.id === targetUserId && friend.status === 'ACCEPTED') ||
          (friend.friend.id === targetUserId && friend.status === 'ACCEPTED')
        );
        setIsFriend(isAlreadyFriend);
      } catch (error) {
        console.error("Failed to check friend status:", error);
      }
    };

    checkFriendStatus();
  }, [user.id, targetUserId]);

  const handleSendRequest = async () => {
    try {
      const pendingRequestsResponse = await userService.getPendingRequests(user.id);
      const pendingRequests = pendingRequestsResponse.data;
      const requestAlreadySent = pendingRequests.some(request => request.user.id === targetUserId);
      if (requestAlreadySent) {
        setModalMessage('You have already sent a friend request to this user.');
        setIsModalOpen(true);
        return;
      }

      await userService.sendFriendRequest(user.id, targetUserId);
      setModalMessage('Friend request sent successfully!');
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to send friend request:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage('You have already sent a friend request to this user or an error has occurred.');
      }
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  if (isFriend) {
    return <p>You are already friends with this user.</p>;
  }

  return (
    <>
      <button className="button" onClick={handleSendRequest}>Send Friend Request</button>
      <Modal 
        isOpen={isModalOpen}
        title="Friend Request Status"
        onClose={handleCloseModal}
        showConfirmButton={false}
        showCancelButton={true}
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

export default AddFriendButton;