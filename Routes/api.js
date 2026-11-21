const express = require('express');
const movieController = require('../Controller/MovieController');

const router = express.Router();

router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getAllMovies);

module.exports = router;
