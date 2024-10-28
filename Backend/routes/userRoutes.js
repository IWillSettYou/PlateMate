const express = require('express')
var Router = express.Router()

const{
    getAllUsers,
    getUserById
} = require('../controllers/userController.js')

Router.get('/', getAllUsers);

Router.get('/:id', getUserById);

module.exports = Router