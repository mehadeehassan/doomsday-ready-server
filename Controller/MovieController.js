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
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      code: error.code || null
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


async function updateMovie(req, res) {
  try {
    const movie = await movieService.updateMovie(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      code: error.code || null
    });
  }
}

async function getMovieRewatchOrder(req, res) {
  try {
    const result = await movieService.getMovieRewatchOrder(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      code: error.code || null
    });
  }
}


module.exports = { createMovie, getAllMovies, updateMovie, getMovieRewatchOrder };
