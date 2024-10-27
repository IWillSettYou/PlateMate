const express = require('express')
var Router = express.Router()

const{
    getAllTables,
    getTableById,
    createTable,
    deleteTable
} = require('../controllers/tableController.js')

Router.get('/', getAllTables);

Router.get('/:id', getTableById);

Router.post('/', createTable);

Router.delete('/:id', deleteTable);

module.exports = Router