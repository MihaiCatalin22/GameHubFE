import React, { useState, useEffect } from 'react';
import userService from '../../services/UserService';
import { useAuth } from '../../../contexts/authContext';
import Modal from '../../Modal';

const PendingRequestsPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      userService.getPendingRequests(user.id)
        .then(response => {
          if (Array.isArray(response.data)) {
            setRequests(response.data);
          } else {
            console.error("Unexpected response data format:", response.data);
            setRequests([]);
          }
        })
        .catch(error => console.error("Failed to fetch pending requests:", error));
    }
  }, [user]);

  const handleResponse = (relationshipId, status) => {
    if (user?.id) {
      userService.respondToFriendRequest(relationshipId, user.id, status)
        .then(() => {
          setModalMessage(status === 'ACCEPTED' ? 'Friend request was accepted!' : 'Friend request was declined.');
          setIsModalOpen(true);
          setRequests(prevRequests => prevRequests.filter(request => request.id !== relationshipId));
        })
        .catch(error => {
          console.error("Failed to respond to friend request:", error);
          setModalMessage('An error occurred while responding to the friend request.');
          setIsModalOpen(true);
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className="pending-requests-page">
      <h2>Pending Friend Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="pending-requests-list">
          {requests.map(request => (
            <li key={request.id} className="pending-request-item">
              {request.user ? (
                <>
                  {request.user.username}
                  <div className="pending-request-actions">
                    <button onClick={() => handleResponse(request.id, 'ACCEPTED')}>Accept</button>
                    <button onClick={() => handleResponse(request.id, 'REJECTED')}>Decline</button>
                  </div>
                </>
              ) : (
                <p>Unknown user</p>
              )}
            </li>
          ))}
        </ul>
      )}
      <Modal 
        isOpen={isModalOpen}
        title="Friend Request Response"
        onClose={handleCloseModal}
        showConfirmButton={false}
        showCancelButton={true}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default PendingRequestsPage;
