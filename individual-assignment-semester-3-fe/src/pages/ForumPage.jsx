import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateForumPostForm from '../components/CreateForumPostForm';
import ForumPostsList from '../components/ForumPostsList';
import forumService from '../api/ForumService';

const ForumPage = () => {
  const [forumPosts, setForumPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    forumService.getAllPosts()
      .then(response => {
        setForumPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const addForumPost = (newPost) => {
    forumService.createPost(newPost, 1)
      .then(response => {
        setForumPosts([response.data, ...forumPosts]);
        setShowCreateForm(false);
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div className="forum-page-container">
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="form-button"
      >
        {showCreateForm ? 'Cancel' : 'Create a Post'}
      </button>
      {showCreateForm ? (
        <CreateForumPostForm onSubmit={addForumPost} />
      ) : (
        <ForumPostsList 
          posts={forumPosts} 
          onSelect={(post) => navigate(`/forum/${post.id}`)}
        />
      )}
    </div>
  );
};

export default ForumPage;