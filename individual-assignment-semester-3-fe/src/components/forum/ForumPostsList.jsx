import React from "react";
import ForumPost from './ForumPost';

const ForumPostsList = ({ posts, onSelect }) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl text-center font-bold mb-4">Forum Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={() => onSelect(post)}
          className="cursor-pointer p-2 hover:bg-gray-200 my-2"
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p>{post.content.substring(0, 100)}...</p>
          <time dateTime={post.creationDate} className="text-sm text-gray-500">
            {new Date(post.creationDate).toLocaleString()}
          </time>
        </div>
      ))}
    </div>
  );
};

export default ForumPostsList;