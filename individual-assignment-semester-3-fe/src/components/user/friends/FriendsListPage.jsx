import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate} from 'react-router-dom';
import userService from '../../services/UserService';
import { useAuth } from '../../../contexts/authContext';
import Modal from '../../Modal';

const FriendsListPage = () => {
  const { userId: routeUserId } = useParams();
    const { user } = useAuth();
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [resultMessage, setResultMessage] = useState('');
    const userId = routeUserId || (user ? user.id : null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            userService.getFriends(userId)
                .then(response => {
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

    const handleShowModal = (friend) => {
        setSelectedFriend(friend);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFriend(null);
    };

    const handleShowConfirmModal = () => {
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleShowResultModal = (message) => {
        setResultMessage(message);
        setShowResultModal(true);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
        setResultMessage('');
    };

    const handleRemoveFriend = () => {
        if (selectedFriend) {
            userService.removeFriend(selectedFriend.id)
                .then(() => {
                    setFriends(friends.filter(friend => friend.id !== selectedFriend.id));
                    handleCloseConfirmModal();
                    handleCloseModal();
                    handleShowResultModal('Friend successfully removed.');
                })
                .catch(error => {
                    console.error("Failed to remove friend:", error);
                    handleCloseConfirmModal();
                    handleShowResultModal(`Failed to remove friend: ${error.response ? error.response.data : error.message}`);
                });
        }
    };

    const handleViewProfile = () => {
        if (selectedFriend) {
            const friendId = selectedFriend.user.id === userId ? selectedFriend.friend.id : selectedFriend.user.id;
            navigate(`/users/${friendId}`);
            handleCloseModal();
        }
    };

    const handleOpenChat = () => {
        if (selectedFriend) {
            const friendId = selectedFriend.user.id === userId ? selectedFriend.friend.id : selectedFriend.user.id;
            navigate(`/chat/${friendId}`);
            handleCloseModal();
        }
    };

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
                        <li key={friend.id} className="friend-item" onClick={() => handleShowModal(friend)}>
                            {friend.user.id === userId ? friend.friend.username : friend.user.username}
                        </li>
                    ))}
                </ul>
            )}

            <Modal
                isOpen={showModal}
                title="Friend Options"
                onClose={handleCloseModal}
                showCancelButton={true}
            >
                {selectedFriend && (
                    <>
                        <p>What would you like to do with {selectedFriend.user.id === userId ? selectedFriend.friend.username : selectedFriend.user.username}?</p>
                        <button onClick={handleViewProfile} className="modal-button">
                            View Profile
                        </button>
                        <button onClick={handleShowConfirmModal} className="modal-button">
                            Remove Friend
                        </button>
                        <button onClick={handleOpenChat} className="modal-button">
                            Open Chat
                        </button>
                    </>
                )}
            </Modal>

            <Modal
                isOpen={showConfirmModal}
                title="Confirm Removal"
                onClose={handleCloseConfirmModal}
                showCancelButton={true}
                onConfirm={handleRemoveFriend}
                showConfirmButton={true}
            >
                <p>Are you sure you want to remove {selectedFriend && (selectedFriend.user.id === userId ? selectedFriend.friend.username : selectedFriend.user.username)} from your friends list?</p>
            </Modal>

            <Modal
                isOpen={showResultModal}
                title="Result"
                onClose={handleCloseResultModal}
                showCancelButton={false}
                showConfirmButton={true}
                onConfirm={handleCloseResultModal}
            >
                <p>{resultMessage}</p>
            </Modal>
        </div>
    );
};

export default FriendsListPage;
