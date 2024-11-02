const express = require('express')
const { roleCheck } = require("../middlewares/roleHandler") 
var Router = express.Router()

const{
    getAllHours,
    createOpeningHour,
    deleteHour
} = require('../controllers/openingHourController')

Router.get('/', roleCheck(['admin', 'waiter']), getAllHours);

Router.post('/',  roleCheck(['admin']), createOpeningHour);

Router.delete('/:id', roleCheck(['admin']), deleteHour);

module.exports = Router