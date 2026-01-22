// models/db.js
const { MongoClient } = require("mongodb");

let dbInstance = null;

async function connectToDatabase() {
  // If already connected, return the existing instance
  if (dbInstance) {
    return dbInstance;
  }

  // Task 1: Connect to MongoDB
  const uri = "mongodb://root:3MeFcuFzZVxubuRJyjSXEtEo@172.21.71.151:27017";
  const client = new MongoClient(uri);

  await client.connect();

  // Task 2: Connect to database giftDB and store in variable dbInstance
  dbInstance = client.db("giftDB");

  // Task 3: Return the database instance
  return dbInstance;
}

module.exports = { connectToDatabase };