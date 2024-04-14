import axios from 'axios'

const API_URL = 'http://localhost:8080/categories'

const getCategories = () => {
    return axios.get(`${API_URL}`);
  };

const categoryService = {
    getCategories
}

export default categoryService;