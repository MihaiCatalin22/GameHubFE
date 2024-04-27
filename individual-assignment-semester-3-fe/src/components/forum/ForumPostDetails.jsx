import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import forumService from "../services/ForumService";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import { useAuth } from '../../contexts/authContext';


const ForumPostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

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
    if (user && user.id) {
      forumService.addCommentToPost(postId, { content: commentData }, user.id)
        .then(response => {
            setComments(currentComments => [...currentComments, response.data]);
        })
        .catch(error => {
            console.error("Error adding comment:", error);
        });
    }
  };

  const handleLike = () => {
    if (user && user.id) {
      forumService.likePost(postId, user.id)
        .then(response => {
          setPost(prevPost => ({
            ...prevPost,
            likesCount: response.data.likesCount,
            likes: response.data.likes
          }));
        })
        .catch(error => console.error("Error toggling like on the post:", error));
    }
  };

  const canDelete = user && user.role.includes('ADMINISTRATOR');

  const handleDeletePost = () => {
    if (canDelete) {
      forumService.deletePost(postId)
        .then(() => {
          navigate("/forum");
        })
        .catch(error => {
          console.error("Error deleting the post:", error);
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    if (canDelete) {
      forumService.deleteComment(postId, commentId)
        .then(() => {
          setComments(currentComments => currentComments.filter(c => c.id !== commentId));
        })
        .catch(error => {
          console.error("Error deleting comment:", error);
        });
    }
  };
  
  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="forum-post-details">
      <header className="post-header">
        <h2 className="post-title">{post?.title}</h2>
        {post?.category && (
          <span className={`post-type ${post.category.toLowerCase()}`}>
            {post.category}
          </span>
        )}
        {post?.author && (
          <span className="post-author">
            Posted by: {post.author.username}
          </span>
        )}
        <div className="post-interactions">
          <button onClick={handleLike} className="like-button">
            Like ({post?.likesCount || 0})
          </button>
          {canDelete && (
            <button onClick={handleDeletePost} className="button">
              Delete Post
            </button>
          )}
        </div>
      </header>
      <section className="post-content">
        <p>{post?.content}</p>
      </section>
      <section className="comments-section">
        <CommentsList comments={comments} onDelete={handleDeleteComment} canDelete={canDelete}/>
        <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
      </section>
    </div>
  );
};

export default ForumPostDetails;