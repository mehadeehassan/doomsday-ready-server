const { getDB } = require('../Config/database');

async function createMovie(movieData) {
  const database = getDB();

  const result = await database.collection('movies').insertOne(movieData);

  return {
    _id: result.insertedId,
    ...movieData
  };
}

module.exports = { createMovie };
