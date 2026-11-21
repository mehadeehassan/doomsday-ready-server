const { MongoClient } = require('mongodb');

let client;
let database;
let connectionPromise;

async function connectDB() {
  if (database) {
    return database;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (!process.env.DB_NAME) {
    throw new Error('DB_NAME is not configured');
  }

  if (!connectionPromise) {
    connectionPromise = (async () => {
      client = client || new MongoClient(process.env.MONGODB_URI);
      await client.connect();

      const connectedDatabase = client.db(process.env.DB_NAME);

      await connectedDatabase
        .collection('movies')
        .createIndex({ title: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

      await connectedDatabase.collection('cinemas').createIndex(
        { name: 1 },
        { unique: true, collation: { locale: 'en', strength: 2 } }
      );

      database = connectedDatabase;
      console.log('MongoDB connected successfully');
      return database;
    })().catch((error) => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
}

function getDB() {
  return database;
}

module.exports = { connectDB, getDB };
