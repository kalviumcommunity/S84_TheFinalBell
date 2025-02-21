const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 2524;

app.use(express.json());

// 🔹 MongoDB Connection
const mongoURI = process.env.MONGO_URI; // Get MongoDB URI from .env

mongoose
  .connect(mongoURI )
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;

// 🔹 Event Listeners for Connection Status
db.on("connected", () => console.log("✅ MongoDB is connected"));
db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Home Route with Database Connection Status
app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: `Database Status: ${status}` });
});

// 🔹 Ping Route (Keep this as it is)
app.get("/ping", (req, res) => {
  res.send("This is Ping Route");
});

// 🔹 Error Handling Middleware (Keep this as it is)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`Server is running at : http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
