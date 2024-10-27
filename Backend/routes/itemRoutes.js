const express = require('express')
var Router = express.Router()

const{
    getAllItems,
    getItemById,
    createItem,
    deleteItem
} = require('../controllers/itemController.js')

Router.get('/', getAllItems);

Router.get('/:id', getItemById);

Router.post('/', createItem);

Router.delete('/:id', deleteItem);

module.exports = Router