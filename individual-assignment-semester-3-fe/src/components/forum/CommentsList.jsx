import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h4 className="font-bold">Comments:</h4>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mt-2">
            <p><strong>{comment.author.username}:</strong> {comment.content}</p>
            <time className="text-sm text-gray-500">
              {new Date(comment.creationDate).toLocaleString()}
            </time>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentsList;