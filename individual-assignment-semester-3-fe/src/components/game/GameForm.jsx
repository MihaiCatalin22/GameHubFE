import React, {useState, useEffect} from 'react';

const GameForm = ({ onSave, initialData }) => {
    const [formData, setFormData] = useState({
      name: '',
      genre: '',
      releaseDate: '',
      description: '',
    });
  
    useEffect(() => {
      if (initialData) {
        setFormData(initialData);
      }
    }, [initialData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Game Name"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Save Game</button>
      </form>
    );
  };
  
  export default GameForm;
