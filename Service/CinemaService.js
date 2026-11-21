const cinemaRepository = require('../Repository/CinemaRepository');
const { validateCinema } = require('../Validation/CinemaValidation');
const { calculateBooking } = require('../Utils/BookingHelpers');

async function createCinema(cinemaData) {
  const validationError = validateCinema(cinemaData);

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = 400;
    throw error;
  }

  const name = cinemaData.name.trim();

  const existingCinema = await cinemaRepository.findCinemaByName(name);

  if (existingCinema) {
    const error = new Error('Cinema name already exists');
    error.statusCode = 409;
    throw error;
  }

  try {
    return await cinemaRepository.createCinema({
      name,
      bundleSizes: cinemaData.bundleSizes
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error('Cinema name already exists');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
}

async function getAllCinemas() {
  return await cinemaRepository.getAllCinemas();
}

async function getBookingQuote(id, groupSize) {
  const { ObjectId } = require('mongodb');

  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid cinema ID');
    error.statusCode = 400;
    throw error;
  }

  const size = Number(groupSize);

  if (!Number.isInteger(size) || size < 1 || size > 10000) {
    const error = new Error('Group size must be between 1 and 10000');
    error.statusCode = 400;
    throw error;
  }

  const database = require('../Config/database').getDB();

  const cinema = await database.collection('cinemas').findOne({
    _id: new ObjectId(id)
  });

  if (!cinema) {
    const error = new Error('Cinema not found');
    error.statusCode = 404;
    throw error;
  }

  const booking = calculateBooking(cinema.bundleSizes, size);

  if (!booking) {
    return {
      possible: false,
      message: 'Exact seat combination is not possible'
    };
  }

  return {
    possible: true,
    cinema: cinema.name,
    ...booking
  };
}

module.exports = {
  createCinema,
  getAllCinemas,
  getBookingQuote
};