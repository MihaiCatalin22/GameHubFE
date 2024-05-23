import React, { useEffect, useState } from "react";
import EventService from '../services/EventService';
import { useNavigate } from "react-router-dom";

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPastEvents();
    }, []);

    const fetchPastEvents = async () => {
        const response = await EventService.getAllEvents();
        const now = new Date();
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        const filteredPastEvents = response.data.filter(event => new Date(event.endDate) <= oneWeekAgo);
        setPastEvents(filteredPastEvents);
    };

    return (
        <div className="past-events-list">
            <h2>Past Events</h2>
            {pastEvents.length > 0 ? pastEvents.map(event => (
                <div key={event.id} className="event-item">
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <button onClick={() => navigate(`/events/${event.id}`)} className="button">View Details</button>
                </div>
            )) : (
                <p>No past events found.</p>
            )}
        </div>
    );
};

export default PastEvents;