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
const { protect, restrictTo } = require('../controllers/authController');
// Router
const router = express.Router();
// Routes
router.route('/most-visited').get(aliasMostVisited, getAllLinks);
router.route('/link-stats').get(getLinkStats);
router.route('/').get(protect, getAllLinks).post(protect, createLink);
router
  .route('/:id')
  .get(getLink)
  .patch(protect, updateLink)
  .delete(protect, restrictTo(), deleteLink);

module.exports = router;
