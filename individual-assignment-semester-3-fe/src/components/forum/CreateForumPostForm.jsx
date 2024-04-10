import React, { useState } from "react";
import forumService from '../services/ForumService';

const CreateForumPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
    };
    const userId = 1;
    
    forumService.createPost(newPost, userId)
    .then(response => {
      setTitle('');
      setContent('');
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