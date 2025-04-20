import React, { useEffect, useState } from "react";
import "../styles/FeatureGallery.css";
import axios from "axios";

const FeatureGallery = () => {
  const [users, setUsers] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUser, setNewUser] = useState("");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  // const [photoUser, setPhotoUser] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message

  const BASE_URL = "http://localhost:5000/api/mysql";

  useEffect(() => {
    fetchUsers();
    fetchAllPhotos();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAllPhotos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/photos`);
      setPhotos(res.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const fetchPhotosByUser = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/photos/${userId}`);
      setPhotos(res.data);
    } catch (error) {
      console.error("Error fetching photos by user:", error);
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) {
      fetchPhotosByUser(userId);
    } else {
      fetchAllPhotos();
    }
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;

    try {
      await axios.post(`${BASE_URL}/user`, { name: newUser });
      setNewUser(""); // Reset newUser input
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  const addPhoto = async () => {
    if (!newPhotoUrl.trim() || !selectedUser) return;
  
    try {
      const response = await axios.post(`${BASE_URL}/photos`, {
        url: newPhotoUrl,
        userId: selectedUser,
      });
  
      console.log("✅ Photo added:", response.data);
      setSuccessMessage("Photo added successfully!");
      fetchAllPhotos(); // refresh gallery
    } catch (err) {
      console.error("❌ Failed to add photo:", err);
      setSuccessMessage("Failed to add photo.");
    }
  
    setNewPhotoUrl("");
    setSelectedUser("");
  };
  

  return (
    <div className="feature-gallery-container">
      <h1 className="feature-gallery-header">Feature Gallery</h1>

      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="feature-filters">
        <button className="button blue" onClick={fetchAllPhotos}>
          Feature (Show All Photos)
        </button>

        <select
          className="select"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="">-- Filter by User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="add-user">
        <input
          type="text"
          placeholder="New Username"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          className="input"
        />
        <button className="button" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="add-photo">
        <input
          type="text"
          placeholder="Photo URL"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
          className="input"
        />
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="select"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button className="button purple" onClick={addPhoto}>
          Add Photo
        </button>
      </div>

      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.url} alt="Uploaded" className="photo-img" />
            {/* <p className="photo-username">{photo.username || "Unknown"}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGallery;
