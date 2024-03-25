import React, { useState, useEffect } from 'react';
import CreateForumPostForm from './CreateForumPostForm';
import ForumPostsList from './ForumPostsList';
import ForumPost from './ForumPost';
import forumService from '../services/ForumService';

const ForumPage = () => {
  const [forumPosts, setForumPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <CreateForumPostForm onSubmit={addForumPost} />
      {selectedPost ? (
        <ForumPost post={selectedPost} />
      ) : (
        <ForumPostsList posts={forumPosts} onSelect={setSelectedPost} />
      )}
    </div>
  );
};

export default ForumPage;