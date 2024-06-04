import React, { useEffect, useState } from 'react';
import recommendationService from '../api/RecommendationService';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();  
    const navigate = useNavigate();

    useEffect(() => {
      if (user && user.id) { 
        setIsLoading(true);
        recommendationService.fetchRecommendations(user.id)
          .then(response => {
            const uniqueGames = Array.from(new Set(response.data.map(game => game.id)))
              .map(id => {
                return response.data.find(game => game.id === id);
              });
            setGames(uniqueGames);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching recommendations:', error);
            setError('Failed to fetch recommendations');
            setIsLoading(false);
          });
      }
    }, [user]);
  
    const handleGameSelect = (gameId) => {
        navigate(`/games/${gameId}`); 
      };

    if (!user) return <div>Please sign in to see your game recommendations.</div>;
    if (isLoading) return <div>Loading recommendations...</div>;
    if (error) return <div>{error}</div>;
    if (games.length === 0) return <div>No recommendations available.</div>;
  
    return (
        <div className="recommendations-container">
          <h2>Recommended for You</h2>
          <ul className="recommendations-list">
          {games.map(game => (
          <li key={game.id} onClick={() => handleGameSelect(game.id)} className="recommendations-item">
            {game.title} - {game.genres.join(', ')}
          </li>
        ))}
          </ul>
        </div>
      );
    }

export default Recommendations;