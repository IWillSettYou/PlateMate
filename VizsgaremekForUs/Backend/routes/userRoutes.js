const express = require('express')
var Router = express.Router()

const{
    getAllUsers,
    getUserById,
    deleteUser
} = require('../controllers/userController.js')

Router.get('/', getAllUsers);

Router.get('/:id', getUserById);

Router.delete('/:id', deleteUser);

module.exports = Router