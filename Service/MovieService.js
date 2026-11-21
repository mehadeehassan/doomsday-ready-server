const movieRepository = require('../Repository/MovieRepository');
const { validateMovie } = require('../Validation/MovieValidation');
const { validateMovieUpdate } = require('../Validation/MovieValidation');
const { ObjectId } = require('mongodb');

async function createMovie(movieData) {
  const validationError = validateMovie(movieData);
  await validatePrerequisites(null, movieData.prerequisites || []);

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

async function updateMovie(id, updateData) {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid movie ID');
    error.statusCode = 400;
    throw error;
  }
  if (updateData.prerequisites !== undefined) {
  await validatePrerequisites(id, updateData.prerequisites);
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

async function validatePrerequisites(movieId, prerequisiteIds = []) {
  const uniqueIds = [...new Set(prerequisiteIds)];

  if (uniqueIds.length !== prerequisiteIds.length) {
    throw new Error('Duplicate prerequisite IDs are not allowed');
  }

  for (const id of uniqueIds) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid prerequisite movie ID');
    }

    if (movieId && id === movieId) {
      throw new Error('A movie cannot depend on itself');
    }
  }

  const movieIds = uniqueIds.map(id => new ObjectId(id));
  const existingMovies = await movieRepository.findMoviesByIds(movieIds);

  if (existingMovies.length !== uniqueIds.length) {
    throw new Error('One or more prerequisite movies were not found');
  }
}

module.exports = { createMovie, getAllMovies, updateMovie };
