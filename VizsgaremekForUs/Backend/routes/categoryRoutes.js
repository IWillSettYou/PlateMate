const express = require('express')
var Router = express.Router()

const{
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory
} = require('../controllers/categoryController.js')

Router.get('/', getAllCategories);

Router.get('/:id', getCategoryById);

Router.post('/', createCategory);

Router.delete('/:id', deleteCategory);

module.exports = Router