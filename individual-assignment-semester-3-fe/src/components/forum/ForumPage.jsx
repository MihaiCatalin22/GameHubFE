import React, { useState } from 'react';
import CreateForumPostForm from './CreateForumPostForm';
import ForumPostsList from './ForumPostsList';
import ForumPost from './ForumPost';
import initialForumPosts from '../mockData/mockForumPosts';

const ForumPage = () => {
  const [forumPosts, setForumPosts] = useState(initialForumPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  const addForumPost = (newPost) => {
    setForumPosts([newPost, ...forumPosts]);
    setSelectedPost(newPost);
  };

  return (
    <div className="flex flex-col items-center">
      <CreateForumPostForm onSubmit={addForumPost} />
      {selectedPost ? (
        <ForumPost post={selectedPost} />
      ) : (
        <ForumPostsList onSelect={setSelectedPost} />
      )}
    </div>
  );
};

export default ForumPage;