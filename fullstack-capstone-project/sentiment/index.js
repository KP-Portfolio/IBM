// Task 1: Import the Natural library
const natural = require("natural");
const express = require("express");

// Task 2: Initialize the Express server
const app = express();
app.use(express.json());

// Initialize the Natural sentiment analyzer
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// Task 3: Create a POST /sentiment endpoint
app.post("/sentiment", (req, res) => {
  try {
    // Task 4: Extract the sentence parameter from the request body
    const { sentence } = req.body;

    if (!sentence || sentence.trim() === "") {
      return res.status(400).json({ error: "Sentence is required" });
    }

    // Analyze sentiment score
    const score = analyzer.getSentiment(sentence.split(" "));

    // Task 5: Determine sentiment label
    let sentiment = "";

    if (score < 0) {
      sentiment = "negative";
    } else if (score >= 0 && score <= 0.33) {
      sentiment = "neutral";
    } else {
      sentiment = "positive";
    }

    // Task 6: Implement success return state
    return res.json({
      score,
      sentiment
    });

  } catch (error) {
    console.error("Sentiment analysis error:", error);

    // Task 7: Implement error return state
    return res.status(500).json({
      error: "Failed to analyze sentiment"
    });
  }
});

// Start server on predefined port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sentiment server running on port ${PORT}`);
});