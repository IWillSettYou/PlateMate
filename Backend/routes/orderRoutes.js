const express = require('express')
const { roleCheck } = require("../middlewares/roleHandler") 
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

Router.get('/', roleCheck(['admin', 'waiter', 'cashier']), getAllOrders);

Router.get('/in-process/', roleCheck(['admin', 'waiter', 'cashier']), getAllInProcessOrders);

Router.get('/finished/', roleCheck(['admin', 'waiter', 'cashier']), getAllFinishedOrders);

Router.get('/served/', roleCheck(['admin', 'waiter', 'cashier']), getAllServedOrders);

Router.get('/:id', roleCheck(['admin', 'waiter', 'cashier']), getOrderById);

Router.put('/set-update/:id', roleCheck(['admin', 'waiter', 'cashier']), setUpdateOrder);

Router.put('/rollback-updated/:id', roleCheck(['admin', 'waiter', 'cashier']), rollbackUpdatedOrder);

Router.put('/set-serve/:id', roleCheck(['admin', 'waiter', 'cashier']), setServedOrder);

Router.put('/rollback-served/:id', roleCheck(['admin', 'waiter', 'cashier']), rollbackServedOrder);

Router.post('/', roleCheck(['admin', 'waiter']), createOrder);

Router.delete('/:id', roleCheck(['admin', 'waiter']), deleteOrder);

module.exports = Router