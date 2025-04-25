const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const User = require("../model/User");

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/", async (req, res) => {
    try {
        const data = await User.find().select("-password");  
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
