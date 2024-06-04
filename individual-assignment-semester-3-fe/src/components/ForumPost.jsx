import React, { useState } from "react";
import forumService from "../services/ForumService";
import CommentsList from "../forum/CommentsList";



const ForumPost = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [commentContent, setCommentContent] = useState('');

  const handleLike = () => {
      const userId = 1;
      setPost({ ...post, likesCount: post.likesCount + 1 });

      forumService.likePost(post.id, userId)
          .then(() => {
              console.log("Post liked successfully!");
          })
          .catch(error => {
              setPost({ ...post, likesCount: post.likesCount - 1 });
              console.error("Error liking the post:", error);
          });
  };

  const handleCommentSubmit = (e) => {
      e.preventDefault();
      const userId = 1;
      if (!commentContent.trim()) return;

      forumService.addCommentToPost(post.id, { content: commentContent }, userId)
          .then(response => {
              setPost({
                  ...post,
                  comments: [...post.comments, response.data]
              });
              setCommentContent('');
          })
          .catch(error => {
              console.error("Error adding comment:", error);
          });
  };

  return (
        <article className="text-center my-4">
        <h3 className="forum-post-title">{post.title}</h3>
        <p className="forum-post-content">{post.content}</p>
        <time dateTime={post.creationDate} className="forum-post-date">
        {new Date(post.creationDate).toLocaleString()}
        </time>
        <div className="mt-2">
        <button onClick={handleLike} className="forum-form-button">
            Like ({post.likesCount})
        </button>
        </div>
        <CommentsList comments={post.comments || []} />
        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4 items-center my-4">
        <textarea
            className="forum-form-textarea"
            placeholder="Add a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
        ></textarea>
        <button type="submit" className="forum-form-button">
            Submit Comment
        </button>
        </form>
    </article>
  );
};
export default ForumPost