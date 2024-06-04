import React, { useState, useEffect } from "react";
import gameService from "../api/GameService";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/authContext";
import Recommendations from "./Recommendations";
import ReactPaginate from "react-paginate";

const GamesList = ({ onSelect }) => {
  const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const [pageNumber, setPageNumber] = useState(0);
    const gamesPerPage = 5;
    const pagesVisited = pageNumber * gamesPerPage;

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
    const handleViewSalesStats = () => {
      navigate("/admin/sales-stats");
    };
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handlePageClick = ({ selected }) => {
      setPageNumber(selected);
    };

    const filteredGames = games.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayGames = filteredGames
    .slice(pagesVisited, pagesVisited + gamesPerPage)
    .map((game) => (
      <div key={game.id} onClick={() => handleGameSelect(game.id)} className="game-summary">
        <h3>{game.title}</h3>
      </div>
    ));

  const pageCount = Math.ceil(filteredGames.length / gamesPerPage);

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
      <Recommendations />
      <div className="games-list">
        {displayGames}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination__page"}
        pageLinkClassName={"pagination__link"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {user && user.role.includes('ADMINISTRATOR') && (
        <>
          <button onClick={handleAddGame} className="button add-game-button">
            Add New Game
          </button>
          <button onClick={handleViewSalesStats} className="button add-game-button">
            View Sales Statistics
          </button>
        </>
      )}
      
    </div>
  );
};


export default GamesList;