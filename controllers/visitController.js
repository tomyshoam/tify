const Visit = require('../models/visitModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllVisits = catchAsync(async (req, res, next) => {
  const visits = await Visit.find();
  //Send response
  res.status(200).json({
    status: 'success',
    results: visits.length,
    data: visits,
  });
});

exports.createVisit = catchAsync(async (req, res, next) => {
  const newVisit = await Visit.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      link: newVisit,
    },
  });
});
