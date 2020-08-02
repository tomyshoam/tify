const express = require('express');
const {
  getAllLinks,
  createLink,
  getLink,
  updateLink,
  deleteLink,
  aliasMostVisited,
  getLinkStats,
} = require('../controllers/linkController');

// Router
const router = express.Router();
// Routes
router.route('/most-visited').get(aliasMostVisited, getAllLinks);
router.route('/link-stats').get(getLinkStats);
router.route('/').get(getAllLinks).post(createLink);
router.route('/:id').get(getLink).patch(updateLink).delete(deleteLink);

module.exports = router;
