import React, { useState, useEffect } from "react";
import gameService from "../services/GameService";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


const GamesList = ({ onSelect }) => {
  const navigate = useNavigate();
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

    const handleGameSelect = (gameId) => {
      navigate(`/games/${gameId}`);
    };
    return (
    <div className="games-list">
      {games.map((game) => (
        <div key={game.id} onClick={() => handleGameSelect(game.id)} className="game-summary">
          <h3>{game.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default GamesList;