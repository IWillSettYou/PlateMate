const express = require('express')
var Router = express.Router()

const{
    getAllReservations,
    getReservationById,
    createReservation,
    deleteReservation
} = require('../controllers/reservedTableController.js')

Router.get('/', getAllReservations);

Router.get('/:id', getReservationById);

Router.post('/', createReservation);

Router.delete('/:id', deleteReservation);

module.exports = Router