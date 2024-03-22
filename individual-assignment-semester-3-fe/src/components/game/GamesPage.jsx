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
    <div>
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
  );
};

export default GamesPage;