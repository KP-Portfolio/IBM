const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");
const { ObjectId } = require("mongodb");

// GET /api/gifts/:id
router.get("/:id", async (req, res) => {
  try {
    // Task 1: Connect to MongoDB
    const db = await connectToDatabase();

    // Task 2: Retrieve the gift collection
    const giftCollection = db.collection("gifts");

    // Task 3: Find a specific gift by ID
    const gift = await giftCollection.findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }

    res.json(gift);
  } catch (error) {
    console.error("Error retrieving gift:", error);
    res.status(500).json({ error: "Failed to fetch gift" });
  }
});

module.exports = router;