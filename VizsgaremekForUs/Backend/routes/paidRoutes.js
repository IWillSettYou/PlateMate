const express = require('express')
var Router = express.Router()

const{
    getAllPayments,
    getPaymentById,
    createPayment,
    deletePayment
} = require('../controllers/paidController.js')

Router.get('/', getAllPayments);

Router.get('/:id', getPaymentById);

Router.post('/', createPayment);

Router.delete('/:id', deletePayment);

module.exports = Router