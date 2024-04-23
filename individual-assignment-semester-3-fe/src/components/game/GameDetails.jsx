import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gameService from '../services/GameService';
import reviewService from '../services/ReviewService';
import ReviewsList from '../review/ReviewList';
// import GameForm from './GameForm';
// import { useAuth } from '../../contexts/authContext';


const GameDetailsPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // const { user } = useAuth();
    // const [editing, setEditing] = useState(false);


    useEffect(() => {
      // if (!editing) { 
        setLoading(true);
        setError('');

        const fetchData = async () => {
            try {
                const gameResponse = await gameService.getGameById(gameId);
                setGame(gameResponse.data);
                const reviewsResponse = await reviewService.getReviewsByGameId(gameId);
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
    }, [gameId]); //, editing]);
  
    const calculateAverageRating = (reviews) => {
      if (!reviews.length) return 0;
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (total / reviews.length).toFixed(1);
    };

    // const handleEditGame = () => {
    //   setEditing(true);
    // };

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
        {/* {!editing ? (
          <> */}
          {game ? (
            <>
              <h1>{game.title}</h1>
              <p>{game.description}</p>
              {game.genres && <p>Genres: {game.genres.join(', ')}</p>}
              <div className="average-rating">
                Average Rating: {averageRating} / 5
              </div>
              <button onClick={handleReviewButton} className="button">Write a Review</button>
              {/* {user && user.role === 'ADMINISTRATOR' && (
              <button onClick={handleEditGame} className="button">Edit Game</button>
              )} */}
              <ReviewsList reviews={reviews} />
            </>
          ) : (
            <p>Game not found.</p>
          )}
        {/* </> */}
        {/* // ) : (
                 <GameForm onSave={() => setEditing(false)} initialData={game} />
             )} */}
      </div>
    );
  };
  
  export default GameDetailsPage;
  