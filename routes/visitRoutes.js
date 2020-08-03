const express = require('express');
const { createVisit, getAllVisits } = require('../controllers/visitController');

//Router
const router = express.Router();

//Routes
router.route('/').get(getAllVisits).post(createVisit);

module.exports = router;
