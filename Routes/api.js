const express = require('express');
const movieController = require('../Controller/MovieController');

const router = express.Router();

router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getAllMovies);
router.patch('/movies/:id', movieController.updateMovie);
router.get('/movies/:id/rewatch-order', movieController.getMovieRewatchOrder);

module.exports = router;
