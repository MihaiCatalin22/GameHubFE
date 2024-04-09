import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h4 className="font-bold">Comments:</h4>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comments-list-item">
              <p className="comment-content">
                <strong className="comment-author">{comment.author.username}:</strong> {comment.content}
              </p>
              <time className="comment-date">
                {new Date(comment.creationDate).toLocaleString()}
              </time>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentsList;