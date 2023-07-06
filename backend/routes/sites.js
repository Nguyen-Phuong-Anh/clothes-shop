const express = require('express')
const router = express.Router()
const sitesController = require('../controllers/SitesController')

router.get('/', sitesController.main)

module.exports = router