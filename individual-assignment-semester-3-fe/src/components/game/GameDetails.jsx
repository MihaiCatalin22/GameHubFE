import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gameService from '../services/GameService';
import reviewService from '../services/ReviewService';
import ReviewsList from '../review/ReviewList';
import GameForm from './GameForm';
import { useAuth } from '../../contexts/authContext';
import purchaseService from '../services/PurchaseService';
import Modal from '../Modal';

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
    if (window.confirm('Are you sure you want to delete this game?')) {
      await gameService.deleteGame(gameId);
      navigate('/games');
    }
  };

  const handleToggleEditMode = () => {
    navigate(`/games/edit/${gameId}`);
  };

  const handleReviewButton = () => {
    navigate(`/games/${gameId}/review`);
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
        </>
      ) : (
        <p>Game not found.</p>
      )}
    </div>
  );
};
  
  export default GameDetailsPage;
  