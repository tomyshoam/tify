const express = require('express');
const {
  getAllLinks,
  createLink,
  getLink,
  updateLink,
  deleteLink,
} = require('../controllers/linkController');

// Router
const router = express.Router();
// Routes
router.route('/').get(getAllLinks).post(createLink);
router.route('/:id').get(getLink).patch(updateLink).delete(deleteLink);

module.exports = router;
