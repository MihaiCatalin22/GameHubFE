import axios from 'axios';

const API_URL = 'http://localhost:8080/games'

const getAllGames = () => {
    return axios.get(API_URL);
  };
  
  const getGameById = (gameId) => {
    return axios.get(`${API_URL}/${gameId}`);
  };
  
  const createGame = (gameData) => {
    return axios.post(API_URL, gameData);
  };
  
  const updateGame = (gameId, gameData) => {
    return axios.put(`${API_URL}/${gameId}`, gameData);
  };
  
  const deleteGame = (gameId) => {
    return axios.delete(`${API_URL}/${gameId}`);
  };
  
  const gameService = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
  };
  
  export default gameService;