// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/dashboard');
      return;
    }
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch memories. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const postData = {
        ...newPost,
        author: user?.email || 'Anonymous'
      };

      await axios.post('http://localhost:5000/api/posts', postData);
      setNewPost({ title: '', content: '' });
      setError('');
      fetchPosts();
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating memory');
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postId}`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {
        userId: user?.email || 'anonymous'
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        username: user?.email || 'Anonymous',
        content: comment
      });
      fetchPosts();
    } catch (error) {
      console.error('Error commenting:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to The Final Bell</h1>
        <p>Share your school memories and connect with classmates</p>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="create-post-section">
          <h2>Create New Memory</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="post-form">
            <input
              type="text"
              placeholder="Title of your memory..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="post-input"
              required
            />
            <textarea
              placeholder="Share your school memory..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="post-textarea"
              required
            />
            <button
              type="submit"
              className="post-button"
              disabled={!newPost.title || !newPost.content}
            >
              Share Memory
            </button>
          </form>
        </div>

        <div className="posts-feed">
          <h2>Recent Memories</h2>
          {loading ? (
            <p>Loading memories...</p>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post._id} className="post-card">
                  <div className="post-header">
                    <h3>{post.title}</h3>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="delete-button"
                    >
                      🗑️
                    </button>
                  </div>
                  <p>{post.content}</p>
                  <p className="post-meta">Posted by: {post.author}</p>
                  <div className="post-actions">
                    <button onClick={() => handleLike(post._id)}>
                      ❤️ {post.likes?.length || 0}
                    </button>
                    <button
                      onClick={() => {
                        const comment = prompt('Add your comment:');
                        if (comment) handleComment(post._id, comment);
                      }}
                    >
                      💬 {post.comments?.length || 0}
                    </button>
                  </div>
                  {post.comments?.length > 0 && (
                    <div className="comments-section">
                      {post.comments.map((comment, index) => (
                        <div key={index} className="comment">
                          <strong>{comment.username || comment.user}: </strong>
                          {comment.content}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;