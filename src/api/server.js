// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

const itemRoutes = require("./routes/itemRoutes"); // Import the item routes
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("MongoDB URI not defined in .env file!");
  process.exit(1); // Exit if the URI is not found
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use the routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes); // Use item routes

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


