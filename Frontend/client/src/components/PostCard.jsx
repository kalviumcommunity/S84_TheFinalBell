import React from "react";
import "../styles/PostCard.css";

const PostCard = ({ title, content, author, date }) => {
  return (
    <div className="post-card">
      <h2>{title}</h2>
      <p>{content}</p>
      <p><strong>By:</strong> {author}</p>
      <small>{new Date(date).toLocaleDateString()}</small>
    </div>
  );
};

export default PostCard;
