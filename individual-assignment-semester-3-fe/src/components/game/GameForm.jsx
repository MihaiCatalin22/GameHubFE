import React, { useState, useEffect } from 'react';
import gameService from '../services/GameService';

const GameForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    genres: [],
    releaseDate: '',
    description: '',
    developer: '',
  });

  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    setAllGenres(['Action', 'Adventure', 'RPG', 'Simulation', 'Strategy']); // TODO: Replace with a real service call to fetch genres

    if (initialData) {
      setFormData({
        ...initialData,
        genres: initialData.genres || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        genres: checked
          ? [...formData.genres, value]
          : formData.genres.filter((genre) => genre !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData && initialData.id) {
      gameService.updateGame(initialData.id, formData)
        .then((response) => {
          onSave(response.data);
        })
        .catch((error) => {
          console.error('Error updating game:', error);
        });
    } else {
      gameService.createGame(formData)
        .then((response) => {
          onSave(response.data);
        })
        .catch((error) => {
          console.error('Error creating game:', error);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
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
          <div>
            <label htmlFor="genre" className="block mb-2">Genres</label>
            <div className="flex flex-wrap">
              {allGenres.map((genre) => (
                <label key={genre} className="inline-flex items-center mr-2">
                  <input
                    type="checkbox"
                    name="genres"
                    value={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={handleChange}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Save Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameForm;