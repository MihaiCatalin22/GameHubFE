import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

const ForumPostsList = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSelectPost = (postId) => {
    navigate(`/forum/${postId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-4">
      <h2 className="text-2xl text-center font-bold mb-4">Forum Posts</h2>
      <input
        type="text"
        className="user-search-input"
        placeholder="Search forum posts..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="forum-posts-list">
        {filteredPosts.length > 0 ? filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleSelectPost(post.id)}
            className="forum-post-item cursor-pointer"
          >
            <h3 className="forum-post-title">{post.title}</h3>
            <p className="forum-post-content">{post.content.substring(0, 100)}...</p>
            <time dateTime={post.creationDate} className="forum-post-date">
              {new Date(post.creationDate).toLocaleString()}
            </time>
          </div>
        )) : <p>No matching posts found.</p>}
      </div>
    </div>
  );
};

export default ForumPostsList;