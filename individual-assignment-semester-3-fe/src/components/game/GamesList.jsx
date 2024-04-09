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
        <div className="games-list-container">
            <h2 className="text-2xl font-bold">Games List</h2>
            {games.map((game) => (
                <div key={game.id} onClick={() => onSelect(game)} className="games-list-item">
                <h3 className="game-list-title">{game.title}</h3>
                <p className="game-list-genres">{game.genres.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default GamesList;