import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import forumService from '../services/ForumService';
import categoryService from "../services/CategoryService";
import { useAuth } from "../../contexts/authContext";
import Modal from '../Modal';

const CreateForumPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    categoryService.getCategories()
      .then(response => {
        setCategories(response.data);
        setSelectedCategory(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setModalMessage('Failed to fetch categories.');
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      category: selectedCategory
    };
    
    if (user && user.id) {
      forumService.createPost(newPost, user.id)
      .then(response => {
        setTitle('');
        setContent('');
        setModalMessage('Post created successfully!');
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate('/forum'); 
        }, 2000);
      })
      .catch(error => {
        setModalMessage('Failed to create the post. Please try again.');
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
        console.error('Error creating post:', error);
      });
    }
};
  
return (
  <div className="game-form-container">
    <form onSubmit={handleSubmit} className="game-form">
      <div>
        <label htmlFor="title" className="game-form-label">Post Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="game-form-input"
          required
        />
      </div>
      <div>
          <label htmlFor="category" className="game-form-label">Category</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="game-form-input"
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      <div>
        <label htmlFor="content" className="game-form-label">Content</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here"
          className="game-form-textarea"
          rows="4"
          required
        />
      </div>
      <button type="submit" className="game-form-button">
        Create Post
      </button>
      {showModal && <Modal isOpen={showModal} title="Forum Post Submission">
      {modalMessage}
    </Modal>}
    </form>
  </div>
);
};

export default CreateForumPostForm;