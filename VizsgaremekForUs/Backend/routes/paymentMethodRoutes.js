const express = require('express')
var Router = express.Router()

const{
    getAllMethods,
    getMethodById,
    createMethod,
    deleteMethod
} = require('../controllers/paymentMethodController.js')

Router.get('/', getAllMethods);

Router.get('/:id', getMethodById);

Router.post('/', createMethod);

Router.delete('/:id', deleteMethod);

module.exports = Router