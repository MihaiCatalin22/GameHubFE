import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import gameService from '../services/GameService';
// import ReviewForm from '../review/ReviewForm';
// import ReviewsList from '../review/ReviewList';

const GameDetailsPage = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
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
    }, [gameId]); // Correctly closed useEffect hook
  
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
            {/* Additional game details here */}
            {/* Uncomment the following when review functionality is ready
            <ReviewsList reviews={reviews} />
            <ReviewForm onReviewSubmit={handleReviewSubmit} />
            */}
          </>
        ) : (
          <p>Game not found.</p>
        )}
      </div>
    );
  };
  
  export default GameDetailsPage;