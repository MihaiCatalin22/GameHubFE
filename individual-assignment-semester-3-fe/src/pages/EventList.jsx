import React, { useEffect, useState } from "react";
import EventService from '../api/EventService';
import EventForm from "../components/EventForm";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import ReactPaginate from "react-paginate";
import Modal from "../components/Modal";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [addingEvent, setAddingEvent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const eventsPerPage = 5;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * eventsPerPage;

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

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const isParticipant = (event) => {
    return event.participants.some(participant => participant.id === user.id);
  };

  const openModal = (event) => {
    setEventToDelete(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventToDelete(null);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      EventService.deleteEvent(eventToDelete.id).then(() => {
        setEvents(events.filter(e => e.id !== eventToDelete.id));
        closeModal();
      });
    }
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayEvents = filteredEvents
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map(event => (
      <div key={event.id} className="event-item">
        {isParticipant(event) && <div className="participation-tag">Participating</div>}
        <h3>{event.name}</h3>
        <p>{event.description}</p>
        <button className='button' onClick={() => navigate(`/events/${event.id}`)}>View Details</button>
        {user && (user.role.includes('ADMINISTRATOR') || user.role.includes('COMMUNITY_MANAGER')) && (
          <>
            <button className='button' onClick={() => handleEditEvent(event)}>Edit</button>
            <button className='button' onClick={() => openModal(event)}>Delete</button>
          </>
        )}
      </div>
    ));

  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);

  return (
    <div className="events-list-page">
      <h2>Events</h2>
      <input
        type="text"
        className="user-search-input"
        placeholder="Search events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {user && (user.role.includes('ADMINISTRATOR') || user.role.includes('COMMUNITY_MANAGER')) && (
        <button onClick={() => setAddingEvent(true)} className="button">
          Add New Event
        </button>
      )}
      <button onClick={() => navigate('/past-events')} className="past-events-button">
        View Past Events
      </button>
      {addingEvent ? (
        <EventForm existingEvent={currentEvent} onEventSaved={handleEventSaved} />
      ) : (
        <>
          {displayEvents}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination__page"}
            pageLinkClassName={"pagination__link"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </>
      )}
      <Modal
        isOpen={modalIsOpen}
        title="Confirm Deletion"
        onClose={closeModal}
        onConfirm={confirmDelete}
        showConfirmButton={true}
        showCancelButton={true}
      >
        <p>Are you sure you want to delete this event?</p>
      </Modal>
    </div>
  );
};


export default EventList;