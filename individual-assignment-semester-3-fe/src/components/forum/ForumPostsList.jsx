import React from "react";
import ForumPost from './ForumPost';

const ForumPostsList = ({ posts, onSelect }) => {
  return (
    <div className="my-4">
  <h2 className="text-2xl text-center font-bold mb-4">Forum Posts</h2>
  <div className="forum-posts-list">
    {posts.map((post) => (
      <div
        key={post.id}
        onClick={() => onSelect(post)}
        className="forum-post-item"
      >
        <h3 className="forum-post-title">{post.title}</h3>
        <p className="forum-post-content">{post.content.substring(0, 100)}...</p>
        <time dateTime={post.creationDate} className="forum-post-date">
          {new Date(post.creationDate).toLocaleString()}
        </time>
      </div>
    ))}
  </div>
</div>
  );
};

export default ForumPostsList;