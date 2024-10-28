const express = require('express')
var Router = express.Router()

const{
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder
} = require('../controllers/orderController.js')

Router.get('/', getAllOrders);

Router.get('/:id', getOrderById);

Router.post('/', createOrder);

Router.delete('/:id', deleteOrder);

module.exports = Router