const express = require('express');
const { getPilotsWithinRange } = require('../controllers/pilotController');
const router = express.Router();

router.get('/search', getPilotsWithinRange);

module.exports = router;
