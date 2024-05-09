import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gameService from '../services/GameService';
import reviewService from '../services/ReviewService';
import ReviewsList from '../review/ReviewList';
import GameForm from './GameForm';
import { useAuth } from '../../contexts/authContext';
import purchaseService from '../services/PurchaseService';

const GameDetailsPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const [purchaseMessage, setPurchaseMessage] = useState('');
    const [purchaseLoading, setPurchaseLoading] = useState(false);


    useEffect(() => {
      setLoading(true);
      setError('');

      const fetchData = async () => {
          try {
              const gameResponse = await gameService.getGameById(gameId);
              const reviewsResponse = await reviewService.getReviewsByGameId(gameId);
              setGame(gameResponse.data);
              setReviews(reviewsResponse.data);
              setAverageRating(calculateAverageRating(reviewsResponse.data));
          } catch (error) {
              console.error('Error fetching game details or reviews:', error);
              setError('Failed to load game details or reviews.');
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [gameId]);

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
  
    if (!game) return <div>Loading...</div>;
  
    const handleReviewButton = () => {
      navigate(`/games/${gameId}/review`);
    };
    
    const handlePurchaseGame = async () => {
      if (!user) {
          setPurchaseMessage('Please log in to purchase.');
          return;
      }

      setPurchaseLoading(true);
      setPurchaseMessage('');

      try {
          await purchaseService.purchaseGame(user.id, gameId);
          setPurchaseMessage('Purchase successful!');
      } catch (error) {
          setPurchaseMessage(
              'Purchase failed: ' + (error.response?.data || error.message)
          );
      } finally {
          setPurchaseLoading(false);
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
          {user ? (
                        <button
                            onClick={handlePurchaseGame}
                            disabled={purchaseLoading}
                            className="button"
                        >
                            {purchaseLoading ? 'Processing...' : 'Purchase'}
                        </button>
                    ) : (
                        <p>Please log in to purchase this game.</p>
                    )}
                    {purchaseMessage && <p>{purchaseMessage}</p>}
          <button onClick={handleReviewButton} className="button">Write a Review</button>
          <ReviewsList reviews={reviews} />
        </>
      ) : (
        <p>Game not found.</p>
      )}
      </div>
    );
  };
  
  export default GameDetailsPage;
  