import React from 'react';

const Game = ({ game }) => {
    if (!game) {
        return <div className="text-center mt-4">No game has been selected.</div>;
    }

    const formattedReleaseDate = game.releaseDate 
        ? new Date(game.releaseDate).toLocaleDateString() 
        : "Unknown";

        <div className="game-details">
        <h2 className="game-details-title">{game.title}</h2>
        <p className="game-details-genre">Genre: {game.genres.join(', ')}</p>
        <p className="game-details-release">Release date: {formattedReleaseDate}</p>
        <p className="game-details-description">Description: {game.description}</p>
      </div>
};

export default Game;