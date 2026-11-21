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

module.exports = {
  createMovie,
  findMovieByTitle,
};
