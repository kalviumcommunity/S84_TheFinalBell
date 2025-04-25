const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer"); // Import multer for file uploads
const postRoutes = require("./route/postRoutes");
const entityRoutes = require("./route/entityRoutes");
const authRoutes = require("./route/authRoutes");
const userRoutes = require("./route/userRoute");
const mysqlRoutes = require("./route/mysqlRoute");
const cookieParser = require("cookie-parser") ;
const app = express();
app.use(cookieParser()) ;

// Serve images from the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Configure Multer to store uploaded images in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflict
  }
});

const upload = multer({ storage: storage });

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
app.use(bodyParser.json());
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));
db.once("open", () => console.log("🚀 MongoDB Connection is Live!"));

// Routes
// Add auth routes
const emailRoutes = require("./route/emailRoutes");
app.use("/", emailRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/entities", entityRoutes);

// MySQL Routes
app.use("/api/mysql", mysqlRoutes);

// Photo Upload Route
app.post('/api/photos', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  // Assuming you want to store the URL in your database (or MySQL)
  const photoUrl = `/uploads/${req.file.filename}`; // Image URL
  // Save the photo URL in your MySQL database or MongoDB
  // If using MySQL, you could use something like: `mysqlQueries.addPhoto(req.body.userId, photoUrl)`
  
  // Respond with the URL of the uploaded image
  res.status(200).json({ url: photoUrl, message: "Photo uploaded successfully!" });
});

// Root Route
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: `Database Status: ${status}` });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Failed to start server:", err.message);
  process.exit(1);
});
