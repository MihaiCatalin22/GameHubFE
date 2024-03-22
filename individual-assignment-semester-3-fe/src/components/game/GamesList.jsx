import React from "react";
import mockGames from "../mockData/mockGames.jsx";

const GamesList = ({ onSelect }) => {
    return (
        <div>
            <h2>Games List</h2>
            {mockGames.map((game) => (
                <div key={game.id} onClick={() => onSelect(game)}>
                    <h3>{game.name}</h3>
                    <p>{game.genre}</p>
                </div>
            ))}
        </div>
    );
};

export default GamesList;