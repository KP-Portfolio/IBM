const express = require("express");
const app = express();

// Task 1: import the giftRoutes and store in a constant called giftroutes
const giftroutes = require("./routes/giftRoutes");

// Middleware to parse JSON
app.use(express.json());

// Task 2: add the giftRoutes to the server using app.use()
app.use("/api/gifts", giftroutes);

module.exports = app;