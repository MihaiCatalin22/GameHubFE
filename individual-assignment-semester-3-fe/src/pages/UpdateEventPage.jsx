import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import eventService from "../api/EventService";

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
        alert('Event updated successfully!');
        navigate('/events');
    };

    return (
        <div>
            <h1>Update Event</h1>
            {event ? (
                <EventForm existingEvent={event} onEventSaved={handleEventUpdated} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateEventPage;