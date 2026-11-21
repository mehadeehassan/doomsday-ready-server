const express = require('express');
const movieController = require('../Controller/MovieController');
const cinemaController = require('../Controller/CinemaController');

const router = express.Router();

router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getAllMovies);
router.patch('/movies/:id', movieController.updateMovie);
router.get('/movies/:id/rewatch-order', movieController.getMovieRewatchOrder);
router.post('/cinemas', cinemaController.createCinema);
router.get('/cinemas', cinemaController.getAllCinemas);
router.get('/cinemas/:id/booking', cinemaController.getBookingQuote);

module.exports = router;
