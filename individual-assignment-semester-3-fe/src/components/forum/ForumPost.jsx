import React from "react";

const ForumPost = ({ post }) => {
    return (
      <article className="text-center my-4">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="mt-2">{post.content}</p>
        <time dateTime={post.timestamp} className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</time>
      </article>
    );
  };

export default ForumPost;