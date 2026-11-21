const { getDB } = require('../Config/database');

async function createMovie(movieData) {
  const database = getDB();

  const result = await database.collection('movies').insertOne(movieData);

  return {
    _id: result.insertedId,
    ...movieData,
  };
}

async function findMovieByTitle(title) {
  const database = getDB();

  return await database.collection('movies').findOne(
    { title },
    {
      collation: {
        locale: 'en',
        strength: 2,
      },
    },
  );
}
async function getAllMovies() {
  const database = getDB();

  return await database.collection('movies').find().toArray();
}

const { ObjectId } = require('mongodb');

async function updateMovie(id, updateData) {
  const database = getDB();

  const result = await database.collection('movies').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result;
}

async function findMoviesByIds(movieIds) {
  const database = getDB();

  return await database.collection('movies')
    .find({ _id: { $in: movieIds } })
    .toArray();
}

module.exports = {
  createMovie,
  findMovieByTitle,
  getAllMovies,
  updateMovie
};
