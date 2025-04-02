import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEntity = () => {
  const { id } = useParams(); // Get the entity ID from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntity();
  }, []);

  const fetchEntity = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/entities/${id}`);
      setTitle(response.data.title || "");
      setDescription(response.data.description || "");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch entity data.");
      console.error("Error fetching entity:", error);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.warn("Please fill all fields!");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/api/entities/${id}`, {
        title,
        description,
      });
      console.log("Updated Entity:", response.data);
      toast.success("Entity updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error updating entity.");
      console.error("Error updating entity:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      try {
        await axios.delete(`http://localhost:5000/api/entities/${id}`);
        toast.success("Entity deleted successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Error deleting entity.");
        console.error("Error deleting entity:", error);
      }
    }
  };

  if (loading) return <p style={styles.loading}>Loading entity data...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✏️ Update or Delete Entity</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          required
        />

        <button type="submit" style={styles.updateButton}>✅ Update Entity</button>
        <button type="button" onClick={handleDelete} style={styles.deleteButton}>❌ Delete Entity</button>
      </form>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "30px", background: "#f9f9f9", minHeight: "100vh" },
  heading: { fontSize: "24px", marginBottom: "15px" },
  form: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", maxWidth: "400px", margin: "auto", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" },
  input: { width: "90%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "2px solid #6a11cb" },
  textarea: { width: "90%", padding: "10px", borderRadius: "8px", border: "2px solid #6a11cb", minHeight: "80px" },
  updateButton: { backgroundColor: "#22c55e", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", marginTop: "10px" },
  deleteButton: { backgroundColor: "#ef4444", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", marginTop: "10px" },
  loading: { textAlign: "center", marginTop: "20px", fontSize: "18px", color: "#6a11cb" },
};

export default UpdateEntity;
