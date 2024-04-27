import React, { useState, useEffect } from 'react';
import EventService from '../services/EventService';

const EventForm = ({ onEventSaved, existingEvent }) => {
  const [name, setName] = useState(existingEvent ? existingEvent.name : '');
  const [description, setDescription] = useState(existingEvent ? existingEvent.description : '');
  const [startDate, setStartDate] = useState(existingEvent ? existingEvent.startDate : '');
  const [endDate, setEndDate] = useState(existingEvent ? existingEvent.endDate : '');

  const isUpdate = existingEvent && existingEvent.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, description, startDate, endDate };
    
    try {
      let response;
      if (isUpdate) {
        response = await EventService.updateEvent(existingEvent.id, eventData);
        alert('Event updated successfully!');
      } else {
        response = await EventService.createEvent(eventData);
        alert('Event created successfully!');
      }
      onEventSaved(response.data);
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Failed to save event:', error);
      alert(`Failed to ${isUpdate ? 'update' : 'create'} event.`);
    }
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form">
        <div>
          <label className="event-form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="event-form-input"
            required
          />
        </div>
        <div>
          <label className="event-form-label">Description:</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="event-form-textarea"
            required
          />
        </div>
        <div>
          <label className="event-form-label">Start Date:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="event-form-input"
            required
          />
        </div>
        <div>
          <label className="event-form-label">End Date:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="event-form-input"
            required
          />
        </div>
        <button type="submit" className="event-form-button">{isUpdate ? 'Update Event' : 'Create Event'}</button>
      </form>
    </div>
  );
};

export default EventForm;

