import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import forumService from '../api/ForumService';

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
    <div className="user-posts-page">
      <h2>User's Posts</h2>
      <ul className="posts-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <Link to={`/forum/${post.id}`} className="post-link">{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;