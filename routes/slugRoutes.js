const express = require('express');
const { redirectToSlug } = require('../controllers/slugController');
//Router
const router = express.Router();

//Routes
router.get('/:slug', redirectToSlug);

module.exports = router;
