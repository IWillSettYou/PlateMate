const express = require('express')
var Router = express.Router()

const{
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder,
    getAllInProcessOrders,
    getAllFinishedOrders,
    getAllServedOrders,
    setUpdateOrder,
    rollbackUpdatedOrder,
    setServedOrder,
    rollbackServedOrder
} = require('../controllers/orderController.js')

Router.get('/', getAllOrders);

Router.get('/in-process/', getAllInProcessOrders);

Router.get('/finished/', getAllFinishedOrders);

Router.get('/served/', getAllServedOrders);

Router.get('/:id', getOrderById);

Router.put('/set-update/:id', setUpdateOrder);

Router.put('/rollback-updated/:id', rollbackUpdatedOrder);

Router.put('/set-serve/:id', setServedOrder);

Router.put('/rollback-served/:id', rollbackServedOrder);

Router.post('/', createOrder);

Router.delete('/:id', deleteOrder);

module.exports = Router