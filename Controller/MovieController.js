const movieService = require('../Service/MovieService');

async function createMovie(req, res) {
  try {
    const movie = await movieService.createMovie(req.body);

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie
    });
  }  catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
}

async function getAllMovies(req, res) {
  try {
    const movies = await movieService.getAllMovies();

    res.status(200).json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


const { ObjectId } = require('mongodb');

async function updateMovie(id, updateData) {
  if (!ObjectId.isValid(id)) {
    const error = new Error('Invalid movie ID');
    error.statusCode = 400;
    throw error;
  }

  const existingMovie = await movieRepository.findMovieByTitle(
    updateData.title?.trim() || ''
  );

  if (updateData.title && existingMovie && existingMovie._id.toString() !== id) {
    const error = new Error('Movie title already exists');
    error.statusCode = 409;
    throw error;
  }

  return await movieRepository.updateMovie(id, updateData);
}


module.exports = { createMovie, getAllMovies, updateMovie };
