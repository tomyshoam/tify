const express = require('express');
const visitRouter = require('./visitRoutes');
const {
  getAllLinks,
  createLink,
  getLink,
  updateLink,
  deleteLink,
  aliasMostVisited,
  getLinkStats,
  addOwner,
} = require('../controllers/linkController');
const { protect, restrictTo } = require('../controllers/authController');
// Router
const router = express.Router();
// Routes
router.use('/:linkId/visits', visitRouter);
router.route('/most-visited').get(aliasMostVisited, getAllLinks);
router.route('/link-stats').get(getLinkStats);
router.route('/').get(getAllLinks).post(protect, addOwner, createLink);
router
  .route('/:id')
  .get(getLink)
  .patch(protect, updateLink)
  .delete(protect, deleteLink);

module.exports = router;
