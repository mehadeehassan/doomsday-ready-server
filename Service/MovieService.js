const movieRepository = require('../Repository/MovieRepository');
const { validateMovie } = require('../Validation/MovieValidation');

async function createMovie(movieData) {
  const validationError = validateMovie(movieData);

  if (validationError) {
    const error = new Error(validationError);
    error.statusCode = 400;
    throw error;
  }

  const movie = await movieRepository.createMovie({
    title: movieData.title.trim(),
    releaseYear: movieData.releaseYear,
    runtime: movieData.runtime,
    prerequisites: movieData.prerequisites || [],
    watched: movieData.watched ?? false
  });

  return movie;
}

module.exports = { createMovie };
