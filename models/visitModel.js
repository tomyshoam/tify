const mongoose = require('mongoose');
const Link = require('./linkModel');

const visitSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: new Date(Date.now()).setHours(0, 0, 0, 0),
    },
    link: {
      type: mongoose.Schema.ObjectId,
      ref: 'Link',
      required: [true, 'A visit must belong to a link'],
    },
    ip: {
      type: String,
    },
    referer: {
      type: String,
      default: '???',
    },
    country: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

visitSchema.statics.calcTopCountry = async function (link) {
  const stats = await this.aggregate([
    {
      $match: { link },
    },
    {
      $sortByCount: '$country',
    },
  ]);
  await Link.findByIdAndUpdate(link, {
    topVisitsLocation: stats[0]._id,
  });
};

visitSchema.statics.calcTopReferer = async function (link) {
  const stats = await this.aggregate([
    {
      $match: { link },
    },
    {
      $sortByCount: '$referer',
    },
  ]);
  await Link.findByIdAndUpdate(link, {
    topVisitsReferer: stats[0]._id,
  });
};

visitSchema.statics.calcTotalVisits = async function (link) {
  const stats = await this.aggregate([
    {
      $match: { link },
    },
    {
      $group: {
        _id: '$link',
        totalVisits: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    { $sort: { totalVisits: -1 } },
  ]);
  await Link.findByIdAndUpdate(link, {
    visitsQuantity: stats[0].totalVisits,
  });
};

visitSchema.post('save', function () {
  this.constructor.calcTopCountry(this.link);
  this.constructor.calcTopReferer(this.link);
  this.constructor.calcTotalVisits(this.link);
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
