import React from "react";
import PostCard from "./PostCard";
import "../styles/PostCard.css";

const posts = [
  {
    id: 1,
    title: "First Day, Last Day",
    content: "Reflecting on the bittersweet moments of the last day of school.",
    author: "Sahil",
    date: "2025-03-16",
  },
  {
    id: 2,
    title: "Goodbye, Hello Future!",
    content: "The last school bell rang, but a new journey has just begun.",
    author: "Vinita",
    date: "2025-03-15",
  },
];

const PostList = () => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
