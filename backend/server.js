const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbconfig");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
// Use CORS middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from the frontend running on this port
  methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization" // Allow these headers
}));

app.use(express.json()); // Parses incoming JSON requests

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    try {
      // Find the user from the decoded token
      const user = await User.findById(decoded.userId); // Assuming the token contains userId
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; // Attach user data to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(500).json({ message: "Server error during token verification" });
    }
  });
};

app.get("/api/auth/verify-token", verifyToken, (req, res) => {
  // Send the user data back in the response if the token is valid
  res.status(200).json({ user: req.user });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is up and running!" });
});

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = password==user.password;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login." });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node server started at port ${port}`));