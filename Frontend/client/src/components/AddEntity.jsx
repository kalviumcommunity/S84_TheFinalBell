import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const AddEntity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/entities");
      setEntities(response.data);
    } catch (error) {
      toast.error("Failed to load entities. Try again!");
      console.error("Error fetching entities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.warn("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/entities", {
        title,
        description,
      });

      setEntities([...entities, response.data]);
      setTitle("");
      setDescription("");
      toast.success("Entity added successfully!");
    } catch (error) {
      toast.error("Error adding entity. Try again!");
      console.error("Error adding entity:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/entities/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id));
      toast.success("Entity deleted!");
    } catch (error) {
      toast.error("Error deleting entity.");
      console.error("Error deleting entity:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📌 Add a New Entity</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          ➕ Add Entity
        </button>
      </form>

      <h3 style={styles.listHeading}>📌 Entities List</h3>
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <ul style={styles.list}>
          {entities.map((entity) => (
            <motion.li
              key={entity._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={styles.listItem}
            >
              <span>
                <strong>{entity.title}</strong>: {entity.description}
              </span>
              <button
                onClick={() => handleDelete(entity._id)}
                style={styles.deleteButton}
              >
                ❌
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
    minHeight: "100vh",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "24px",
    color: "#fff",
    marginBottom: "15px",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    margin: "auto",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "2px solid #6a11cb",
    fontSize: "16px",
  },
  textarea: {
    width: "90%",
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #6a11cb",
    fontSize: "16px",
    minHeight: "80px",
  },
  button: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
  listHeading: {
    marginTop: "30px",
    fontSize: "20px",
    color: "#fff",
  },
  loadingText: {
    color: "#fff",
    fontSize: "18px",
  },
  list: {
    listStyle: "none",
    padding: "0",
    marginTop: "10px",
  },
  listItem: {
    backgroundColor: "#fff",
    margin: "8px auto",
    padding: "12px",
    borderRadius: "8px",
    width: "80%",
    fontSize: "16px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
    transition: "0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#e11d48",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s ease",
  },
};

export default AddEntity;
