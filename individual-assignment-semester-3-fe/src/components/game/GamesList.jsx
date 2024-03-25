import React, { useState, useEffect } from "react";
import gameService from "../services/GameService";

const GamesList = ({ onSelect }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAllGames()
          .then(response => {
            setGames(response.data);
          })
          .catch(error => {
            console.error("Error fetching games:", error);
          });
    }, []);

    return (
        <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">Games List</h2>
            {games.map((game) => (
                <div key={game.id} onClick={() => onSelect(game)} className="cursor-pointer p-2 hover:bg-gray-200">
                    <h3 className="text-lg font-semibold">{game.title}</h3>
                    <p>{game.genres.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default GamesList;