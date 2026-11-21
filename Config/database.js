const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

let database;

async function connectDB() {
  await client.connect();

  database = client.db(process.env.DB_NAME);

  await database
    .collection('movies')
    .createIndex({ title: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

  console.log('MongoDB connected successfully');
}

function getDB() {
  return database;
}

module.exports = { connectDB, getDB };
