const express = require("express");
const router = express.Router();
const {
  getAllPhotos,
  getPhotosByUser,
  addUser,
  addPhoto,
  getAllUsers,
} = require("../model/mysqlModel");

// Get all photos
router.get("/photos", (req, res) => {
  getAllPhotos((err, results) => {
    if (err) {
      console.error("Error fetching all photos:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Get photos by user id
router.get("/photos/:userId", (req, res) => {
  const userId = req.params.userId;
  getPhotosByUser(userId, (err, results) => {
    if (err) {
      console.error("Error fetching photos by user:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Add a new user
router.post("/user", (req, res) => {
  const { name } = req.body;
  console.log("Received new user:", name); // 👈 add this for debugging
  addUser(name, (err, result) => {
    if (err) {
      console.error("Error adding user:", err);
      return res.status(500).json({ error: err });
    }
    res.json({ id: result.insertId, name });
  });
});

// Add a new photo
router.post("/photos", (req, res) => {
  const { url, userId } = req.body;
  
  console.log("👉 Received photo:", { url, userId }); // 👈 Add this line for debug

  if (!url || !userId) {
    return res.status(400).json({ error: "URL and userId required" });
  }


  addPhoto(url, userId, (err, result) => {
    if (err) {
      console.error("❌ Error adding photo:", err); // 👈 More specific log
      return res.status(500).json({ error: "DB error", details: err });
    }
    res.status(201).json({ message: "Photo added successfully", id: result.insertId });
  });
});


// Get all users
router.get("/users", (req, res) => {
  getAllUsers((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

module.exports = router;
