import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import forumService from '../services/ForumService';
import { useAuth } from '../../contexts/authContext';

const UserPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      forumService.getAllPosts(user.id)
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [user]);
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;
  if (!posts.length) return <p>No posts found.</p>;
  return (
    <div>
      <h2>User's Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/forum/posts/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;