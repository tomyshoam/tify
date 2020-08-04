const Link = require('../models/linkModel');
const catchAsync = require('../utils/catchAsync');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');
//Functions

exports.aliasMostVisited = (req, res, next) => {
  req.query.limit = 3;
  req.query.sort = '-visitsQuantity';
  req.query.fields = '-createdAt';
  next();
};

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

// Adds the currently logged in user as the owner of the created asset
exports.addOwner = (req, res, next) => {
  req.body = { ...req.body, user: req.user._id };
  next();
};

exports.getAllLinks = getAll(Link);

exports.getLink = getOne(Link, { path: 'visits' });

exports.createLink = createOne(Link);

exports.updateLink = updateOne(Link, true);

exports.deleteLink = deleteOne(Link, true);
