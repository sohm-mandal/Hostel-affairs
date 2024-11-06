const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbconfig");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

app.use(cors({
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization" 
}));

app.use(express.json()); 
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); 

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

app.post("/api/user/update", async (req, res) => {
 const { email, name, regNo, phoneNumber, blockName, roomNumber } = req.body;

    // Connect to the MongoDB database
    const { db } = await connectToDatabase();

    try {
      // Find the user by email
      const user = await db.collection("users").findOne({ email });

      if (!user) {
        // If the user doesn't exist, return an error
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare the update object with the new fields
      const updateData = {};

      if (name) updateData.name = name;
      if (regNo) updateData.regNo = regNo;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (blockName) updateData.blockName = blockName;
      if (roomNumber) updateData.roomNumber = roomNumber;

      // Update the user's document
      const updatedUser = await db.collection("users").updateOne(
        { email },
        { $set: updateData } // Use $set to update only the provided fields
      );

      // If no fields were updated, return an appropriate message
      if (updatedUser.modifiedCount === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      // Return the updated user document
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user: ", error);
      return res.status(500).json({ message: "Server error" });
    }
});
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

    
    const payload = {
      userId: newUser._id,
      email: newUser.email,
    };

    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    res.status(201).json({
      message: "User registered successfully!",
      token,
      email: newUser.email,
    });
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
    res.status(200).json({ token , email });
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