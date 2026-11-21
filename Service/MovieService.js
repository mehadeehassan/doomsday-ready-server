const movieRepository = require('../Repository/MovieRepository');
const { validateMovie } = require('../Validation/MovieValidation');
const { validateMovieUpdate } = require('../Validation/MovieValidation');

async function createMovie(movieData) {
  const validationError = validateMovie(movieData);

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = 400;
    throw error;
  }

  const existingMovie = await movieRepository.findMovieByTitle(movieData.title.trim());

  if (existingMovie) {
    const error = new Error('Movie title already exists');
    error.statusCode = 409;
    throw error;
  }

  const newMovie = {
    title: movieData.title.trim(),
    releaseYear: movieData.releaseYear,
    runtime: movieData.runtime,
    prerequisites: movieData.prerequisites || [],
    watched: movieData.watched ?? false,
  };

  try {
    return await movieRepository.createMovie(newMovie);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateError = new Error('Movie title already exists');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
}

async function getAllMovies() {
  return await movieRepository.getAllMovies();
}

const { ObjectId } = require('mongodb');

async function updateMovie(id, updateData) {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid movie ID');
    error.statusCode = 400;
    throw error;
  }

  const existingMovie = await movieRepository.findMovieByTitle(updateData.title?.trim() || '');

  if (updateData.title && existingMovie && existingMovie._id.toString() !== id) {
    const error = new Error('Movie title already exists');
    error.statusCode = 409;
    throw error;
  }
  const validationError = validateMovieUpdate(updateData);

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = 400;
    throw error;
  }
  if (updateData.title !== undefined) {
    const existingMovie = await movieRepository.findMovieByTitle(updateData.title.trim());

    if (existingMovie && existingMovie._id.toString() !== id) {
      const error = new Error('Movie title already exists');
      error.statusCode = 409;
      throw error;
    }

    updateData.title = updateData.title.trim();
  }

  return await movieRepository.updateMovie(id, updateData);
}

module.exports = { createMovie, getAllMovies, updateMovie };
