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

module.exports = { createMovie };
