const mysql = require("mysql2");
require("dotenv").config();

// 🔧 Create MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "12345",
  database: process.env.MYSQL_DATABASE || "gallerydb", // fallback db name
});

// 🔌 Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

// ✅ GET all users
const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, callback);
};

// ✅ ADD new user
const addUser = (name, callback) => {
  const sql = "INSERT INTO users (name) VALUES (?)";
  db.query(sql, [name], callback);
};

// ✅ GET all photos (with usernames joined)
const getAllPhotos = (callback) => {
  const sql = `
    SELECT photos.id, photos.url, users.name AS username
    FROM photos
    JOIN users ON photos.userId = users.id
    ORDER BY photos.id DESC
  `;
  db.query(sql, callback);
};

// ✅ GET photos by user ID
const getPhotosByUser = (userId, callback) => {
  const sql = `
    SELECT photos.id, photos.url, users.name AS username
    FROM photos
    JOIN users ON photos.userId = users.id
    WHERE photos.userId = ?
    ORDER BY photos.id DESC
  `;
  db.query(sql, [userId], callback);
};

// ✅ ADD new photo
const addPhoto = (url, userId, callback) => {
  const sql = "INSERT INTO photos (url, userId) VALUES (?, ?)";
  db.query(sql, [url, userId], callback);
};

// ✅ Export all functions
module.exports = {
  getAllUsers,
  addUser,
  getAllPhotos,
  getPhotosByUser,
  addPhoto,
};
