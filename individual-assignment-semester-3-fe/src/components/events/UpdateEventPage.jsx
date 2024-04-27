import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "./EventForm";
import EventService from '../services/EventService';

const UpdateEventPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        EventService.getEventById(eventId)
            .then(response => {
                setEvent(response.data);
            })
            .catch(error => console.error('Error fetching event:', error));
    }, [eventId]);

    const handleEventUpdated = (updatedEvent) => {
        console.log('Event updated:', updatedEvent);
        alert('Event updated successfully!');
        navigate('/events');
    };

    return (
        <div>
            <h1>Update Event</h1>
            {event ? (
                <EventForm event={event} onEventSaved={handleEventUpdated} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateEventPage;