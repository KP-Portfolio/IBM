const express = require("express");
const app = express();

// Existing gift routes
const giftroutes = require("./routes/giftRoutes");

// Search API Task 1: import the searchRoutes
const searchRoutes = require("./routes/searchRoutes");

// Middleware
app.use(express.json());

// Existing gift route mount
app.use("/api/gifts", giftroutes);

// Search API Task 2: add the searchRoutes to the server
app.use("/api/search", searchRoutes);

module.exports = app;