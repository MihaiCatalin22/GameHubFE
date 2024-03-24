import React, { useState } from 'react';
import Game from './Game';
import GameForm from './GameForm';
import GamesList from './GamesList';
import initialGames from '../mockData/mockGames.jsx';

const GamesPage = () => {
  const [games, setGames] = useState(initialGames);
  const [selectedGame, setSelectedGame] = useState(null);

  const saveGame = (gameData) => {
    if (selectedGame) {
      setGames(games.map((game) => (game.id === selectedGame.id ? gameData : game)));
    } else {
      setGames([...games, { ...gameData, id: games.length + 1 }]);
    }
    setSelectedGame(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4">
      {selectedGame ? (
        <GameForm onSave={saveGame} initialData={selectedGame} />
      ) : (
        <>
          <GamesList onSelect={setSelectedGame} />
          <button onClick={() => setSelectedGame({})}>Add New Game</button>
        </>
      )}
      {selectedGame && <Game game={selectedGame} />}
      </div>
    </div>
  );
};

export default GamesPage;