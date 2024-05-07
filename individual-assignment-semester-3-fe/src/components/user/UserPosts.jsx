import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import forumService from '../services/ForumService';

const UserPosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      setLoading(true);
      forumService.getPostsByUserId(userId)
        .then(response => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
          setError('Failed to fetch posts');
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError('User not authenticated');
    }
  }, [userId]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;
  if (!posts.length) return <p>No posts found.</p>;

  return (
    <div>
      <h2>User's Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <Link to={`/forum/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;