import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import forumService from "../api/ForumService";
import CommentsList from '../components/CommentsList';
import CommentForm from "../components/CommentForm";
import { useAuth } from '../contexts/authContext';
import Modal from "../components/Modal";

const ForumPostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [commentToDelete, setCommentToDelete] = useState(null);

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
        .then(() => {
          window.location.reload(); 
        })
        .catch(error => console.error("Error toggling like on the post:", error));
    }
  };

  const canDelete = user && user.role.includes('ADMINISTRATOR');

  const handleDeletePost = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = () => {
    setIsDeleteModalOpen(false);
    setIsConfirmModalOpen(true);
    forumService.deletePost(postId)
      .then(() => {
        setModalMessage('Post deleted successfully.');
        setTimeout(() => {
          setIsConfirmModalOpen(false);
          navigate("/forum");
        }, 2000);
      })
      .catch(error => {
        console.error("Error deleting the post:", error);
        setModalMessage('Failed to delete post.');
        setIsConfirmModalOpen(true);
      });
  };

  const handleDeleteComment = (commentId) => {
    if (canDelete) {
      setCommentToDelete(commentId);
      setIsCommentDeleteModalOpen(true);
    }
  };

  const confirmDeleteComment = () => {
    setIsCommentDeleteModalOpen(false);
    forumService.deleteComment(postId, commentToDelete)
      .then(() => {
        setComments(currentComments => currentComments.filter(c => c.id !== commentToDelete));
        setCommentToDelete(null);
        setModalMessage('Comment deleted successfully.');
        setIsConfirmModalOpen(true);
      })
      .catch(error => {
        console.error("Error deleting comment:", error);
        setModalMessage('Failed to delete comment.');
        setIsConfirmModalOpen(true);
      });
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
        <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
        <CommentsList comments={comments} onDelete={handleDeleteComment} canDelete={canDelete}/>
        
      </section>
      <Modal 
        isOpen={isDeleteModalOpen} 
        title="Confirm Deletion" 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={confirmDeletePost}
        showConfirmButton={true}
        showCancelButton={true}
      >
        Are you sure you want to delete this post?
      </Modal>
      <Modal 
        isOpen={isCommentDeleteModalOpen} 
        title="Confirm Comment Deletion" 
        onClose={() => setIsCommentDeleteModalOpen(false)} 
        onConfirm={confirmDeleteComment}
        showConfirmButton={true}
        showCancelButton={true}
      >
        Are you sure you want to delete this comment?
      </Modal>
      <Modal 
        isOpen={isConfirmModalOpen} 
        title="Deletion Status" 
        onClose={() => setIsConfirmModalOpen(false)}
      >
        {modalMessage}
      </Modal>
    </div>
  );
};

export default ForumPostDetails;