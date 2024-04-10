import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import forumService from "../services/ForumService";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

const ForumPostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    forumService.getPostById(postId)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => console.error("Error fetching post details:", error));

    forumService.getCommentsByPostId(postId)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error("Error fetching comments:", error));
  }, [postId]);

  const handleCommentSubmit = (commentData) => {
    const userId = 1;
    forumService.addCommentToPost(postId, { content: commentData }, userId)
        .then(response => {
            setComments(currentComments => [...currentComments, response.data]);
        })
        .catch(error => {
            console.error("Error adding comment:", error);
        });
};

  const handleLike = () => {
    const userId = 1;
    forumService.likePost(postId, userId)
      .then(() => {
        setPost({...post, likesCount: post.likesCount + 1});
      })
      .catch(error => console.error("Error liking the post:", error));
  };

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="forum-post-details">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <button onClick={handleLike} className="like-button">Like ({post.likesCount})</button>
      <CommentsList comments={comments} />
      <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default ForumPostDetails;