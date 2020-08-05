const geoip = require('geoip-lite');
const Link = require('../models/linkModel');
const Visit = require('../models/visitModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.redirectToSlug = catchAsync(async (req, res, next) => {
  //Get ip of request maybe store in DB
  const requestIp = req.connection.remoteAddress.split(':')[
    req.connection.remoteAddress.split(':').length - 1
  ];
  // 1) Check if slug exists
  const link = await Link.findOne({ slug: req.params.slug });
  if (!link) return next(new AppError('Link was not found', 404));
  // 2) create new visit document
  await Visit.create({
    link: link._id,
    ip: requestIp,
    referer: req.get('Referrer'),
    country: geoip.lookup(requestIp) ? geoip.lookup(requestIp).country : null,
  });
  await link.save({ validateBeforeSave: false });
  // 3) Redirect to url
  res.redirect(link.url);
});
