const express = require('express');
const router = express.Router();
const sportController = require('../../controllers/sportController')

router
    .get('/', sportController.getAllSports)
    .get('/:workoutId', sportController.getSportById)
    .post('/', sportController.createSport)
    .put('/:workoutId', sportController.updateSport)
    .delete('/:workoutId', sportController.deleteSport);

module.exports = router;