const express = require('express')
var Router = express.Router()

const{
    getAllSettings,
    getSettingById,
    createSetting,
    deleteSetting
} = require('../controllers/permissionSettingController.js')

Router.get('/', getAllSettings);

Router.get('/:id', getSettingById);

Router.post('/', createSetting);

Router.delete('/:id', deleteSetting);

module.exports = Router