import axios from "axios";

const API_URL = 'http://localhost:8080/users';

export const signUp = async (data) => {
    try {
        const response = await axios.post(`${API_URL}`, data);
        return response.data;
    } catch (error) {
        console.error("Sign up error:", error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        console.log('Login Response:', response);
        const jwt = response.headers['authorization'];
        console.log('JWT:', jwt);
        if (jwt) {
            localStorage.setItem('jwt', jwt.split(" ")[1]);
            return response.data;
        } else {
            throw new Error('JWT not received');
        }
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};

const tokenUtility = {
    setToken: (token) => {
        sessionStorage.setItem('jwtToken', token);
    },
    getToken: () => {
        return sessionStorage.getItem('jwtToken');
    },
    clearToken: () => {
        sessionStorage.removeItem('jwtToken');
    }
};