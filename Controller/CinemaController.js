const cinemaService = require('../Service/CinemaService');

async function createCinema(req, res) {
  try {
    const cinema = await cinemaService.createCinema(req.body);

    res.status(201).json({
      success: true,
      data: cinema,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getAllCinemas(req, res) {
  try {
    const cinemas = await cinemaService.getAllCinemas();

    res.status(200).json({
      success: true,
      data: cinemas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function getBookingQuote(req, res) {
  try {
    const result = await cinemaService.getBookingQuote(req.params.id, req.query.groupSize);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createCinema,
  getAllCinemas,
  getBookingQuote,
};
