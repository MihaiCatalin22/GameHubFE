import React, { useState, useEffect } from 'react';
import Game from './Game';
import GameForm from '../pages/GameForm';
import GamesList from '../pages/GamesList';
import gameService from '../api/GameService';
import { useAuth } from '../contexts/authContext';


const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const { hasRole } = useAuth();

  useEffect(() => {
    gameService.getAllGames()
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error("Error fetching games:", error);
      });
  }, []);

  const saveGame = (gameData) => {
    if (gameData.id) {
      gameService.updateGame(gameData.id, gameData)
        .then(response => {
          setGames(games.map(game => (game.id === gameData.id ? response.data : game)));
          setSelectedGame(null);
        })
        .catch(error => {
          console.error("Error updating game:", error);
        });
    } else {
      gameService.createGame(gameData)
        .then(response => {
          setGames([...games, response.data]);
          setSelectedGame(null);
        })
        .catch(error => {
          console.error("Error creating game:", error);
        });
    }
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  const handleAddNewGame = () => {
    setSelectedGame({
      title: '',
      genres: [],
      releaseDate: '',
      description: '',
      developer: '',
      price: '',
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4">
        {selectedGame ? (
          <GameForm onSave={saveGame} initialData={selectedGame} />
        ) : (
          <>
            <GamesList onSelect={handleSelectGame} />
            {hasRole('ADMINISTRATOR') && (
              <button onClick={handleAddNewGame} className="button">
                Add New Game
              </button>
            )}
          </>
        )}
        {selectedGame && <Game game={selectedGame} />}
      </div>
    </div>
  );
};

export default GamesPage;