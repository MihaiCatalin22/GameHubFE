import React, { useState, useEffect } from 'react';
import CreateForumPostForm from './CreateForumPostForm';
import ForumPostsList from './ForumPostsList';
import ForumPost from './ForumPost';
import forumService from '../services/ForumService';

const ForumPage = () => {
  const [forumPosts, setForumPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

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
        setSelectedPost(response.data);
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
      {showCreateForm && (
        <CreateForumPostForm onSubmit={addForumPost} />
      )}
      {selectedPost ? (
        <ForumPost post={selectedPost} />
      ) : (
        <ForumPostsList 
          posts={forumPosts} 
          onSelect={(post) => {
            setSelectedPost(post);
            setShowCreateForm(false);
          }} 
        />
      )}
    </div>
  );
};

export default ForumPage;