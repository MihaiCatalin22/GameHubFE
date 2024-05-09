import React, { useState, useEffect } from "react";
import gameService from "../services/GameService";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/authContext';

const GamesList = ({ onSelect }) => {
  const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

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

    const handleAddGame = () => {
      navigate("/add-game");
    };

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const filteredGames = games.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="games-list-page">
        <h2>Games</h2>
        <input
          type="text"
          className="user-search-input"
          placeholder="Search games..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {filteredGames.map((game) => (
          <div key={game.id} onClick={() => handleGameSelect(game.id)} className="game-summary">
            <h3>{game.title}</h3>
          </div>
        ))}
        {user && user.role.includes('ADMINISTRATOR') && (
          <button onClick={handleAddGame} className="button add-game-button">
            Add New Game
          </button>
        )}
      </div>
    );
  };

export default GamesList;