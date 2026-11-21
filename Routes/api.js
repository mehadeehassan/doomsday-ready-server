const express = require('express');
const movieController = require('../Controller/MovieController');

const router = express.Router();

router.post('/movies', movieController.createMovie);

module.exports = router;
