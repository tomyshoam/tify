const mongoose = require('mongoose');

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

// visitSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'link',
//     select: '-__v',
//   });
//   next();
// });

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
