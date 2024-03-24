import React from 'react';

const Game = ({ game }) => {
    if (!game) {
        return <div className="text-center mt-4"> No game has been selected. </div>;
    }

    return (
        <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">{game.name}</h2>
            <p className="mt-2">Genre: {game.genre}</p>
            <p>Release date: {game.releaseDate}</p>
            <p className="mb-4">Description: {game.description}</p>
        </div>
    );
};

export default Game;