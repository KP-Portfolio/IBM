const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// GET /api/gifts (search)
router.get("/", async (req, res) => {
  try {
    // Task 1: Connect to MongoDB
    const db = await connectToDatabase();
    const giftCollection = db.collection("gifts");

    // Build the query object
    const query = {};

    // Task 2: Check if the name exists and is not empty
    if (req.query.name && req.query.name.trim() !== "") {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    // Task 3: Add the other three filters
    if (req.query.category && req.query.category.trim() !== "") {
      query.category = req.query.category;
    }

    if (req.query.condition && req.query.condition.trim() !== "") {
      query.condition = req.query.condition;
    }

    if (req.query.age_years && req.query.age_years.trim() !== "") {
      query.age_years = parseInt(req.query.age_years);
    }

    // Execute the search
    const results = await giftCollection.find(query).toArray();

    res.json(results);
  } catch (error) {
    console.error("Error searching gifts:", error);
    res.status(500).json({ error: "Failed to search gifts" });
  }
});

module.exports = router;