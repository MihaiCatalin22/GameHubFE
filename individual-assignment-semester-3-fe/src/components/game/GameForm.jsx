import React, { useState, useEffect } from 'react';
import gameService from '../services/GameService';
import GenreTagsInput from './GenreTagsInput';
import { useAuth } from '../../contexts/authContext';
import Modal from '../Modal';

const GameForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    genres: [],
    releaseDate: '',
    description: '',
    developer: '',
    price: '',
  });
  const { user } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState(initialData?.genres || []);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        releaseDate: initialData.releaseDate || '',
        description: initialData.description || '',
        developer: initialData.developer || '',
        price: initialData.price || '',
      });
      setSelectedGenres(initialData.genres || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.role.includes('ADMINISTRATOR')) {
            setModalMessage("You do not have permission to modify game details.");
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
            return;
        }
        const gameData = { ...formData, genres: selectedGenres };
        try {
            const response = initialData?.id ? await gameService.updateGame(initialData.id, gameData) : await gameService.createGame(gameData);
            onSave(response.data);
            setModalMessage('Game details saved successfully!');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
        } catch (error) {
            console.error('Error saving game:', error);
            setModalMessage('Failed to save game details. Please try again.');
            setShowModal(true);
            setTimeout(() => setShowModal(false), 2000);
        }
    };

  return (
    <div className="game-form">
      <div className="game-form-container">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Game Title"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <label htmlFor='genres' className="block mb-2">Genres</label>
          <GenreTagsInput
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />          
          <div>
            <label htmlFor="releaseDate" className="block mb-2">Release Date</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Game Description"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="developer" className="block mb-2">Developer</label>
            <input
              type="text"
              id="developer"
              name="developer"
              value={formData.developer}
              onChange={handleChange}
              placeholder="Developer Name"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2">Price (€)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Game Price"
              step="0.01"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="button">
            Save Game
          </button>
          {showModal && <Modal isOpen={showModal} title="Game Update Status">
                {modalMessage}
            </Modal>}
        </form>
      </div>
    </div>
  );
};

export default GameForm;