import React, { useState, useEffect }from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gameService from '../services/GameService';
import reviewService from '../services/ReviewService';
import ReviewsList from '../review/ReviewList';

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log("Game ID in GameDetailsPage:", gameId);
  useEffect(() => {
      setLoading(true);
      setError('');
  
      gameService.getGameById(gameId)
          .then(response => {
              console.log('Game:', response.data);
              setGame(response.data);
              setLoading(false);
          })
          .catch(error => {
              console.error('Error fetching game details:', error);
              setError('Failed to load game details.');
              setLoading(false);
          });
  }, [gameId]);

  const handleReviewButton = () => {
    navigate(`/games/${gameId}/review`);
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
  