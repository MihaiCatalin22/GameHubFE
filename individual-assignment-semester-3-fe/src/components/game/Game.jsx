import React from 'react';

const Game = ({ game }) => {
    if (!game) {
        return <div> No game has been selected. </div>
    }

    return (
        <div>
            <h2>{game.name}</h2>
            <p>Genre: {game.genre}</p>
            <p>Release date: {game.releaseDate}</p>
            <p>Description: {game.description}</p>
        </div>
    );
};

export default Game;