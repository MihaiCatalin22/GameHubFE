import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:8080/users';

const TokenManager = {
    getAccessToken: () => sessionStorage.getItem("accessToken"),
    getClaims: () => {
        const claims = sessionStorage.getItem("claims");
        return claims ? JSON.parse(claims) : undefined;
    },
    setAccessToken: (token) => {
        sessionStorage.setItem("accessToken", token);
        const claims = jwtDecode(token);
        sessionStorage.setItem("claims", JSON.stringify(claims));
        return claims;
    },
    clear: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("claims");
    }
};

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
            const token = jwt.split(" ")[1];
            const claims = TokenManager.setAccessToken(token);
            console.log('Decoded JWT Claims:', claims);
            return response.data;
        } else {
            throw new Error('JWT not received');
        }
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};

export default TokenManager;