import React, { useState, useEffect } from "react";
import forumService from '../services/ForumService';
import categoryService from "../services/CategoryService";


const CreateForumPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    categoryService.getCategories()
      .then(response => {
        setCategories(response.data);
        setSelectedCategory(response.data[0]);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      category: selectedCategory
    };
    const userId = 1;
    
    forumService.createPost(newPost, userId)
    .then(response => {
      setTitle('');
      setContent('');
      setSelectedCategory(categories[0]);
      alert('Post created successfully!');
      console.log('Post created:', response.data);
    })
    .catch(error => {
      alert('Failed to create the post. Please try again.');
      console.error('Error creating post:', error);
    });
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
    </form>
  </div>
);
};

export default CreateForumPostForm;