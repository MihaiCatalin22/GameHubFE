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
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 items-center my-4">
      <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full max-w-xl px-3 py-2 border rounded"
        required
      />
      </div>
      <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full max-w-xl px-3 py-2 border rounded"
        rows="4"
        required
      />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Post</button>
    </form>
  );
};

export default CreateForumPostForm;