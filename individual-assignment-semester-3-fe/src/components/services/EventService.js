import axios from "axios";

const API_URL = 'http://localhost:8080/events';

const createEvent = (eventData) => {
    return axios.post(`${API_URL}`, eventData);
};

const getAllEvents = () => {
    return axios.get(`${API_URL}`);
};

const getEventById = (id, eventData) => {
    return axios.get(`${API_URL}/${id}`, eventData);
};

const updateEvent = (id, eventData) => {
    return axios.put(`${API_URL}/${id}`, eventData);
};

const deleteEvent = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const addParticipant = (eventId, payload) => {
    return axios.post(`${API_URL}/${eventId}/participants`, payload); 
  };

const removeParticipant = (eventId, userId) => {
    return axios.delete(`${API_URL}/${eventId}/participants/${userId}`);
};

const getParticipants = (eventId) => {
    return axios.get(`${API_URL}/${eventId}/participants`);
};

const eventService = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    addParticipant,
    removeParticipant,
    getParticipants
}

export default eventService;