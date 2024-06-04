import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gameService from '../api/GameService';
import reviewService from '../api/ReviewService';
import ReviewsList from '../components/ReviewList';
import GameForm from './GameForm';
import { useAuth } from '../contexts/authContext';
import purchaseService from '../api/PurchaseService';
import Modal from '../components/Modal';

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [ownsGame, setOwnsGame] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameResponse = await gameService.getGameById(gameId);
        const reviewsResponse = await reviewService.getReviewsByGameId(gameId);
        setGame(gameResponse.data);
        setReviews(reviewsResponse.data);
        setAverageRating(calculateAverageRating(reviewsResponse.data));

        if (user) {
          const ownershipResponse = await purchaseService.checkOwnership(user.id, gameId);
          setOwnsGame(ownershipResponse.data);
        }
      } catch (error) {
        console.error('Error fetching game details or reviews:', error);
        setError('Failed to load game details or reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameId, user]);

  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const handleDeleteGame = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteGame = async () => {
    try {
      await gameService.deleteGame(gameId);
      navigate('/games');
    } catch (error) {
      console.error('Error deleting game:', error);
      setError('Failed to delete game.');
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleToggleEditMode = () => {
    navigate(`/games/edit/${gameId}`);
  };

  const handleReviewButton = () => {
    if (ownsGame) {
      navigate(`/games/${gameId}/review`);
    } else {
      setModalMessage('Please purchase the game first in order to leave a review.');
      setShowModal(true);
    }
  };

  const handlePurchaseGame = async () => {
    if (!user) {
      setModalMessage('Please log in to purchase.');
      setShowModal(true);
      return;
    }

    try {
      await purchaseService.purchaseGame(user.id, gameId);
      setModalMessage('Purchase successful!');
      setOwnsGame(true);
    } catch (error) {
      setModalMessage(
        'Purchase failed: ' + (error.response?.data || error.message)
      );
    } finally {
      setShowModal(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="game-details-page">
      {game ? (
        <>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
          {game.genres && <p>Genres: {game.genres.join(', ')}</p>}
          <p>Price: {game.price} €</p>
          <div className="average-rating">
            Average Rating: {averageRating} / 5.0
          </div>
          {user && user.role.includes('ADMINISTRATOR') && (
            <>
              <button onClick={handleToggleEditMode} className="button">Edit Game</button>
              <button onClick={handleDeleteGame} className="button">Delete Game</button>
            </>
          )}
          {ownsGame ? (
            <p>You already own this game.</p>
          ) : (
            user ? (
              <button
                onClick={handlePurchaseGame}
                disabled={false}
                className="button"
              >
                Purchase
              </button>
            ) : (
              <p>Please log in to purchase this game.</p>
            )
          )}
          <button onClick={handleReviewButton} className="button">Write a Review</button>
          <ReviewsList reviews={reviews} />
          {showModal && (
            <Modal isOpen={showModal} title="Notification" onClose={() => setShowModal(false)}>
              <p>{modalMessage}</p>
            </Modal>
          )}
          {showDeleteModal && (
            <Modal 
              isOpen={showDeleteModal} 
              title="Confirm Delete" 
              onClose={() => setShowDeleteModal(false)}
              onConfirm={confirmDeleteGame}
              showConfirmButton={true}
              showCancelButton={true}
            >
              <p>Are you sure you want to delete this game?</p>
            </Modal>
          )}
        </>
      ) : (
        <p>Game not found.</p>
      )}
    </div>
  );
};

export default GameDetailsPage;
