const express = require("express");
const app = express();

// Routes
const giftroutes = require("./routes/giftRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json());

// Route Mounts
app.use("/api/gifts", giftroutes);
app.use("/api/search", searchRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;