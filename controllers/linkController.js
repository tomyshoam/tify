const Link = require('../models/linkModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//Functions

exports.aliasMostVisited = (req, res, next) => {
  req.query.limit = 3;
  req.query.sort = '-visitsQuantity';
  req.query.fields = '-createdAt';
  next();
};

exports.getAllLinks = catchAsync(async (req, res, next) => {
  //Execute query
  const features = new APIFeatures(Link.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();
  const links = await features.query;
  //Send response
  res.status(200).json({
    status: 'success',
    results: links.length,
    data: links,
  });
});

exports.getLink = catchAsync(async (req, res, next) => {
  const singleLink = await Link.findById(req.params.id);
  if (!singleLink) {
    return next(new AppError(`No link found with ID ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: singleLink,
  });
});

exports.createLink = catchAsync(async (req, res, next) => {
  const newLink = await Link.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      link: newLink,
    },
  });
});

exports.updateLink = catchAsync(async (req, res, next) => {
  const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedLink) {
    return next(new AppError(`No link found with ID ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: updatedLink,
  });
});

exports.deleteLink = catchAsync(async (req, res, next) => {
  const deletedLink = await Link.findByIdAndDelete(req.params.id);
  if (!deletedLink) {
    return next(new AppError(`No link found with ID ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getLinkStats = catchAsync(async (req, res, next) => {
  const stats = await Link.aggregate([
    {
      $match: { visitsQuantity: { $gte: 0 } },
    },
    {
      $group: {
        _id: null,
        numLinks: { $sum: 1 },
        avgVists: { $avg: '$visitsQuantity' },
        minVisits: { $min: '$visitsQuantity' },
        maxVisits: { $max: '$visitsQuantity' },
      },
    },
    {
      $sort: { avgVisits: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: stats,
  });
});
