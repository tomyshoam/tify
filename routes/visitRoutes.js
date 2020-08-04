const express = require('express');
const {
  createVisit,
  getAllVisits,
  deleteVisit,
  updateVisit,
  getVisit,
} = require('../controllers/visitController');

//Router
const router = express.Router({ mergeParams: true });

//Routes
router.route('/').get(getAllVisits).post(createVisit);
router.route('/:id').get(getVisit).delete(deleteVisit).patch(updateVisit);
module.exports = router;
