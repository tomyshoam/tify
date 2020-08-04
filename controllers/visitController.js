const Visit = require('../models/visitModel');

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory.js');

exports.getAllVisits = getAll(Visit);

exports.getVisit = getOne(Visit);

exports.createVisit = createOne(Visit);

exports.deleteVisit = deleteOne(Visit);

exports.updateVisit = updateOne(Visit);
