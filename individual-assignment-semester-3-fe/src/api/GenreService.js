import axios from 'axios';

const API_URL = 'http://localhost:8080/genres'

const getGenres = () => {
    return axios.get(API_URL);
  };

const GenreService = {
    getGenres
};

export default GenreService;