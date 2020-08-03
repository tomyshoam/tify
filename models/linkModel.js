const mongoose = require('mongoose');
const User = require('./userModel');

function makeSlug(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const linkSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      default: makeSlug(5),
    },
    url: {
      type: String,
      required: [true, 'A link must have a url'],
    },
    visitsQuantity: {
      type: Number,
      default: 0,
    },
    topVisitsLocation: {
      type: String,
      default: null,
    },
    topVisitsReferer: {
      type: String,
      default: null,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

linkSchema.virtual('visits', {
  ref: 'Visit',
  foreignField: 'link',
  localField: '_id',
});

linkSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -passwordChangedAt',
  });
  next();
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
