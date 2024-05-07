import React, { useEffect, useState } from "react";
import EventService from '../services/EventService';
import EventForm from "./EventForm";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../contexts/authContext'

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [addingEvent, setAddingEvent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
      fetchEvents();
  }, []);

    const fetchEvents = async () => {
      const response = await EventService.getAllEvents();
      const now = new Date();
      const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      const filteredEvents = response.data.filter(event => new Date(event.endDate) > oneWeekAgo);
      setEvents(filteredEvents);
  };

  const handleEventClick = (eventId) => {
      navigate(`/events/${eventId}`);
  };

  const handleEditEvent = (event) => {
      setCurrentEvent(event);
      setAddingEvent(true);
  };

  const handleEventSaved = (savedEvent) => {
      if (currentEvent) {
          const updatedEvents = events.map(event => event.id === savedEvent.id ? savedEvent : event);
          setEvents(updatedEvents);
      } else {
          setEvents([...events, savedEvent]);
      }
      setCurrentEvent(null);
      setAddingEvent(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (addingEvent) {
      return <EventForm existingEvent={currentEvent} onEventSaved={handleEventSaved} />;
  }
  const canManageEvents = user && (user.role.includes('ADMINISTRATOR') || user.role.includes('COMMUNITY_MANAGER'));
  return (
    <div className="events-list">
        <h2>Events</h2>
        <input
        type="text"
        className="user-search-input"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    {canManageEvents && (
        <button onClick={() => setAddingEvent(true)} className="button">
            Add New Event
        </button>
    )}
    {addingEvent ? (
        <EventForm onEventCreated={handleEventCreated} />
    ) : (
        filteredEvents.length > 0 ? filteredEvents.map(event => (
          <div key={event.id} className="event-item">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <button className='button' onClick={() => navigate(`/events/${event.id}`)}>View Details</button>
            {canManageEvents && (
              <>
                <button className='button' onClick={() => handleEditEvent(event)}>Edit</button>
                <button className='button' onClick={() => {
                  if (window.confirm('Are you sure you want to delete this event?')) {
                    EventService.deleteEvent(event.id).then(() => {
                      setEvents(events.filter(e => e.id !== event.id));
                    });
                  }
                }}>Delete</button>
              </>
            )}
          </div>
        )) : (
            <p>No events available.</p>
        )
    )}
</div>
  );
};


export default EventList;