import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEntity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEntityId, setEditingEntityId] = useState(null);

  const API_URL = "http://localhost:5000/api/entities";

  // ✅ Fetch Entities
  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setEntities(response.data);
      } catch (error) {
        toast.error("Failed to load entities. Try again!");
      } finally {
        setLoading(false);
      }
    };
    fetchEntities();
  }, []);

  // ✅ Add or Update Entity
  const handleSaveEntity = async () => {
    if (!title || !description) {
      toast.warn("Please fill all fields!");
      return;
    }

    try {
      if (editingEntityId) {
        // ✅ Update Entity
        const response = await axios.put(`${API_URL}/${editingEntityId}`, { title, description });
        setEntities(entities.map((entity) => (entity._id === editingEntityId ? response.data : entity)));
        toast.success("Entity updated successfully!");
      } else {
        // ✅ Add New Entity
        const response = await axios.post(API_URL, { title, description });
        setEntities([...entities, response.data]);
        toast.success("Entity added successfully!");
      }

      // ✅ Reset Form
      resetForm();
    } catch (error) {
      toast.error("Error saving entity. Try again!");
    }
  };

  // ✅ Delete Entity
  const deleteEntity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entity?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id));
      toast.success("Entity deleted!");
    } catch (error) {
      toast.error("Error deleting entity.");
    }
  };

  // ✅ Start Editing an Entity
  const editEntity = (entity) => {
    setTitle(entity.title);
    setDescription(entity.description);
    setEditingEntityId(entity._id);
  };

  // ✅ Cancel Editing (Reset Form)
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingEntityId(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{editingEntityId ? "✏️ Edit Entity" : "➕ Add a New Entity"}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveEntity();
        }}
        style={styles.form}
      >
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
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          style={styles.button}
        >
          {editingEntityId ? "💾 Save Changes" : "➕ Add Entity"}
        </motion.button>
        {editingEntityId && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            onClick={resetForm}
            style={styles.cancelButton}
          >
            ❌ Cancel
          </motion.button>
        )}
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
              <div>
                <strong>{entity.title}</strong>: {entity.description}
              </div>
              <div style={styles.buttonContainer}>
                {editingEntityId === entity._id ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleSaveEntity}
                      style={styles.updateButton}
                    >
                      ✅ Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={resetForm}
                      style={styles.deleteButton}
                    >
                      ❌ Cancel
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => editEntity(entity)}
                      style={styles.updateButton}
                    >
                      ✏️ Update
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => deleteEntity(entity._id)}
                      style={styles.deleteButton}
                    >
                      ❌ Delete
                    </motion.button>
                  </>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ✅ Styles
const styles = {
  container: { textAlign: "center", padding: "30px", background: "#f9f9f9", minHeight: "100vh" },
  heading: { fontSize: "24px", marginBottom: "15px" },
  form: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", maxWidth: "400px", margin: "auto", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" },
  input: { width: "90%", padding: "10px", marginBottom: "10px", borderRadius: "8px", border: "2px solid #6a11cb" },
  textarea: { width: "90%", padding: "10px", borderRadius: "8px", border: "2px solid #6a11cb", minHeight: "80px" },
  button: { backgroundColor: "#22c55e", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", marginTop: "10px" },
  cancelButton: { backgroundColor: "#ef4444", color: "#fff", padding: "12px 20px", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%", marginTop: "10px" },
  listHeading: { marginTop: "20px", fontSize: "20px" },
  list: { listStyleType: "none", padding: "0", maxWidth: "500px", margin: "auto" },
  listItem: { background: "#fff", padding: "15px", marginBottom: "10px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", alignItems: "center" },
  buttonContainer: { display: "flex", justifyContent: "center", marginTop: "10px" },
  updateButton: { backgroundColor: "#facc15", color: "#000", padding: "8px 12px", border: "none", borderRadius: "8px", cursor: "pointer", marginRight: "5px", transition: "0.3s ease" },
  deleteButton: { backgroundColor: "#ef4444", color: "#fff", padding: "8px 12px", border: "none", borderRadius: "8px", cursor: "pointer", transition: "0.3s ease" },
};

export default AddEntity;
