const User = require("../model/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async(req , res)=>{
    try{
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ token, user: { id: user._id, username, email } });

    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const logout = async (req, res) => {
    res.json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    logout
};