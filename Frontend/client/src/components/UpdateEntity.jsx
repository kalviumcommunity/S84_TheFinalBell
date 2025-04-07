import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEntity = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);  
  const [isDeleting, setIsDeleting] = useState(false);  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // 🆕 added

  useEffect(() => {
    fetchEntity();
  }, []);

  // 🆕 Warn user before closing tab or refreshing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

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
      setIsUpdating(true);
      const response = await axios.put(`http://localhost:5000/api/entities/${id}`, {
        title,
        description,
      });
      console.log("Updated Entity:", response.data);
      toast.success("Entity updated successfully!");
      setHasUnsavedChanges(false); // 🆕 reset after update
      navigate("/");
    } catch (error) {
      toast.error("Error updating entity.");
      console.error("Error updating entity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      try {
        setIsDeleting(true);
        await axios.delete(`http://localhost:5000/api/entities/${id}`);
        toast.success("Entity deleted successfully!");
        setHasUnsavedChanges(false); // 🆕 reset after delete
        navigate("/");
      } catch (error) {
        toast.error("Error deleting entity.");
        console.error("Error deleting entity:", error);
      } finally {
        setIsDeleting(false);
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
          onChange={(e) => {
            setTitle(e.target.value);
            setHasUnsavedChanges(true); // 🆕 mark dirty
          }}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setHasUnsavedChanges(true); // 🆕 mark dirty
          }}
          style={styles.textarea}
          required
        />

        <button
          type="submit"
          style={{ ...styles.updateButton, opacity: isUpdating ? 0.7 : 1 }}
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? "⏳ Updating..." : "✅ Update Entity"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ ...styles.deleteButton, opacity: isDeleting ? 0.7 : 1 }}
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? "⏳ Deleting..." : "❌ Delete Entity"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "30px", background: "#f9f9f9", minHeight: "100vh" },
  heading: { fontSize: "24px", marginBottom: "15px" },
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "2px solid #6a11cb"
  },
  textarea: {
    width: "90%",
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #6a11cb",
    minHeight: "80px"
  },
  updateButton: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px"
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px"
  },
  loading: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "18px",
    color: "#6a11cb"
  },
};

export default UpdateEntity;
