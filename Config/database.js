
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function connectDB() {
  await client.connect();

  database = client.db(process.env.DB_NAME);

  console.log('MongoDB connected successfully');
}

function getDB() {
  return database;
}

module.exports = { connectDB, getDB };
