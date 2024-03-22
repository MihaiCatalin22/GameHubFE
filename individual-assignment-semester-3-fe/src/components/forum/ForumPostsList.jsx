import React from 'react';
import mockForumPosts from '../mockData/mockForumPosts.jsx';
import ForumPost from './ForumPost';

const ForumPostsList = ({ onSelect }) => {
  return (
    <div>
      <h2>Forum Posts</h2>
      {mockForumPosts.map((post) => (
        <div key={post.id} onClick={() => onSelect(post)}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p>
          <time dateTime={post.timestamp}>{new Date(post.timestamp).toLocaleString()}</time>
        </div>
      ))}
    </div>
  );
};

export default ForumPostsList;