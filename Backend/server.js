const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./route/userRoute");
const router = require("./route/userRoute");
const cors = require("cors") ;
require("dotenv").config();

const app = express();
const PORT = 2524;
app.use(cors());
app.use(express.json());

 
const mongoURI = process.env.MONGO_URI;  

mongoose
  .connect(mongoURI )
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const db = mongoose.connection;


db.on("connected", () => console.log("MongoDB is connected"));
db.on("error", (err) => console.error("MongoDB Connection Error:", err));
app.use("/",postRoutes) ;

app.get("/", (req, res) => {
  const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({ message: `Database Status: ${status}` });
});


// app.get("/ping", (req, res) => {
//   res.send("This is Ping Route");
// });


app.use("/api/posts" , postRoutes) ;
app.use('/api', router)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


app.listen(PORT, () => {
  console.log(`Server is running at : http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
