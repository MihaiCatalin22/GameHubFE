import React from 'react';

const Game = ({ game }) => {
    if (!game) {
        return <div className="text-center mt-4">No game has been selected.</div>;
    }

    const formattedReleaseDate = game.releaseDate 
        ? new Date(game.releaseDate).toLocaleDateString() 
        : "Unknown";

    // return (
    //     <div className="text-center mt-4">
    //         <h2 className="text-2xl font-bold">{game.title}</h2>
    //         <p className="mt-2">Genre: {game.genres.join(', ')}</p>
    //         <p>Release date: {formattedReleaseDate}</p>
    //         <p className="mb-4">Description: {game.description}</p>
    //     </div>
    // );
};

export default Game;