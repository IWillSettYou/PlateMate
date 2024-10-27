const express = require('express')
var Router = express.Router()

const{
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController.js')

Router.get('/', getAllUsers);

Router.get('/:id', getUserById);

Router.put('/:id', updateUser);

Router.delete('/:id', deleteUser);

module.exports = Router