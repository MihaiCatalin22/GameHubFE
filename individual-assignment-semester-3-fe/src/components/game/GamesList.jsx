import React from "react";
import mockGames from "../mockData/mockGames.jsx";

const GamesList = ({ onSelect }) => {
    return (
        <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">Games List</h2>
            {mockGames.map((game) => (
                <div key={game.id} onClick={() => onSelect(game)} className="cursor-pointer p-2 hover:bg-gray-200">
                    <h3 className="text-lg font-semibold">{game.name}</h3>
                    <p>{game.genre}</p>
                </div>
            ))}
        </div>
    );
};

export default GamesList;