const { getDB } = require('../Config/database');

async function createCinema(cinemaData) {
  const database = getDB();
  const result = await database.collection('cinemas').insertOne(cinemaData);

  return {
    _id: result.insertedId,
    ...cinemaData
  };
}

async function findCinemaByName(name) {
  const database = getDB();

  return await database.collection('cinemas').findOne(
    { name },
    { collation: { locale: 'en', strength: 2 } }
  );
}

async function getAllCinemas() {
  const database = getDB();
  return await database.collection('cinemas').find().toArray();
}

module.exports = {
  createCinema,
  findCinemaByName,
  getAllCinemas
};