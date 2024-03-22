import React from "react";

const ForumPost = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <time dateTime={post.timestamp}>{new Date(post.timestamp).toLocaleString()}</time>
        </article>
    );
};

export default ForumPost;