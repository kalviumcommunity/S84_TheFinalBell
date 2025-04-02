const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./route/userRoute");
const entityRoutes = require("./route/entityRoutes"); // Added entity routes

const app = express();
const PORT = process.env.PORT || 2524;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;
db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));
db.once("open", () => console.log("🚀 MongoDB Connection is Live!"));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/entities", entityRoutes); // New entity routes

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
