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
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="mt-2">{post.content}</p>
          <time dateTime={post.creationDate} className="text-sm text-gray-500">
              {new Date(post.creationDate).toLocaleString()}
          </time>
          <div className="mt-2">
              <button onClick={handleLike} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Like ({post.likesCount})
              </button>
          </div>
          <CommentsList comments={post.comments || []} />
          <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Add a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
              ></textarea>
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Submit Comment
              </button>
          </form>
      </article>
  );
};
export default ForumPost