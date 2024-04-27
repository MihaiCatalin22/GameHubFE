import React, { useState, useEffect } from 'react';
import gameService from '../services/GameService';
import GenreTagsInput from './GenreTagsInput';
import { useAuth } from '../../contexts/authContext';

const GameForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    genres: [],
    releaseDate: '',
    description: '',
    developer: '',
  });
  const { user } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState(initialData?.genres || []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        releaseDate: initialData.releaseDate || '',
        description: initialData.description || '',
        developer: initialData.developer || '',
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
    const gameData = { ...formData, genres: selectedGenres };
    try {
        const response = initialData?.id ? await gameService.updateGame(initialData.id, gameData) : await gameService.createGame(gameData);
        onSave(response.data);
    } catch (error) {
        console.error('Error saving game:', error);
    }
};
   if (!user || !user.role.includes('ADMINISTRATOR')) {
    return <div className="no-game-selected">You do not have permission to modify game details.</div>;
  }
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
          <label htmlFor='genres' classname="block mb-2">Genres</label>
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
          <button type="submit" className="button">
            Save Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameForm;