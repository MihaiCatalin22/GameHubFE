import React, { useEffect, useState } from "react";
import EventService from '../services/EventService';
import EventForm from "./EventForm";
import { useNavigate } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [addingEvent, setAddingEvent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
        }, []);

        const handleEventClick = (eventId) => {
            navigate(`/events/${eventId}`);
          };

    const fetchEvents = () => {
        EventService.getAllEvents().then(response => {
        setEvents(response.data);
        }).catch(error => console.error('Error loading events:', error));
    };

    const handleEventCreated = (newEvent) => {
        setEvents([...events, newEvent]);
        setAddingEvent(false);
    };

    if (addingEvent) {
        return <EventForm onEventCreated={handleEventCreated} />;
    }

    return (
        <div className="events-list">
          <button onClick={() => setAddingEvent(true)} className="button">Add New Event</button>
          {events.length > 0 ? events.map(event => (
            <div key={event.id} className="event-item">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <button className='button' onClick={() => handleEventClick(event.id)}>View Details</button>
            </div>
          )) : (
            <p>No events available.</p>
          )}
        </div>
      );
    };
    


export default EventList;