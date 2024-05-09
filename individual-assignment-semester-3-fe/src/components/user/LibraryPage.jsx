import React, { useState, useEffect } from 'react';
import gameService from '../services/GameService';
import { useAuth } from '../../contexts/authContext';

const LibraryPage = () => {
    const { user } = useAuth();
    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (user) {
        fetchLibrary();
      }
    }, [user]);
  
    const fetchLibrary = async () => {
      setLoading(true);
      setError('');
      try {
        const gamesResponse = await gameService.getGamesByUserId(user.id);
        setLibrary(gamesResponse.data);
      } catch (error) {
        console.error('Error fetching library:', error);
        setError('Failed to load library.');
      } finally {
        setLoading(false);
      }
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
        <div className="library-page">
          <h2>Your Game Library</h2>
          {library.length ? (
            <ul className="library-games-list">
              {library.map((game) => (
                <li
                  key={game.id}
                  className="library-game-item"
                  onClick={() => navigateToGameDetails(game.id)}
                >
                  <div className="library-game-title">{game.title}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No games found.</p>
          )}
        </div>
      );
    };
  
  export default LibraryPage;